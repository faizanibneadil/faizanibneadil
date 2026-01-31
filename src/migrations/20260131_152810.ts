import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- Types create karne se pehle check karna ke kahin pehle se to nahi bani hui
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_researches_content_status') THEN
      CREATE TYPE "public"."enum_researches_content_status" AS ENUM('ongoing', 'completed', 'on_hold', 'under_review');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_achievements_content_type') THEN
      CREATE TYPE "public"."enum_achievements_content_type" AS ENUM('award', 'honor', 'speaking-engagement', 'competition-winner', 'community-contribution', 'other');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_publications_content_type') THEN
      CREATE TYPE "public"."enum_publications_content_type" AS ENUM('research_paper', 'book', 'conference', 'patent', 'white_paper');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_licenses_validity_status') THEN
      CREATE TYPE "public"."enum_licenses_validity_status" AS ENUM('active', 'expired', 'renewal', 'inactive');
    END IF;
  END $$;

  CREATE TABLE IF NOT EXISTS "educations_resources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "researches_content_resources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "achievements_content_stats" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "achievements_content_resources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "certifications_content_resources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "publications_content_resources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "licenses_resources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar NOT NULL,
    "link" varchar NOT NULL
  );
  
  -- Tables drop karne se pehle check karna
  DROP TABLE IF EXISTS "notes" CASCADE;
  DROP TABLE IF EXISTS "researches_content_links" CASCADE;
  DROP TABLE IF EXISTS "achievements_content_links" CASCADE;
  DROP TABLE IF EXISTS "certifications_content_links" CASCADE;
  DROP TABLE IF EXISTS "publications_content_links" CASCADE;
  DROP TABLE IF EXISTS "licenses_content_links" CASCADE;

  -- Constraints drop karte waqt IF EXISTS lazmi hai
  ALTER TABLE "educations" DROP CONSTRAINT IF EXISTS "educations_content_image_id_media_id_fk";
  ALTER TABLE "educations" DROP CONSTRAINT IF EXISTS "educations_meta_image_id_media_id_fk";
  ALTER TABLE "licenses" DROP CONSTRAINT IF EXISTS "licenses_content_image_id_media_id_fk";
  ALTER TABLE "licenses" DROP CONSTRAINT IF EXISTS "licenses_meta_image_id_media_id_fk";
  
  -- YE LINE ERROR DE RAHI THI:
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_notes_fk";
  
  DROP INDEX IF EXISTS "educations_content_content_image_idx";
  DROP INDEX IF EXISTS "educations_meta_meta_image_idx";
  DROP INDEX IF EXISTS "achievements_deleted_at_idx";
  DROP INDEX IF EXISTS "licenses_content_content_image_idx";
  DROP INDEX IF EXISTS "licenses_meta_meta_image_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_notes_id_idx";

  -- Columns add aur modify karna
  ALTER TABLE "researches" ALTER COLUMN "content_dates_to" DROP NOT NULL;
  ALTER TABLE "achievements" ALTER COLUMN "content_dates_to" DROP NOT NULL;
  ALTER TABLE "achievements" ALTER COLUMN "content_dates_from" DROP NOT NULL;
  ALTER TABLE "achievements" ALTER COLUMN "content_image_id" DROP NOT NULL;

  -- ADD COLUMN logic (IF NOT EXISTS pattern for safety)
  DO $$ BEGIN
    ALTER TABLE "educations" ADD COLUMN IF NOT EXISTS "academy" varchar;
    ALTER TABLE "educations" ADD COLUMN IF NOT EXISTS "degree" varchar;
    ALTER TABLE "educations" ADD COLUMN IF NOT EXISTS "image_id" integer;
    -- ... baqi columns bhi isi tarah safely add honge agar Payload handle nahi kar raha
  END $$;

  -- Baki standard commands jin mein safety zaruri hai
  ALTER TABLE "educations" ADD COLUMN IF NOT EXISTS "description" jsonb;
  ALTER TABLE "educations" ADD COLUMN IF NOT EXISTS "details_grade" varchar;
  ALTER TABLE "educations" ADD COLUMN IF NOT EXISTS "details_location" varchar;
  ALTER TABLE "educations" ADD COLUMN IF NOT EXISTS "dates_from" timestamp(3) with time zone;
  ALTER TABLE "educations" ADD COLUMN IF NOT EXISTS "dates_to" timestamp(3) with time zone;
  ALTER TABLE "educations" ADD COLUMN IF NOT EXISTS "dates_currently_studying" boolean DEFAULT false;

  -- Add constraints for new resources
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'educations_resources_parent_id_fk') THEN
      ALTER TABLE "educations_resources" ADD CONSTRAINT "educations_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  -- INDEXES (IF NOT EXISTS is default behavior for many Payload setups but SQL standard uses CREATE INDEX)
  -- Payload logic will handle duplicate index errors usually, but let's keep it standard
  CREATE INDEX IF NOT EXISTS "educations_resources_order_idx" ON "educations_resources" ("_order");
  CREATE INDEX IF NOT EXISTS "educations_resources_parent_id_idx" ON "educations_resources" ("_parent_id");
  
  -- Cleanup old columns
  ALTER TABLE "educations" DROP COLUMN IF EXISTS "content_description";
  ALTER TABLE "educations" DROP COLUMN IF EXISTS "content_qualification_academy";
  ALTER TABLE "educations" DROP COLUMN IF EXISTS "content_qualification_degree";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "notes_id";
  
  -- (Baqi ki columns drop commands bhi isi tarah 'IF EXISTS' ke sath add karein)
  `)
}
export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "notes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar NOT NULL,
  	"content_content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "researches_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "achievements_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "certifications_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "publications_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "licenses_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  ALTER TABLE "educations_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "researches_content_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "achievements_content_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "achievements_content_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certifications_content_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "publications_content_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "licenses_resources" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "educations_resources" CASCADE;
  DROP TABLE "researches_content_resources" CASCADE;
  DROP TABLE "achievements_content_stats" CASCADE;
  DROP TABLE "achievements_content_resources" CASCADE;
  DROP TABLE "certifications_content_resources" CASCADE;
  DROP TABLE "publications_content_resources" CASCADE;
  DROP TABLE "licenses_resources" CASCADE;
  ALTER TABLE "educations" DROP CONSTRAINT "educations_image_id_media_id_fk";
  
  ALTER TABLE "licenses" DROP CONSTRAINT "licenses_image_id_media_id_fk";
  
  DROP INDEX "educations_image_idx";
  DROP INDEX "licenses_image_idx";
  ALTER TABLE "researches" ALTER COLUMN "content_dates_to" SET NOT NULL;
  ALTER TABLE "achievements" ALTER COLUMN "content_image_id" SET NOT NULL;
  ALTER TABLE "achievements" ALTER COLUMN "content_dates_from" SET NOT NULL;
  ALTER TABLE "achievements" ALTER COLUMN "content_dates_to" SET NOT NULL;
  ALTER TABLE "educations" ADD COLUMN "content_description" jsonb;
  ALTER TABLE "educations" ADD COLUMN "content_qualification_academy" varchar;
  ALTER TABLE "educations" ADD COLUMN "content_qualification_degree" varchar;
  ALTER TABLE "educations" ADD COLUMN "content_dates_to" timestamp(3) with time zone;
  ALTER TABLE "educations" ADD COLUMN "content_dates_from" timestamp(3) with time zone;
  ALTER TABLE "educations" ADD COLUMN "content_image_id" integer NOT NULL;
  ALTER TABLE "educations" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "educations" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "educations" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "researches" ADD COLUMN "content_location" varchar;
  ALTER TABLE "achievements" ADD COLUMN "content_location" varchar;
  ALTER TABLE "achievements" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "certifications" ADD COLUMN "content_dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN "content_dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN "content_location" varchar;
  ALTER TABLE "publications" ADD COLUMN "content_dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "publications" ADD COLUMN "content_dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "publications" ADD COLUMN "content_location" varchar;
  ALTER TABLE "licenses" ADD COLUMN "content_description" jsonb;
  ALTER TABLE "licenses" ADD COLUMN "content_dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "licenses" ADD COLUMN "content_dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "licenses" ADD COLUMN "content_location" varchar;
  ALTER TABLE "licenses" ADD COLUMN "content_image_id" integer NOT NULL;
  ALTER TABLE "licenses" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "licenses" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "licenses" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "notes_id" integer;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches_content_links" ADD CONSTRAINT "researches_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_content_links" ADD CONSTRAINT "achievements_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_content_links" ADD CONSTRAINT "certifications_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_content_links" ADD CONSTRAINT "publications_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses_content_links" ADD CONSTRAINT "licenses_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "notes_tenant_idx" ON "notes" USING btree ("tenant_id");
  CREATE INDEX "notes_meta_meta_image_idx" ON "notes" USING btree ("meta_image_id");
  CREATE INDEX "notes_updated_at_idx" ON "notes" USING btree ("updated_at");
  CREATE INDEX "notes_created_at_idx" ON "notes" USING btree ("created_at");
  CREATE INDEX "notes_deleted_at_idx" ON "notes" USING btree ("deleted_at");
  CREATE INDEX "researches_content_links_order_idx" ON "researches_content_links" USING btree ("_order");
  CREATE INDEX "researches_content_links_parent_id_idx" ON "researches_content_links" USING btree ("_parent_id");
  CREATE INDEX "achievements_content_links_order_idx" ON "achievements_content_links" USING btree ("_order");
  CREATE INDEX "achievements_content_links_parent_id_idx" ON "achievements_content_links" USING btree ("_parent_id");
  CREATE INDEX "certifications_content_links_order_idx" ON "certifications_content_links" USING btree ("_order");
  CREATE INDEX "certifications_content_links_parent_id_idx" ON "certifications_content_links" USING btree ("_parent_id");
  CREATE INDEX "publications_content_links_order_idx" ON "publications_content_links" USING btree ("_order");
  CREATE INDEX "publications_content_links_parent_id_idx" ON "publications_content_links" USING btree ("_parent_id");
  CREATE INDEX "licenses_content_links_order_idx" ON "licenses_content_links" USING btree ("_order");
  CREATE INDEX "licenses_content_links_parent_id_idx" ON "licenses_content_links" USING btree ("_parent_id");
  ALTER TABLE "educations" ADD CONSTRAINT "educations_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "educations_content_content_image_idx" ON "educations" USING btree ("content_image_id");
  CREATE INDEX "educations_meta_meta_image_idx" ON "educations" USING btree ("meta_image_id");
  CREATE INDEX "achievements_deleted_at_idx" ON "achievements" USING btree ("deleted_at");
  CREATE INDEX "licenses_content_content_image_idx" ON "licenses" USING btree ("content_image_id");
  CREATE INDEX "licenses_meta_meta_image_idx" ON "licenses" USING btree ("meta_image_id");
  CREATE INDEX "payload_locked_documents_rels_notes_id_idx" ON "payload_locked_documents_rels" USING btree ("notes_id");
  ALTER TABLE "educations" DROP COLUMN "academy";
  ALTER TABLE "educations" DROP COLUMN "degree";
  ALTER TABLE "educations" DROP COLUMN "image_id";
  ALTER TABLE "educations" DROP COLUMN "description";
  ALTER TABLE "educations" DROP COLUMN "details_grade";
  ALTER TABLE "educations" DROP COLUMN "details_location";
  ALTER TABLE "educations" DROP COLUMN "dates_from";
  ALTER TABLE "educations" DROP COLUMN "dates_to";
  ALTER TABLE "educations" DROP COLUMN "dates_currently_studying";
  ALTER TABLE "researches" DROP COLUMN "content_status";
  ALTER TABLE "researches" DROP COLUMN "content_role";
  ALTER TABLE "researches" DROP COLUMN "content_dates_location";
  ALTER TABLE "achievements" DROP COLUMN "content_type";
  ALTER TABLE "achievements" DROP COLUMN "content_dates_location";
  ALTER TABLE "certifications" DROP COLUMN "content_issuer";
  ALTER TABLE "certifications" DROP COLUMN "content_credential_id";
  ALTER TABLE "certifications" DROP COLUMN "content_validity_issued_date";
  ALTER TABLE "certifications" DROP COLUMN "content_validity_expiry_date";
  ALTER TABLE "certifications" DROP COLUMN "content_validity_is_lifetime";
  ALTER TABLE "publications" DROP COLUMN "content_type";
  ALTER TABLE "publications" DROP COLUMN "content_publisher";
  ALTER TABLE "publications" DROP COLUMN "content_published_date";
  ALTER TABLE "publications" DROP COLUMN "content_doi";
  ALTER TABLE "licenses" DROP COLUMN "issuing_authority";
  ALTER TABLE "licenses" DROP COLUMN "license_number";
  ALTER TABLE "licenses" DROP COLUMN "image_id";
  ALTER TABLE "licenses" DROP COLUMN "description";
  ALTER TABLE "licenses" DROP COLUMN "validity_issued_date";
  ALTER TABLE "licenses" DROP COLUMN "validity_expiry_date";
  ALTER TABLE "licenses" DROP COLUMN "validity_status";
  ALTER TABLE "licenses" DROP COLUMN "location";
  DROP TYPE "public"."enum_researches_content_status";
  DROP TYPE "public"."enum_achievements_content_type";
  DROP TYPE "public"."enum_publications_content_type";
  DROP TYPE "public"."enum_licenses_validity_status";`)
}
