import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First, update any null values in the title column
  await db.execute(sql`
    UPDATE "pages" SET "title" = 'Untitled' WHERE "title" IS NULL;
  `);

  // Then, update any null values in the page_mode_mode column
  await db.execute(sql`
    UPDATE "pages" SET "page_mode_mode" = 'layout' WHERE "page_mode_mode" IS NULL;
  `);

  // Now proceed with the original migration commands
  await db.execute(sql`
   ALTER TABLE "_pages_v_blocks_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_achievement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_certification" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_education" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_experiance_experiances" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_experiance" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hackathon" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_license" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_project" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_publication" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_skill" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_research" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_pages_v_blocks_about" CASCADE;
  DROP TABLE "_pages_v_blocks_achievement" CASCADE;
  DROP TABLE "_pages_v_blocks_certification" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_education" CASCADE;
  DROP TABLE "_pages_v_blocks_experiance_experiances" CASCADE;
  DROP TABLE "_pages_v_blocks_experiance" CASCADE;
  DROP TABLE "_pages_v_blocks_hackathon" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_license" CASCADE;
  DROP TABLE "_pages_v_blocks_project" CASCADE;
  DROP TABLE "_pages_v_blocks_publication" CASCADE;
  DROP TABLE "_pages_v_blocks_skill" CASCADE;
  DROP TABLE "_pages_v_blocks_research" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP INDEX "pages__status_idx";
  ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "page_mode_mode" SET NOT NULL;
  ALTER TABLE "pages" DROP COLUMN "_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_page_mode_mode";
  DROP TYPE "public"."enum__pages_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_page_mode_mode" AS ENUM('layout', 'collection');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_pages_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_achievement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_certification" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_experiance_experiances" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"company" varchar,
  	"subtitle" varchar,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_experiance" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hackathon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name_on_resume" varchar,
  	"headline" varchar,
  	"profile_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_license" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_project" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_publication" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_skill" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_research" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_page_mode_mode" "enum__pages_v_version_page_mode_mode" DEFAULT 'layout',
  	"version_configurations_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"achievements_id" integer,
  	"certifications_id" integer,
  	"educations_id" integer,
  	"hackathons_id" integer,
  	"licenses_id" integer,
  	"projects_id" integer,
  	"publications_id" integer,
  	"skills_id" integer,
  	"researches_id" integer
  );
  
  ALTER TABLE "pages" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "page_mode_mode" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "_status" "enum_pages_status" DEFAULT 'draft';
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_achievement" ADD CONSTRAINT "_pages_v_blocks_achievement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_certification" ADD CONSTRAINT "_pages_v_blocks_certification_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_education" ADD CONSTRAINT "_pages_v_blocks_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_experiance_experiances" ADD CONSTRAINT "_pages_v_blocks_experiance_experiances_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_experiance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_experiance" ADD CONSTRAINT "_pages_v_blocks_experiance_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hackathon" ADD CONSTRAINT "_pages_v_blocks_hackathon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_profile_id_media_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_license" ADD CONSTRAINT "_pages_v_blocks_license_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_project" ADD CONSTRAINT "_pages_v_blocks_project_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_publication" ADD CONSTRAINT "_pages_v_blocks_publication_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_skill" ADD CONSTRAINT "_pages_v_blocks_skill_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_research" ADD CONSTRAINT "_pages_v_blocks_research_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_achievements_fk" FOREIGN KEY ("achievements_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_certifications_fk" FOREIGN KEY ("certifications_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_educations_fk" FOREIGN KEY ("educations_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_hackathons_fk" FOREIGN KEY ("hackathons_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_licenses_fk" FOREIGN KEY ("licenses_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_researches_fk" FOREIGN KEY ("researches_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_pages_v_blocks_about_order_idx" ON "_pages_v_blocks_about" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_parent_id_idx" ON "_pages_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_path_idx" ON "_pages_v_blocks_about" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_achievement_order_idx" ON "_pages_v_blocks_achievement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_achievement_parent_id_idx" ON "_pages_v_blocks_achievement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_achievement_path_idx" ON "_pages_v_blocks_achievement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_certification_order_idx" ON "_pages_v_blocks_certification" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_certification_parent_id_idx" ON "_pages_v_blocks_certification" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_certification_path_idx" ON "_pages_v_blocks_certification" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_education_order_idx" ON "_pages_v_blocks_education" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_education_parent_id_idx" ON "_pages_v_blocks_education" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_education_path_idx" ON "_pages_v_blocks_education" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_experiance_experiances_order_idx" ON "_pages_v_blocks_experiance_experiances" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_experiance_experiances_parent_id_idx" ON "_pages_v_blocks_experiance_experiances" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_experiance_order_idx" ON "_pages_v_blocks_experiance" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_experiance_parent_id_idx" ON "_pages_v_blocks_experiance" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_experiance_path_idx" ON "_pages_v_blocks_experiance" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hackathon_order_idx" ON "_pages_v_blocks_hackathon" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hackathon_parent_id_idx" ON "_pages_v_blocks_hackathon" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hackathon_path_idx" ON "_pages_v_blocks_hackathon" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_profile_idx" ON "_pages_v_blocks_hero" USING btree ("profile_id");
  CREATE INDEX "_pages_v_blocks_license_order_idx" ON "_pages_v_blocks_license" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_license_parent_id_idx" ON "_pages_v_blocks_license" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_license_path_idx" ON "_pages_v_blocks_license" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_project_order_idx" ON "_pages_v_blocks_project" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_project_parent_id_idx" ON "_pages_v_blocks_project" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_project_path_idx" ON "_pages_v_blocks_project" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_publication_order_idx" ON "_pages_v_blocks_publication" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_publication_parent_id_idx" ON "_pages_v_blocks_publication" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_publication_path_idx" ON "_pages_v_blocks_publication" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_skill_order_idx" ON "_pages_v_blocks_skill" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_skill_parent_id_idx" ON "_pages_v_blocks_skill" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_skill_path_idx" ON "_pages_v_blocks_skill" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_research_order_idx" ON "_pages_v_blocks_research" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_research_parent_id_idx" ON "_pages_v_blocks_research" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_research_path_idx" ON "_pages_v_blocks_research" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_tenant_idx" ON "_pages_v" USING btree ("version_tenant_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version_deleted_at_idx" ON "_pages_v" USING btree ("version_deleted_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_achievements_id_idx" ON "_pages_v_rels" USING btree ("achievements_id");
  CREATE INDEX "_pages_v_rels_certifications_id_idx" ON "_pages_v_rels" USING btree ("certifications_id");
  CREATE INDEX "_pages_v_rels_educations_id_idx" ON "_pages_v_rels" USING btree ("educations_id");
  CREATE INDEX "_pages_v_rels_hackathons_id_idx" ON "_pages_v_rels" USING btree ("hackathons_id");
  CREATE INDEX "_pages_v_rels_licenses_id_idx" ON "_pages_v_rels" USING btree ("licenses_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_publications_id_idx" ON "_pages_v_rels" USING btree ("publications_id");
  CREATE INDEX "_pages_v_rels_skills_id_idx" ON "_pages_v_rels" USING btree ("skills_id");
  CREATE INDEX "_pages_v_rels_researches_id_idx" ON "_pages_v_rels" USING btree ("researches_id");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");`)
}
