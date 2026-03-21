import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "educations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer
  );
  
  CREATE TABLE "hackathons_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer
  );
  
  CREATE TABLE "researches_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer
  );
  
  CREATE TABLE "achievements_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer
  );
  
  CREATE TABLE "certifications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer
  );
  
  CREATE TABLE "publications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer
  );
  
  CREATE TABLE "themes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"thumbnail_id" integer,
  	"description" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  ALTER TABLE "skills_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "skills_rels" CASCADE;
  ALTER TABLE "blogs" ALTER COLUMN "content_featured_image_id" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "content_configured_collection_slug" varchar;
  ALTER TABLE "pages" ADD COLUMN "enable_collection" boolean DEFAULT false NOT NULL;
  ALTER TABLE "skills" ADD COLUMN "enable_label" boolean DEFAULT false;
  ALTER TABLE "skills" ADD COLUMN "skill_custom_label" varchar;
  ALTER TABLE "skills" ADD COLUMN "enable_icon" boolean DEFAULT false;
  ALTER TABLE "skills" ADD COLUMN "icon" varchar;
  ALTER TABLE "skills" ADD COLUMN "enable_achievements_count" boolean DEFAULT false;
  ALTER TABLE "skills" ADD COLUMN "enable_certifications_count" boolean DEFAULT false;
  ALTER TABLE "skills" ADD COLUMN "enable_educations_count" boolean DEFAULT false;
  ALTER TABLE "skills" ADD COLUMN "enable_experiences_count" boolean DEFAULT false;
  ALTER TABLE "skills" ADD COLUMN "enable_hackathons_count" boolean DEFAULT false;
  ALTER TABLE "skills" ADD COLUMN "enable_projects_count" boolean DEFAULT false;
  ALTER TABLE "skills" ADD COLUMN "enable_publications_count" boolean DEFAULT false;
  ALTER TABLE "skills" ADD COLUMN "enable_researches_count" boolean DEFAULT false;
  ALTER TABLE "portfolio_settings" ADD COLUMN "theme_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "themes_id" integer;
  ALTER TABLE "educations_rels" ADD CONSTRAINT "educations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educations_rels" ADD CONSTRAINT "educations_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_rels" ADD CONSTRAINT "researches_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_rels" ADD CONSTRAINT "researches_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_rels" ADD CONSTRAINT "achievements_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_rels" ADD CONSTRAINT "achievements_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "themes" ADD CONSTRAINT "themes_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "educations_rels_order_idx" ON "educations_rels" USING btree ("order");
  CREATE INDEX "educations_rels_parent_idx" ON "educations_rels" USING btree ("parent_id");
  CREATE INDEX "educations_rels_path_idx" ON "educations_rels" USING btree ("path");
  CREATE INDEX "educations_rels_skills_id_idx" ON "educations_rels" USING btree ("skills_id");
  CREATE INDEX "hackathons_rels_order_idx" ON "hackathons_rels" USING btree ("order");
  CREATE INDEX "hackathons_rels_parent_idx" ON "hackathons_rels" USING btree ("parent_id");
  CREATE INDEX "hackathons_rels_path_idx" ON "hackathons_rels" USING btree ("path");
  CREATE INDEX "hackathons_rels_skills_id_idx" ON "hackathons_rels" USING btree ("skills_id");
  CREATE INDEX "researches_rels_order_idx" ON "researches_rels" USING btree ("order");
  CREATE INDEX "researches_rels_parent_idx" ON "researches_rels" USING btree ("parent_id");
  CREATE INDEX "researches_rels_path_idx" ON "researches_rels" USING btree ("path");
  CREATE INDEX "researches_rels_skills_id_idx" ON "researches_rels" USING btree ("skills_id");
  CREATE INDEX "achievements_rels_order_idx" ON "achievements_rels" USING btree ("order");
  CREATE INDEX "achievements_rels_parent_idx" ON "achievements_rels" USING btree ("parent_id");
  CREATE INDEX "achievements_rels_path_idx" ON "achievements_rels" USING btree ("path");
  CREATE INDEX "achievements_rels_skills_id_idx" ON "achievements_rels" USING btree ("skills_id");
  CREATE INDEX "certifications_rels_order_idx" ON "certifications_rels" USING btree ("order");
  CREATE INDEX "certifications_rels_parent_idx" ON "certifications_rels" USING btree ("parent_id");
  CREATE INDEX "certifications_rels_path_idx" ON "certifications_rels" USING btree ("path");
  CREATE INDEX "certifications_rels_skills_id_idx" ON "certifications_rels" USING btree ("skills_id");
  CREATE INDEX "publications_rels_order_idx" ON "publications_rels" USING btree ("order");
  CREATE INDEX "publications_rels_parent_idx" ON "publications_rels" USING btree ("parent_id");
  CREATE INDEX "publications_rels_path_idx" ON "publications_rels" USING btree ("path");
  CREATE INDEX "publications_rels_skills_id_idx" ON "publications_rels" USING btree ("skills_id");
  CREATE INDEX "themes_thumbnail_idx" ON "themes" USING btree ("thumbnail_id");
  CREATE INDEX "themes_updated_at_idx" ON "themes" USING btree ("updated_at");
  CREATE INDEX "themes_created_at_idx" ON "themes" USING btree ("created_at");
  CREATE INDEX "themes_deleted_at_idx" ON "themes" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  ALTER TABLE "portfolio_settings" ADD CONSTRAINT "portfolio_settings_theme_id_themes_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."themes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_themes_fk" FOREIGN KEY ("themes_id") REFERENCES "public"."themes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "portfolio_settings_theme_idx" ON "portfolio_settings" USING btree ("theme_id");
  CREATE INDEX "payload_locked_documents_rels_themes_id_idx" ON "payload_locked_documents_rels" USING btree ("themes_id");
  ALTER TABLE "pages" DROP COLUMN "content_page_mode_mode";
  ALTER TABLE "pages" DROP COLUMN "content_configurations_slug";
  ALTER TABLE "skills" DROP COLUMN "techstack_show_icon";
  ALTER TABLE "skills" DROP COLUMN "techstack_iconify";
  DROP TYPE "public"."enum_pages_content_page_mode_mode";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_content_page_mode_mode" AS ENUM('layout', 'collection');
  CREATE TABLE "skills_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  ALTER TABLE "educations_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hackathons_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "researches_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "achievements_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certifications_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "publications_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "themes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "educations_rels" CASCADE;
  DROP TABLE "hackathons_rels" CASCADE;
  DROP TABLE "researches_rels" CASCADE;
  DROP TABLE "achievements_rels" CASCADE;
  DROP TABLE "certifications_rels" CASCADE;
  DROP TABLE "publications_rels" CASCADE;
  DROP TABLE "themes" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  ALTER TABLE "portfolio_settings" DROP CONSTRAINT "portfolio_settings_theme_id_themes_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_themes_fk";
  
  DROP INDEX "portfolio_settings_theme_idx";
  DROP INDEX "payload_locked_documents_rels_themes_id_idx";
  ALTER TABLE "blogs" ALTER COLUMN "content_featured_image_id" SET NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "content_page_mode_mode" "enum_pages_content_page_mode_mode" DEFAULT 'layout' NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "content_configurations_slug" varchar;
  ALTER TABLE "skills" ADD COLUMN "techstack_show_icon" boolean;
  ALTER TABLE "skills" ADD COLUMN "techstack_iconify" varchar;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "skills_rels_order_idx" ON "skills_rels" USING btree ("order");
  CREATE INDEX "skills_rels_parent_idx" ON "skills_rels" USING btree ("parent_id");
  CREATE INDEX "skills_rels_path_idx" ON "skills_rels" USING btree ("path");
  CREATE INDEX "skills_rels_projects_id_idx" ON "skills_rels" USING btree ("projects_id");
  ALTER TABLE "pages" DROP COLUMN "content_configured_collection_slug";
  ALTER TABLE "pages" DROP COLUMN "enable_collection";
  ALTER TABLE "skills" DROP COLUMN "enable_label";
  ALTER TABLE "skills" DROP COLUMN "skill_custom_label";
  ALTER TABLE "skills" DROP COLUMN "enable_icon";
  ALTER TABLE "skills" DROP COLUMN "icon";
  ALTER TABLE "skills" DROP COLUMN "enable_achievements_count";
  ALTER TABLE "skills" DROP COLUMN "enable_certifications_count";
  ALTER TABLE "skills" DROP COLUMN "enable_educations_count";
  ALTER TABLE "skills" DROP COLUMN "enable_experiences_count";
  ALTER TABLE "skills" DROP COLUMN "enable_hackathons_count";
  ALTER TABLE "skills" DROP COLUMN "enable_projects_count";
  ALTER TABLE "skills" DROP COLUMN "enable_publications_count";
  ALTER TABLE "skills" DROP COLUMN "enable_researches_count";
  ALTER TABLE "portfolio_settings" DROP COLUMN "theme_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "themes_id";`)
}
