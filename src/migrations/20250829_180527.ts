import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_socials_v_version_socials_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_socials_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_socials_v_version_socials_links" CASCADE;
  DROP TABLE "_socials_v" CASCADE;
  DROP INDEX "socials__status_idx";
  ALTER TABLE "socials_socials_links" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "socials_socials_links" ALTER COLUMN "link" SET NOT NULL;
  ALTER TABLE "socials_socials_links" ALTER COLUMN "icon_id" SET NOT NULL;
  ALTER TABLE "socials" DROP COLUMN "_status";
  DROP TYPE "public"."enum_socials_status";
  DROP TYPE "public"."enum__socials_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_socials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__socials_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_socials_v_version_socials_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_socials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__socials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "socials_socials_links" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "socials_socials_links" ALTER COLUMN "link" DROP NOT NULL;
  ALTER TABLE "socials_socials_links" ALTER COLUMN "icon_id" DROP NOT NULL;
  ALTER TABLE "socials" ADD COLUMN "_status" "enum_socials_status" DEFAULT 'draft';
  ALTER TABLE "_socials_v_version_socials_links" ADD CONSTRAINT "_socials_v_version_socials_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_socials_v_version_socials_links" ADD CONSTRAINT "_socials_v_version_socials_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_socials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_socials_v" ADD CONSTRAINT "_socials_v_parent_id_socials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."socials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_socials_v" ADD CONSTRAINT "_socials_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_socials_v_version_socials_links_order_idx" ON "_socials_v_version_socials_links" USING btree ("_order");
  CREATE INDEX "_socials_v_version_socials_links_parent_id_idx" ON "_socials_v_version_socials_links" USING btree ("_parent_id");
  CREATE INDEX "_socials_v_version_socials_links_icon_idx" ON "_socials_v_version_socials_links" USING btree ("icon_id");
  CREATE INDEX "_socials_v_parent_idx" ON "_socials_v" USING btree ("parent_id");
  CREATE INDEX "_socials_v_version_version_tenant_idx" ON "_socials_v" USING btree ("version_tenant_id");
  CREATE INDEX "_socials_v_version_version_updated_at_idx" ON "_socials_v" USING btree ("version_updated_at");
  CREATE INDEX "_socials_v_version_version_created_at_idx" ON "_socials_v" USING btree ("version_created_at");
  CREATE INDEX "_socials_v_version_version__status_idx" ON "_socials_v" USING btree ("version__status");
  CREATE INDEX "_socials_v_created_at_idx" ON "_socials_v" USING btree ("created_at");
  CREATE INDEX "_socials_v_updated_at_idx" ON "_socials_v" USING btree ("updated_at");
  CREATE INDEX "_socials_v_latest_idx" ON "_socials_v" USING btree ("latest");
  CREATE INDEX "_socials_v_autosave_idx" ON "_socials_v" USING btree ("autosave");
  CREATE INDEX "socials__status_idx" ON "socials" USING btree ("_status");`)
}
