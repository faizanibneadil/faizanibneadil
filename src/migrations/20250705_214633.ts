import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_educations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__educations_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "educations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"qualification_academy" varchar,
  	"qualification_degree" varchar,
  	"dates_to" timestamp(3) with time zone,
  	"dates_from" timestamp(3) with time zone,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_educations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_educations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_qualification_academy" varchar,
  	"version_qualification_degree" varchar,
  	"version_dates_to" timestamp(3) with time zone,
  	"version_dates_from" timestamp(3) with time zone,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__educations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "pages_blocks_education_educations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_education_educations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_education_educations" CASCADE;
  DROP TABLE "_pages_v_blocks_education_educations" CASCADE;
  ALTER TABLE "pages_rels" ADD COLUMN "educations_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "educations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "educations_id" integer;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_parent_id_educations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."educations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "educations_image_idx" ON "educations" USING btree ("image_id");
  CREATE INDEX "educations_updated_at_idx" ON "educations" USING btree ("updated_at");
  CREATE INDEX "educations_created_at_idx" ON "educations" USING btree ("created_at");
  CREATE INDEX "educations__status_idx" ON "educations" USING btree ("_status");
  CREATE INDEX "_educations_v_parent_idx" ON "_educations_v" USING btree ("parent_id");
  CREATE INDEX "_educations_v_version_version_image_idx" ON "_educations_v" USING btree ("version_image_id");
  CREATE INDEX "_educations_v_version_version_updated_at_idx" ON "_educations_v" USING btree ("version_updated_at");
  CREATE INDEX "_educations_v_version_version_created_at_idx" ON "_educations_v" USING btree ("version_created_at");
  CREATE INDEX "_educations_v_version_version__status_idx" ON "_educations_v" USING btree ("version__status");
  CREATE INDEX "_educations_v_created_at_idx" ON "_educations_v" USING btree ("created_at");
  CREATE INDEX "_educations_v_updated_at_idx" ON "_educations_v" USING btree ("updated_at");
  CREATE INDEX "_educations_v_latest_idx" ON "_educations_v" USING btree ("latest");
  CREATE INDEX "_educations_v_autosave_idx" ON "_educations_v" USING btree ("autosave");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_educations_fk" FOREIGN KEY ("educations_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_educations_fk" FOREIGN KEY ("educations_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_educations_fk" FOREIGN KEY ("educations_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_educations_id_idx" ON "pages_rels" USING btree ("educations_id");
  CREATE INDEX "_pages_v_rels_educations_id_idx" ON "_pages_v_rels" USING btree ("educations_id");
  CREATE INDEX "payload_locked_documents_rels_educations_id_idx" ON "payload_locked_documents_rels" USING btree ("educations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_education_educations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"academy" varchar,
  	"degree" varchar,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"description" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_education_educations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"academy" varchar,
  	"degree" varchar,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "educations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_educations_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "educations" CASCADE;
  DROP TABLE "_educations_v" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_educations_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_educations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_educations_fk";
  
  DROP INDEX "pages_rels_educations_id_idx";
  DROP INDEX "_pages_v_rels_educations_id_idx";
  DROP INDEX "payload_locked_documents_rels_educations_id_idx";
  ALTER TABLE "pages_blocks_education_educations" ADD CONSTRAINT "pages_blocks_education_educations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_education"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_education_educations" ADD CONSTRAINT "_pages_v_blocks_education_educations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_education"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_education_educations_order_idx" ON "pages_blocks_education_educations" USING btree ("_order");
  CREATE INDEX "pages_blocks_education_educations_parent_id_idx" ON "pages_blocks_education_educations" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_education_educations_order_idx" ON "_pages_v_blocks_education_educations" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_education_educations_parent_id_idx" ON "_pages_v_blocks_education_educations" USING btree ("_parent_id");
  ALTER TABLE "pages_rels" DROP COLUMN "educations_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "educations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "educations_id";
  DROP TYPE "public"."enum_educations_status";
  DROP TYPE "public"."enum__educations_v_version_status";`)
}
