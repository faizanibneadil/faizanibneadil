import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_educations_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_educations_v" CASCADE;
  DROP INDEX "educations__status_idx";
  ALTER TABLE "educations" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "educations" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "educations" DROP COLUMN "_status";
  DROP TYPE "public"."enum_educations_status";
  DROP TYPE "public"."enum__educations_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_educations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__educations_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_educations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_qualification_academy" varchar,
  	"version_qualification_degree" varchar,
  	"version_dates_to" timestamp(3) with time zone,
  	"version_dates_from" timestamp(3) with time zone,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__educations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "educations" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "educations" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "educations" ADD COLUMN "_status" "enum_educations_status" DEFAULT 'draft';
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_parent_id_educations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."educations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_educations_v_parent_idx" ON "_educations_v" USING btree ("parent_id");
  CREATE INDEX "_educations_v_version_version_tenant_idx" ON "_educations_v" USING btree ("version_tenant_id");
  CREATE INDEX "_educations_v_version_version_image_idx" ON "_educations_v" USING btree ("version_image_id");
  CREATE INDEX "_educations_v_version_version_updated_at_idx" ON "_educations_v" USING btree ("version_updated_at");
  CREATE INDEX "_educations_v_version_version_created_at_idx" ON "_educations_v" USING btree ("version_created_at");
  CREATE INDEX "_educations_v_version_version_deleted_at_idx" ON "_educations_v" USING btree ("version_deleted_at");
  CREATE INDEX "_educations_v_version_version__status_idx" ON "_educations_v" USING btree ("version__status");
  CREATE INDEX "_educations_v_created_at_idx" ON "_educations_v" USING btree ("created_at");
  CREATE INDEX "_educations_v_updated_at_idx" ON "_educations_v" USING btree ("updated_at");
  CREATE INDEX "_educations_v_latest_idx" ON "_educations_v" USING btree ("latest");
  CREATE INDEX "_educations_v_autosave_idx" ON "_educations_v" USING btree ("autosave");
  CREATE INDEX "educations__status_idx" ON "educations" USING btree ("_status");`)
}
