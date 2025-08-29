import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_menus_v_version_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_menus_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_menus_v_version_menu" CASCADE;
  DROP TABLE "_menus_v" CASCADE;
  DROP INDEX "menus__status_idx";
  ALTER TABLE "menus_menu" ALTER COLUMN "icon_id" SET NOT NULL;
  ALTER TABLE "menus_menu" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "menus" DROP COLUMN "_status";
  DROP TYPE "public"."enum_menus_status";
  DROP TYPE "public"."enum__menus_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_menus_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__menus_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_menus_v_version_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"page_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_menus_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__menus_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "menus_menu" ALTER COLUMN "icon_id" DROP NOT NULL;
  ALTER TABLE "menus_menu" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "menus" ADD COLUMN "_status" "enum_menus_status" DEFAULT 'draft';
  ALTER TABLE "_menus_v_version_menu" ADD CONSTRAINT "_menus_v_version_menu_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menus_v_version_menu" ADD CONSTRAINT "_menus_v_version_menu_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menus_v_version_menu" ADD CONSTRAINT "_menus_v_version_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_menus_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menus_v" ADD CONSTRAINT "_menus_v_parent_id_menus_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menus"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menus_v" ADD CONSTRAINT "_menus_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_menus_v_version_menu_order_idx" ON "_menus_v_version_menu" USING btree ("_order");
  CREATE INDEX "_menus_v_version_menu_parent_id_idx" ON "_menus_v_version_menu" USING btree ("_parent_id");
  CREATE INDEX "_menus_v_version_menu_icon_idx" ON "_menus_v_version_menu" USING btree ("icon_id");
  CREATE INDEX "_menus_v_version_menu_page_idx" ON "_menus_v_version_menu" USING btree ("page_id");
  CREATE INDEX "_menus_v_parent_idx" ON "_menus_v" USING btree ("parent_id");
  CREATE INDEX "_menus_v_version_version_tenant_idx" ON "_menus_v" USING btree ("version_tenant_id");
  CREATE INDEX "_menus_v_version_version_updated_at_idx" ON "_menus_v" USING btree ("version_updated_at");
  CREATE INDEX "_menus_v_version_version_created_at_idx" ON "_menus_v" USING btree ("version_created_at");
  CREATE INDEX "_menus_v_version_version__status_idx" ON "_menus_v" USING btree ("version__status");
  CREATE INDEX "_menus_v_created_at_idx" ON "_menus_v" USING btree ("created_at");
  CREATE INDEX "_menus_v_updated_at_idx" ON "_menus_v" USING btree ("updated_at");
  CREATE INDEX "_menus_v_latest_idx" ON "_menus_v" USING btree ("latest");
  CREATE INDEX "_menus_v_autosave_idx" ON "_menus_v" USING btree ("autosave");
  CREATE INDEX "menus__status_idx" ON "menus" USING btree ("_status");`)
}
