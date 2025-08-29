import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_certifications_v_version_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_certifications_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_certifications_v_version_links" CASCADE;
  DROP TABLE "_certifications_v" CASCADE;
  DROP INDEX "certifications__status_idx";
  ALTER TABLE "certifications_links" ALTER COLUMN "icon_id" SET NOT NULL;
  ALTER TABLE "certifications_links" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "certifications_links" ALTER COLUMN "link" SET NOT NULL;
  ALTER TABLE "certifications" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "certifications" ALTER COLUMN "dates_to" SET NOT NULL;
  ALTER TABLE "certifications" ALTER COLUMN "dates_from" SET NOT NULL;
  ALTER TABLE "certifications" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "certifications" DROP COLUMN "_status";
  DROP TYPE "public"."enum_certifications_status";
  DROP TYPE "public"."enum__certifications_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_certifications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certifications_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_certifications_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_certifications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_dates_to" timestamp(3) with time zone,
  	"version_dates_from" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__certifications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "certifications_links" ALTER COLUMN "icon_id" DROP NOT NULL;
  ALTER TABLE "certifications_links" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "certifications_links" ALTER COLUMN "link" DROP NOT NULL;
  ALTER TABLE "certifications" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "certifications" ALTER COLUMN "dates_to" DROP NOT NULL;
  ALTER TABLE "certifications" ALTER COLUMN "dates_from" DROP NOT NULL;
  ALTER TABLE "certifications" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN "_status" "enum_certifications_status" DEFAULT 'draft';
  ALTER TABLE "_certifications_v_version_links" ADD CONSTRAINT "_certifications_v_version_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v_version_links" ADD CONSTRAINT "_certifications_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_certifications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_parent_id_certifications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_certifications_v_version_links_order_idx" ON "_certifications_v_version_links" USING btree ("_order");
  CREATE INDEX "_certifications_v_version_links_parent_id_idx" ON "_certifications_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_certifications_v_version_links_icon_idx" ON "_certifications_v_version_links" USING btree ("icon_id");
  CREATE INDEX "_certifications_v_parent_idx" ON "_certifications_v" USING btree ("parent_id");
  CREATE INDEX "_certifications_v_version_version_tenant_idx" ON "_certifications_v" USING btree ("version_tenant_id");
  CREATE INDEX "_certifications_v_version_version_image_idx" ON "_certifications_v" USING btree ("version_image_id");
  CREATE INDEX "_certifications_v_version_version_updated_at_idx" ON "_certifications_v" USING btree ("version_updated_at");
  CREATE INDEX "_certifications_v_version_version_created_at_idx" ON "_certifications_v" USING btree ("version_created_at");
  CREATE INDEX "_certifications_v_version_version_deleted_at_idx" ON "_certifications_v" USING btree ("version_deleted_at");
  CREATE INDEX "_certifications_v_version_version__status_idx" ON "_certifications_v" USING btree ("version__status");
  CREATE INDEX "_certifications_v_created_at_idx" ON "_certifications_v" USING btree ("created_at");
  CREATE INDEX "_certifications_v_updated_at_idx" ON "_certifications_v" USING btree ("updated_at");
  CREATE INDEX "_certifications_v_latest_idx" ON "_certifications_v" USING btree ("latest");
  CREATE INDEX "_certifications_v_autosave_idx" ON "_certifications_v" USING btree ("autosave");
  CREATE INDEX "certifications__status_idx" ON "certifications" USING btree ("_status");`)
}
