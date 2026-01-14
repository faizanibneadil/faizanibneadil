import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_content_page_mode_mode" AS ENUM('layout', 'collection');
  CREATE TABLE "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "notes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "blogs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "educations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "projects_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "menus_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "socials_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "hackathons_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "hackathons_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "researches_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "researches_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "achievements_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "achievements_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "certifications_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "certifications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "publications_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "publications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "licenses_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "licenses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "integration_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "form_submissions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  ALTER TABLE "projects_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hackathons_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "researches_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "achievements_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certifications_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "publications_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "licenses_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "projects_links" CASCADE;
  DROP TABLE "hackathons_links" CASCADE;
  DROP TABLE "researches_links" CASCADE;
  DROP TABLE "achievements_links" CASCADE;
  DROP TABLE "certifications_links" CASCADE;
  DROP TABLE "publications_links" CASCADE;
  DROP TABLE "licenses_links" CASCADE;
  ALTER TABLE "media" DROP CONSTRAINT "media_tenant_id_tenants_id_fk";
  
  ALTER TABLE "notes" DROP CONSTRAINT "notes_tenant_id_tenants_id_fk";
  
  ALTER TABLE "notes" DROP CONSTRAINT "notes_meta_image_id_media_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_tenant_id_tenants_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_featured_image_id_media_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_meta_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_tenant_id_tenants_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "educations" DROP CONSTRAINT "educations_tenant_id_tenants_id_fk";
  
  ALTER TABLE "educations" DROP CONSTRAINT "educations_image_id_media_id_fk";
  
  ALTER TABLE "educations" DROP CONSTRAINT "educations_meta_image_id_media_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_tenant_id_tenants_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_thumbnail_id_media_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_meta_image_id_media_id_fk";
  
  ALTER TABLE "menus" DROP CONSTRAINT "menus_tenant_id_tenants_id_fk";
  
  ALTER TABLE "socials" DROP CONSTRAINT "socials_tenant_id_tenants_id_fk";
  
  ALTER TABLE "skills" DROP CONSTRAINT "skills_tenant_id_tenants_id_fk";
  
  ALTER TABLE "hackathons" DROP CONSTRAINT "hackathons_tenant_id_tenants_id_fk";
  
  ALTER TABLE "hackathons" DROP CONSTRAINT "hackathons_image_id_media_id_fk";
  
  ALTER TABLE "hackathons" DROP CONSTRAINT "hackathons_meta_image_id_media_id_fk";
  
  ALTER TABLE "researches" DROP CONSTRAINT "researches_tenant_id_tenants_id_fk";
  
  ALTER TABLE "researches" DROP CONSTRAINT "researches_image_id_media_id_fk";
  
  ALTER TABLE "researches" DROP CONSTRAINT "researches_meta_image_id_media_id_fk";
  
  ALTER TABLE "achievements" DROP CONSTRAINT "achievements_tenant_id_tenants_id_fk";
  
  ALTER TABLE "achievements" DROP CONSTRAINT "achievements_image_id_media_id_fk";
  
  ALTER TABLE "achievements" DROP CONSTRAINT "achievements_meta_image_id_media_id_fk";
  
  ALTER TABLE "certifications" DROP CONSTRAINT "certifications_tenant_id_tenants_id_fk";
  
  ALTER TABLE "certifications" DROP CONSTRAINT "certifications_image_id_media_id_fk";
  
  ALTER TABLE "certifications" DROP CONSTRAINT "certifications_meta_image_id_media_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_tenant_id_tenants_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_image_id_media_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_meta_image_id_media_id_fk";
  
  ALTER TABLE "licenses" DROP CONSTRAINT "licenses_tenant_id_tenants_id_fk";
  
  ALTER TABLE "licenses" DROP CONSTRAINT "licenses_image_id_media_id_fk";
  
  ALTER TABLE "licenses" DROP CONSTRAINT "licenses_meta_image_id_media_id_fk";
  
  ALTER TABLE "experiences" DROP CONSTRAINT "experiences_tenant_id_tenants_id_fk";
  
  ALTER TABLE "integration" DROP CONSTRAINT "integration_tenant_id_tenants_id_fk";
  
  ALTER TABLE "forms" DROP CONSTRAINT "forms_tenant_id_tenants_id_fk";
  
  ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_tenant_id_tenants_id_fk";
  
  DROP INDEX "media_tenant_idx";
  DROP INDEX "notes_tenant_idx";
  DROP INDEX "notes_meta_meta_image_idx";
  DROP INDEX "blogs_tenant_idx";
  DROP INDEX "blogs_featured_image_idx";
  DROP INDEX "blogs_meta_meta_image_idx";
  DROP INDEX "pages_tenant_idx";
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "educations_tenant_idx";
  DROP INDEX "educations_image_idx";
  DROP INDEX "educations_meta_meta_image_idx";
  DROP INDEX "projects_tenant_idx";
  DROP INDEX "projects_thumbnail_idx";
  DROP INDEX "projects_meta_meta_image_idx";
  DROP INDEX "menus_tenant_idx";
  DROP INDEX "socials_tenant_idx";
  DROP INDEX "skills_tenant_idx";
  DROP INDEX "hackathons_tenant_idx";
  DROP INDEX "hackathons_image_idx";
  DROP INDEX "hackathons_meta_meta_image_idx";
  DROP INDEX "researches_tenant_idx";
  DROP INDEX "researches_image_idx";
  DROP INDEX "researches_meta_meta_image_idx";
  DROP INDEX "achievements_tenant_idx";
  DROP INDEX "achievements_image_idx";
  DROP INDEX "achievements_meta_meta_image_idx";
  DROP INDEX "certifications_tenant_idx";
  DROP INDEX "certifications_image_idx";
  DROP INDEX "certifications_meta_meta_image_idx";
  DROP INDEX "publications_tenant_idx";
  DROP INDEX "publications_image_idx";
  DROP INDEX "publications_meta_meta_image_idx";
  DROP INDEX "licenses_tenant_idx";
  DROP INDEX "licenses_image_idx";
  DROP INDEX "licenses_meta_meta_image_idx";
  DROP INDEX "experiences_tenant_idx";
  DROP INDEX "integration_tenant_idx";
  DROP INDEX "forms_tenant_idx";
  DROP INDEX "form_submissions_tenant_idx";
  ALTER TABLE "notes" ADD COLUMN "content_content" jsonb;
  ALTER TABLE "notes" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "notes" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "notes" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "content_content" jsonb;
  ALTER TABLE "blogs" ADD COLUMN "content_description" jsonb;
  ALTER TABLE "blogs" ADD COLUMN "content_featured_image_id" integer NOT NULL;
  ALTER TABLE "blogs" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "content_page_mode_mode" "enum_pages_content_page_mode_mode" DEFAULT 'layout' NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "content_configurations_slug" varchar;
  ALTER TABLE "pages" ADD COLUMN "content_layout" jsonb;
  ALTER TABLE "pages" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "educations" ADD COLUMN "content_description" jsonb;
  ALTER TABLE "educations" ADD COLUMN "content_qualification_academy" varchar;
  ALTER TABLE "educations" ADD COLUMN "content_qualification_degree" varchar;
  ALTER TABLE "educations" ADD COLUMN "content_dates_to" timestamp(3) with time zone;
  ALTER TABLE "educations" ADD COLUMN "content_dates_from" timestamp(3) with time zone;
  ALTER TABLE "educations" ADD COLUMN "content_image_id" integer NOT NULL;
  ALTER TABLE "educations" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "educations" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "educations" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "projects" ADD COLUMN "content_thumbnail_id" integer NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "content_overview" jsonb;
  ALTER TABLE "projects" ADD COLUMN "content_detailed_overview" jsonb;
  ALTER TABLE "projects" ADD COLUMN "content_published_at" timestamp(3) with time zone;
  ALTER TABLE "projects" ADD COLUMN "content_dates_to" timestamp(3) with time zone;
  ALTER TABLE "projects" ADD COLUMN "content_dates_from" timestamp(3) with time zone;
  ALTER TABLE "projects" ADD COLUMN "content_credential_credential_email" varchar;
  ALTER TABLE "projects" ADD COLUMN "content_credential_credential_password" varchar;
  ALTER TABLE "projects" ADD COLUMN "content_credential_credential_username" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "projects_rels" ADD COLUMN "tenants_id" integer;
  ALTER TABLE "skills_rels" ADD COLUMN "tenants_id" integer;
  ALTER TABLE "hackathons" ADD COLUMN "content_description" jsonb;
  ALTER TABLE "hackathons" ADD COLUMN "content_dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "hackathons" ADD COLUMN "content_dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "hackathons" ADD COLUMN "content_location" varchar;
  ALTER TABLE "hackathons" ADD COLUMN "content_image_id" integer NOT NULL;
  ALTER TABLE "hackathons" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "hackathons" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "hackathons" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "researches" ADD COLUMN "content_description" jsonb;
  ALTER TABLE "researches" ADD COLUMN "content_dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "researches" ADD COLUMN "content_dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "researches" ADD COLUMN "content_location" varchar;
  ALTER TABLE "researches" ADD COLUMN "content_image_id" integer NOT NULL;
  ALTER TABLE "researches" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "researches" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "researches" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "achievements" ADD COLUMN "content_description" jsonb;
  ALTER TABLE "achievements" ADD COLUMN "content_dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "achievements" ADD COLUMN "content_dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "achievements" ADD COLUMN "content_location" varchar;
  ALTER TABLE "achievements" ADD COLUMN "content_image_id" integer NOT NULL;
  ALTER TABLE "achievements" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "achievements" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "achievements" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "certifications" ADD COLUMN "content_description" jsonb;
  ALTER TABLE "certifications" ADD COLUMN "content_dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN "content_dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN "content_location" varchar;
  ALTER TABLE "certifications" ADD COLUMN "content_image_id" integer NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "certifications" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "certifications" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "publications" ADD COLUMN "content_description" jsonb;
  ALTER TABLE "publications" ADD COLUMN "content_dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "publications" ADD COLUMN "content_dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "publications" ADD COLUMN "content_location" varchar;
  ALTER TABLE "publications" ADD COLUMN "content_image_id" integer NOT NULL;
  ALTER TABLE "publications" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "publications" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "publications" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "licenses" ADD COLUMN "content_description" jsonb;
  ALTER TABLE "licenses" ADD COLUMN "content_dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "licenses" ADD COLUMN "content_dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "licenses" ADD COLUMN "content_location" varchar;
  ALTER TABLE "licenses" ADD COLUMN "content_image_id" integer NOT NULL;
  ALTER TABLE "licenses" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "licenses" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "licenses" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "experiences_rels" ADD COLUMN "tenants_id" integer;
  ALTER TABLE "forms_rels" ADD COLUMN "tenants_id" integer;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes_rels" ADD CONSTRAINT "notes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes_rels" ADD CONSTRAINT "notes_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educations_rels" ADD CONSTRAINT "educations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educations_rels" ADD CONSTRAINT "educations_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_content_links" ADD CONSTRAINT "projects_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials_rels" ADD CONSTRAINT "socials_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials_rels" ADD CONSTRAINT "socials_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_content_links" ADD CONSTRAINT "hackathons_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_content_links" ADD CONSTRAINT "researches_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_rels" ADD CONSTRAINT "researches_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_rels" ADD CONSTRAINT "researches_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_content_links" ADD CONSTRAINT "achievements_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_rels" ADD CONSTRAINT "achievements_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_rels" ADD CONSTRAINT "achievements_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_content_links" ADD CONSTRAINT "certifications_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_content_links" ADD CONSTRAINT "publications_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses_content_links" ADD CONSTRAINT "licenses_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses_rels" ADD CONSTRAINT "licenses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses_rels" ADD CONSTRAINT "licenses_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integration_rels" ADD CONSTRAINT "integration_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."integration"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integration_rels" ADD CONSTRAINT "integration_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX "media_rels_tenants_id_idx" ON "media_rels" USING btree ("tenants_id");
  CREATE INDEX "notes_rels_order_idx" ON "notes_rels" USING btree ("order");
  CREATE INDEX "notes_rels_parent_idx" ON "notes_rels" USING btree ("parent_id");
  CREATE INDEX "notes_rels_path_idx" ON "notes_rels" USING btree ("path");
  CREATE INDEX "notes_rels_tenants_id_idx" ON "notes_rels" USING btree ("tenants_id");
  CREATE INDEX "blogs_rels_order_idx" ON "blogs_rels" USING btree ("order");
  CREATE INDEX "blogs_rels_parent_idx" ON "blogs_rels" USING btree ("parent_id");
  CREATE INDEX "blogs_rels_path_idx" ON "blogs_rels" USING btree ("path");
  CREATE INDEX "blogs_rels_tenants_id_idx" ON "blogs_rels" USING btree ("tenants_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_tenants_id_idx" ON "pages_rels" USING btree ("tenants_id");
  CREATE INDEX "educations_rels_order_idx" ON "educations_rels" USING btree ("order");
  CREATE INDEX "educations_rels_parent_idx" ON "educations_rels" USING btree ("parent_id");
  CREATE INDEX "educations_rels_path_idx" ON "educations_rels" USING btree ("path");
  CREATE INDEX "educations_rels_tenants_id_idx" ON "educations_rels" USING btree ("tenants_id");
  CREATE INDEX "projects_content_links_order_idx" ON "projects_content_links" USING btree ("_order");
  CREATE INDEX "projects_content_links_parent_id_idx" ON "projects_content_links" USING btree ("_parent_id");
  CREATE INDEX "menus_rels_order_idx" ON "menus_rels" USING btree ("order");
  CREATE INDEX "menus_rels_parent_idx" ON "menus_rels" USING btree ("parent_id");
  CREATE INDEX "menus_rels_path_idx" ON "menus_rels" USING btree ("path");
  CREATE UNIQUE INDEX "menus_rels_tenants_id_idx" ON "menus_rels" USING btree ("tenants_id","path");
  CREATE INDEX "socials_rels_order_idx" ON "socials_rels" USING btree ("order");
  CREATE INDEX "socials_rels_parent_idx" ON "socials_rels" USING btree ("parent_id");
  CREATE INDEX "socials_rels_path_idx" ON "socials_rels" USING btree ("path");
  CREATE UNIQUE INDEX "socials_rels_tenants_id_idx" ON "socials_rels" USING btree ("tenants_id","path");
  CREATE INDEX "hackathons_content_links_order_idx" ON "hackathons_content_links" USING btree ("_order");
  CREATE INDEX "hackathons_content_links_parent_id_idx" ON "hackathons_content_links" USING btree ("_parent_id");
  CREATE INDEX "hackathons_rels_order_idx" ON "hackathons_rels" USING btree ("order");
  CREATE INDEX "hackathons_rels_parent_idx" ON "hackathons_rels" USING btree ("parent_id");
  CREATE INDEX "hackathons_rels_path_idx" ON "hackathons_rels" USING btree ("path");
  CREATE INDEX "hackathons_rels_tenants_id_idx" ON "hackathons_rels" USING btree ("tenants_id");
  CREATE INDEX "researches_content_links_order_idx" ON "researches_content_links" USING btree ("_order");
  CREATE INDEX "researches_content_links_parent_id_idx" ON "researches_content_links" USING btree ("_parent_id");
  CREATE INDEX "researches_rels_order_idx" ON "researches_rels" USING btree ("order");
  CREATE INDEX "researches_rels_parent_idx" ON "researches_rels" USING btree ("parent_id");
  CREATE INDEX "researches_rels_path_idx" ON "researches_rels" USING btree ("path");
  CREATE INDEX "researches_rels_tenants_id_idx" ON "researches_rels" USING btree ("tenants_id");
  CREATE INDEX "achievements_content_links_order_idx" ON "achievements_content_links" USING btree ("_order");
  CREATE INDEX "achievements_content_links_parent_id_idx" ON "achievements_content_links" USING btree ("_parent_id");
  CREATE INDEX "achievements_rels_order_idx" ON "achievements_rels" USING btree ("order");
  CREATE INDEX "achievements_rels_parent_idx" ON "achievements_rels" USING btree ("parent_id");
  CREATE INDEX "achievements_rels_path_idx" ON "achievements_rels" USING btree ("path");
  CREATE INDEX "achievements_rels_tenants_id_idx" ON "achievements_rels" USING btree ("tenants_id");
  CREATE INDEX "certifications_content_links_order_idx" ON "certifications_content_links" USING btree ("_order");
  CREATE INDEX "certifications_content_links_parent_id_idx" ON "certifications_content_links" USING btree ("_parent_id");
  CREATE INDEX "certifications_rels_order_idx" ON "certifications_rels" USING btree ("order");
  CREATE INDEX "certifications_rels_parent_idx" ON "certifications_rels" USING btree ("parent_id");
  CREATE INDEX "certifications_rels_path_idx" ON "certifications_rels" USING btree ("path");
  CREATE INDEX "certifications_rels_tenants_id_idx" ON "certifications_rels" USING btree ("tenants_id");
  CREATE INDEX "publications_content_links_order_idx" ON "publications_content_links" USING btree ("_order");
  CREATE INDEX "publications_content_links_parent_id_idx" ON "publications_content_links" USING btree ("_parent_id");
  CREATE INDEX "publications_rels_order_idx" ON "publications_rels" USING btree ("order");
  CREATE INDEX "publications_rels_parent_idx" ON "publications_rels" USING btree ("parent_id");
  CREATE INDEX "publications_rels_path_idx" ON "publications_rels" USING btree ("path");
  CREATE INDEX "publications_rels_tenants_id_idx" ON "publications_rels" USING btree ("tenants_id");
  CREATE INDEX "licenses_content_links_order_idx" ON "licenses_content_links" USING btree ("_order");
  CREATE INDEX "licenses_content_links_parent_id_idx" ON "licenses_content_links" USING btree ("_parent_id");
  CREATE INDEX "licenses_rels_order_idx" ON "licenses_rels" USING btree ("order");
  CREATE INDEX "licenses_rels_parent_idx" ON "licenses_rels" USING btree ("parent_id");
  CREATE INDEX "licenses_rels_path_idx" ON "licenses_rels" USING btree ("path");
  CREATE INDEX "licenses_rels_tenants_id_idx" ON "licenses_rels" USING btree ("tenants_id");
  CREATE INDEX "integration_rels_order_idx" ON "integration_rels" USING btree ("order");
  CREATE INDEX "integration_rels_parent_idx" ON "integration_rels" USING btree ("parent_id");
  CREATE INDEX "integration_rels_path_idx" ON "integration_rels" USING btree ("path");
  CREATE UNIQUE INDEX "integration_rels_tenants_id_idx" ON "integration_rels" USING btree ("tenants_id","path");
  CREATE INDEX "form_submissions_rels_order_idx" ON "form_submissions_rels" USING btree ("order");
  CREATE INDEX "form_submissions_rels_parent_idx" ON "form_submissions_rels" USING btree ("parent_id");
  CREATE INDEX "form_submissions_rels_path_idx" ON "form_submissions_rels" USING btree ("path");
  CREATE INDEX "form_submissions_rels_tenants_id_idx" ON "form_submissions_rels" USING btree ("tenants_id");
  ALTER TABLE "notes" ADD CONSTRAINT "notes_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_content_featured_image_id_media_id_fk" FOREIGN KEY ("content_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_content_thumbnail_id_media_id_fk" FOREIGN KEY ("content_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "notes_seo_seo_image_idx" ON "notes" USING btree ("seo_image_id");
  CREATE INDEX "blogs_content_content_featured_image_idx" ON "blogs" USING btree ("content_featured_image_id");
  CREATE INDEX "blogs_seo_seo_image_idx" ON "blogs" USING btree ("seo_image_id");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "educations_content_content_image_idx" ON "educations" USING btree ("content_image_id");
  CREATE INDEX "educations_seo_seo_image_idx" ON "educations" USING btree ("seo_image_id");
  CREATE INDEX "projects_content_content_thumbnail_idx" ON "projects" USING btree ("content_thumbnail_id");
  CREATE INDEX "projects_seo_seo_image_idx" ON "projects" USING btree ("seo_image_id");
  CREATE INDEX "projects_rels_tenants_id_idx" ON "projects_rels" USING btree ("tenants_id");
  CREATE INDEX "skills_rels_tenants_id_idx" ON "skills_rels" USING btree ("tenants_id");
  CREATE INDEX "hackathons_content_content_image_idx" ON "hackathons" USING btree ("content_image_id");
  CREATE INDEX "hackathons_seo_seo_image_idx" ON "hackathons" USING btree ("seo_image_id");
  CREATE INDEX "researches_content_content_image_idx" ON "researches" USING btree ("content_image_id");
  CREATE INDEX "researches_seo_seo_image_idx" ON "researches" USING btree ("seo_image_id");
  CREATE INDEX "achievements_content_content_image_idx" ON "achievements" USING btree ("content_image_id");
  CREATE INDEX "achievements_seo_seo_image_idx" ON "achievements" USING btree ("seo_image_id");
  CREATE INDEX "certifications_content_content_image_idx" ON "certifications" USING btree ("content_image_id");
  CREATE INDEX "certifications_seo_seo_image_idx" ON "certifications" USING btree ("seo_image_id");
  CREATE INDEX "publications_content_content_image_idx" ON "publications" USING btree ("content_image_id");
  CREATE INDEX "publications_seo_seo_image_idx" ON "publications" USING btree ("seo_image_id");
  CREATE INDEX "licenses_content_content_image_idx" ON "licenses" USING btree ("content_image_id");
  CREATE INDEX "licenses_seo_seo_image_idx" ON "licenses" USING btree ("seo_image_id");
  CREATE INDEX "experiences_rels_tenants_id_idx" ON "experiences_rels" USING btree ("tenants_id");
  CREATE INDEX "forms_rels_tenants_id_idx" ON "forms_rels" USING btree ("tenants_id");
  ALTER TABLE "media" DROP COLUMN "tenant_id";
  ALTER TABLE "notes" DROP COLUMN "tenant_id";
  ALTER TABLE "notes" DROP COLUMN "content";
  ALTER TABLE "notes" DROP COLUMN "meta_title";
  ALTER TABLE "notes" DROP COLUMN "meta_description";
  ALTER TABLE "notes" DROP COLUMN "meta_image_id";
  ALTER TABLE "blogs" DROP COLUMN "tenant_id";
  ALTER TABLE "blogs" DROP COLUMN "content";
  ALTER TABLE "blogs" DROP COLUMN "description";
  ALTER TABLE "blogs" DROP COLUMN "featured_image_id";
  ALTER TABLE "blogs" DROP COLUMN "meta_title";
  ALTER TABLE "blogs" DROP COLUMN "meta_description";
  ALTER TABLE "blogs" DROP COLUMN "meta_image_id";
  ALTER TABLE "pages" DROP COLUMN "tenant_id";
  ALTER TABLE "pages" DROP COLUMN "page_mode_mode";
  ALTER TABLE "pages" DROP COLUMN "configurations_slug";
  ALTER TABLE "pages" DROP COLUMN "layout";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "pages" DROP COLUMN "meta_image_id";
  ALTER TABLE "educations" DROP COLUMN "tenant_id";
  ALTER TABLE "educations" DROP COLUMN "description";
  ALTER TABLE "educations" DROP COLUMN "qualification_academy";
  ALTER TABLE "educations" DROP COLUMN "qualification_degree";
  ALTER TABLE "educations" DROP COLUMN "dates_to";
  ALTER TABLE "educations" DROP COLUMN "dates_from";
  ALTER TABLE "educations" DROP COLUMN "image_id";
  ALTER TABLE "educations" DROP COLUMN "meta_title";
  ALTER TABLE "educations" DROP COLUMN "meta_description";
  ALTER TABLE "educations" DROP COLUMN "meta_image_id";
  ALTER TABLE "projects" DROP COLUMN "tenant_id";
  ALTER TABLE "projects" DROP COLUMN "thumbnail_id";
  ALTER TABLE "projects" DROP COLUMN "overview";
  ALTER TABLE "projects" DROP COLUMN "detailed_overview";
  ALTER TABLE "projects" DROP COLUMN "published_at";
  ALTER TABLE "projects" DROP COLUMN "dates_to";
  ALTER TABLE "projects" DROP COLUMN "dates_from";
  ALTER TABLE "projects" DROP COLUMN "credential_credential_email";
  ALTER TABLE "projects" DROP COLUMN "credential_credential_password";
  ALTER TABLE "projects" DROP COLUMN "credential_credential_username";
  ALTER TABLE "projects" DROP COLUMN "meta_title";
  ALTER TABLE "projects" DROP COLUMN "meta_description";
  ALTER TABLE "projects" DROP COLUMN "meta_image_id";
  ALTER TABLE "menus" DROP COLUMN "tenant_id";
  ALTER TABLE "socials" DROP COLUMN "tenant_id";
  ALTER TABLE "skills" DROP COLUMN "tenant_id";
  ALTER TABLE "hackathons" DROP COLUMN "tenant_id";
  ALTER TABLE "hackathons" DROP COLUMN "description";
  ALTER TABLE "hackathons" DROP COLUMN "dates_to";
  ALTER TABLE "hackathons" DROP COLUMN "dates_from";
  ALTER TABLE "hackathons" DROP COLUMN "location";
  ALTER TABLE "hackathons" DROP COLUMN "image_id";
  ALTER TABLE "hackathons" DROP COLUMN "meta_title";
  ALTER TABLE "hackathons" DROP COLUMN "meta_description";
  ALTER TABLE "hackathons" DROP COLUMN "meta_image_id";
  ALTER TABLE "researches" DROP COLUMN "tenant_id";
  ALTER TABLE "researches" DROP COLUMN "description";
  ALTER TABLE "researches" DROP COLUMN "dates_to";
  ALTER TABLE "researches" DROP COLUMN "dates_from";
  ALTER TABLE "researches" DROP COLUMN "location";
  ALTER TABLE "researches" DROP COLUMN "image_id";
  ALTER TABLE "researches" DROP COLUMN "meta_title";
  ALTER TABLE "researches" DROP COLUMN "meta_description";
  ALTER TABLE "researches" DROP COLUMN "meta_image_id";
  ALTER TABLE "achievements" DROP COLUMN "tenant_id";
  ALTER TABLE "achievements" DROP COLUMN "description";
  ALTER TABLE "achievements" DROP COLUMN "dates_to";
  ALTER TABLE "achievements" DROP COLUMN "dates_from";
  ALTER TABLE "achievements" DROP COLUMN "location";
  ALTER TABLE "achievements" DROP COLUMN "image_id";
  ALTER TABLE "achievements" DROP COLUMN "meta_title";
  ALTER TABLE "achievements" DROP COLUMN "meta_description";
  ALTER TABLE "achievements" DROP COLUMN "meta_image_id";
  ALTER TABLE "certifications" DROP COLUMN "tenant_id";
  ALTER TABLE "certifications" DROP COLUMN "description";
  ALTER TABLE "certifications" DROP COLUMN "dates_to";
  ALTER TABLE "certifications" DROP COLUMN "dates_from";
  ALTER TABLE "certifications" DROP COLUMN "location";
  ALTER TABLE "certifications" DROP COLUMN "image_id";
  ALTER TABLE "certifications" DROP COLUMN "meta_title";
  ALTER TABLE "certifications" DROP COLUMN "meta_description";
  ALTER TABLE "certifications" DROP COLUMN "meta_image_id";
  ALTER TABLE "publications" DROP COLUMN "tenant_id";
  ALTER TABLE "publications" DROP COLUMN "description";
  ALTER TABLE "publications" DROP COLUMN "dates_to";
  ALTER TABLE "publications" DROP COLUMN "dates_from";
  ALTER TABLE "publications" DROP COLUMN "location";
  ALTER TABLE "publications" DROP COLUMN "image_id";
  ALTER TABLE "publications" DROP COLUMN "meta_title";
  ALTER TABLE "publications" DROP COLUMN "meta_description";
  ALTER TABLE "publications" DROP COLUMN "meta_image_id";
  ALTER TABLE "licenses" DROP COLUMN "tenant_id";
  ALTER TABLE "licenses" DROP COLUMN "description";
  ALTER TABLE "licenses" DROP COLUMN "dates_to";
  ALTER TABLE "licenses" DROP COLUMN "dates_from";
  ALTER TABLE "licenses" DROP COLUMN "location";
  ALTER TABLE "licenses" DROP COLUMN "image_id";
  ALTER TABLE "licenses" DROP COLUMN "meta_title";
  ALTER TABLE "licenses" DROP COLUMN "meta_description";
  ALTER TABLE "licenses" DROP COLUMN "meta_image_id";
  ALTER TABLE "experiences" DROP COLUMN "tenant_id";
  ALTER TABLE "integration" DROP COLUMN "tenant_id";
  ALTER TABLE "forms" DROP COLUMN "tenant_id";
  ALTER TABLE "form_submissions" DROP COLUMN "tenant_id";
  DROP TYPE "public"."enum_pages_page_mode_mode";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_page_mode_mode" AS ENUM('layout', 'collection');
  CREATE TABLE "projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "hackathons_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "researches_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "achievements_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "certifications_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "publications_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "licenses_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  ALTER TABLE "media_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notes_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "educations_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_content_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "menus_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "socials_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hackathons_content_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hackathons_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "researches_content_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "researches_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "achievements_content_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "achievements_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certifications_content_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certifications_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "publications_content_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "publications_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "licenses_content_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "licenses_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "integration_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_submissions_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "notes_rels" CASCADE;
  DROP TABLE "blogs_rels" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "educations_rels" CASCADE;
  DROP TABLE "projects_content_links" CASCADE;
  DROP TABLE "menus_rels" CASCADE;
  DROP TABLE "socials_rels" CASCADE;
  DROP TABLE "hackathons_content_links" CASCADE;
  DROP TABLE "hackathons_rels" CASCADE;
  DROP TABLE "researches_content_links" CASCADE;
  DROP TABLE "researches_rels" CASCADE;
  DROP TABLE "achievements_content_links" CASCADE;
  DROP TABLE "achievements_rels" CASCADE;
  DROP TABLE "certifications_content_links" CASCADE;
  DROP TABLE "certifications_rels" CASCADE;
  DROP TABLE "publications_content_links" CASCADE;
  DROP TABLE "publications_rels" CASCADE;
  DROP TABLE "licenses_content_links" CASCADE;
  DROP TABLE "licenses_rels" CASCADE;
  DROP TABLE "integration_rels" CASCADE;
  DROP TABLE "form_submissions_rels" CASCADE;
  ALTER TABLE "notes" DROP CONSTRAINT "notes_seo_image_id_media_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_content_featured_image_id_media_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_seo_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_seo_image_id_media_id_fk";
  
  ALTER TABLE "educations" DROP CONSTRAINT "educations_content_image_id_media_id_fk";
  
  ALTER TABLE "educations" DROP CONSTRAINT "educations_seo_image_id_media_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_content_thumbnail_id_media_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_seo_image_id_media_id_fk";
  
  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_tenants_fk";
  
  ALTER TABLE "skills_rels" DROP CONSTRAINT "skills_rels_tenants_fk";
  
  ALTER TABLE "hackathons" DROP CONSTRAINT "hackathons_content_image_id_media_id_fk";
  
  ALTER TABLE "hackathons" DROP CONSTRAINT "hackathons_seo_image_id_media_id_fk";
  
  ALTER TABLE "researches" DROP CONSTRAINT "researches_content_image_id_media_id_fk";
  
  ALTER TABLE "researches" DROP CONSTRAINT "researches_seo_image_id_media_id_fk";
  
  ALTER TABLE "achievements" DROP CONSTRAINT "achievements_content_image_id_media_id_fk";
  
  ALTER TABLE "achievements" DROP CONSTRAINT "achievements_seo_image_id_media_id_fk";
  
  ALTER TABLE "certifications" DROP CONSTRAINT "certifications_content_image_id_media_id_fk";
  
  ALTER TABLE "certifications" DROP CONSTRAINT "certifications_seo_image_id_media_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_content_image_id_media_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_seo_image_id_media_id_fk";
  
  ALTER TABLE "licenses" DROP CONSTRAINT "licenses_content_image_id_media_id_fk";
  
  ALTER TABLE "licenses" DROP CONSTRAINT "licenses_seo_image_id_media_id_fk";
  
  ALTER TABLE "experiences_rels" DROP CONSTRAINT "experiences_rels_tenants_fk";
  
  ALTER TABLE "forms_rels" DROP CONSTRAINT "forms_rels_tenants_fk";
  
  DROP INDEX "notes_seo_seo_image_idx";
  DROP INDEX "blogs_content_content_featured_image_idx";
  DROP INDEX "blogs_seo_seo_image_idx";
  DROP INDEX "pages_seo_seo_image_idx";
  DROP INDEX "educations_content_content_image_idx";
  DROP INDEX "educations_seo_seo_image_idx";
  DROP INDEX "projects_content_content_thumbnail_idx";
  DROP INDEX "projects_seo_seo_image_idx";
  DROP INDEX "projects_rels_tenants_id_idx";
  DROP INDEX "skills_rels_tenants_id_idx";
  DROP INDEX "hackathons_content_content_image_idx";
  DROP INDEX "hackathons_seo_seo_image_idx";
  DROP INDEX "researches_content_content_image_idx";
  DROP INDEX "researches_seo_seo_image_idx";
  DROP INDEX "achievements_content_content_image_idx";
  DROP INDEX "achievements_seo_seo_image_idx";
  DROP INDEX "certifications_content_content_image_idx";
  DROP INDEX "certifications_seo_seo_image_idx";
  DROP INDEX "publications_content_content_image_idx";
  DROP INDEX "publications_seo_seo_image_idx";
  DROP INDEX "licenses_content_content_image_idx";
  DROP INDEX "licenses_seo_seo_image_idx";
  DROP INDEX "experiences_rels_tenants_id_idx";
  DROP INDEX "forms_rels_tenants_id_idx";
  ALTER TABLE "media" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "notes" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "notes" ADD COLUMN "content" jsonb;
  ALTER TABLE "notes" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "notes" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "notes" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "content" jsonb;
  ALTER TABLE "blogs" ADD COLUMN "description" jsonb;
  ALTER TABLE "blogs" ADD COLUMN "featured_image_id" integer NOT NULL;
  ALTER TABLE "blogs" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "pages" ADD COLUMN "page_mode_mode" "enum_pages_page_mode_mode" DEFAULT 'layout' NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "configurations_slug" varchar;
  ALTER TABLE "pages" ADD COLUMN "layout" jsonb;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "educations" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "educations" ADD COLUMN "description" jsonb;
  ALTER TABLE "educations" ADD COLUMN "qualification_academy" varchar;
  ALTER TABLE "educations" ADD COLUMN "qualification_degree" varchar;
  ALTER TABLE "educations" ADD COLUMN "dates_to" timestamp(3) with time zone;
  ALTER TABLE "educations" ADD COLUMN "dates_from" timestamp(3) with time zone;
  ALTER TABLE "educations" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "educations" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "educations" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "educations" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "projects" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "projects" ADD COLUMN "thumbnail_id" integer NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "overview" jsonb;
  ALTER TABLE "projects" ADD COLUMN "detailed_overview" jsonb;
  ALTER TABLE "projects" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "projects" ADD COLUMN "dates_to" timestamp(3) with time zone;
  ALTER TABLE "projects" ADD COLUMN "dates_from" timestamp(3) with time zone;
  ALTER TABLE "projects" ADD COLUMN "credential_credential_email" varchar;
  ALTER TABLE "projects" ADD COLUMN "credential_credential_password" varchar;
  ALTER TABLE "projects" ADD COLUMN "credential_credential_username" varchar;
  ALTER TABLE "projects" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "projects" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "projects" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "menus" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "socials" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "skills" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "hackathons" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "hackathons" ADD COLUMN "description" jsonb;
  ALTER TABLE "hackathons" ADD COLUMN "dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "hackathons" ADD COLUMN "dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "hackathons" ADD COLUMN "location" varchar;
  ALTER TABLE "hackathons" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "hackathons" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "hackathons" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "hackathons" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "researches" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "researches" ADD COLUMN "description" jsonb;
  ALTER TABLE "researches" ADD COLUMN "dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "researches" ADD COLUMN "dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "researches" ADD COLUMN "location" varchar;
  ALTER TABLE "researches" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "researches" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "researches" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "researches" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "achievements" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "achievements" ADD COLUMN "description" jsonb;
  ALTER TABLE "achievements" ADD COLUMN "dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "achievements" ADD COLUMN "dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "achievements" ADD COLUMN "location" varchar;
  ALTER TABLE "achievements" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "achievements" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "achievements" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "achievements" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "certifications" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "certifications" ADD COLUMN "description" jsonb;
  ALTER TABLE "certifications" ADD COLUMN "dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN "dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN "location" varchar;
  ALTER TABLE "certifications" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "certifications" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "certifications" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "publications" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "publications" ADD COLUMN "description" jsonb;
  ALTER TABLE "publications" ADD COLUMN "dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "publications" ADD COLUMN "dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "publications" ADD COLUMN "location" varchar;
  ALTER TABLE "publications" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "publications" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "publications" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "publications" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "licenses" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "licenses" ADD COLUMN "description" jsonb;
  ALTER TABLE "licenses" ADD COLUMN "dates_to" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "licenses" ADD COLUMN "dates_from" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "licenses" ADD COLUMN "location" varchar;
  ALTER TABLE "licenses" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "licenses" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "licenses" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "licenses" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "experiences" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "integration" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "forms" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "form_submissions" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_links" ADD CONSTRAINT "hackathons_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_links" ADD CONSTRAINT "researches_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_links" ADD CONSTRAINT "achievements_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_links" ADD CONSTRAINT "certifications_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_links" ADD CONSTRAINT "publications_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses_links" ADD CONSTRAINT "licenses_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_links_order_idx" ON "projects_links" USING btree ("_order");
  CREATE INDEX "projects_links_parent_id_idx" ON "projects_links" USING btree ("_parent_id");
  CREATE INDEX "hackathons_links_order_idx" ON "hackathons_links" USING btree ("_order");
  CREATE INDEX "hackathons_links_parent_id_idx" ON "hackathons_links" USING btree ("_parent_id");
  CREATE INDEX "researches_links_order_idx" ON "researches_links" USING btree ("_order");
  CREATE INDEX "researches_links_parent_id_idx" ON "researches_links" USING btree ("_parent_id");
  CREATE INDEX "achievements_links_order_idx" ON "achievements_links" USING btree ("_order");
  CREATE INDEX "achievements_links_parent_id_idx" ON "achievements_links" USING btree ("_parent_id");
  CREATE INDEX "certifications_links_order_idx" ON "certifications_links" USING btree ("_order");
  CREATE INDEX "certifications_links_parent_id_idx" ON "certifications_links" USING btree ("_parent_id");
  CREATE INDEX "publications_links_order_idx" ON "publications_links" USING btree ("_order");
  CREATE INDEX "publications_links_parent_id_idx" ON "publications_links" USING btree ("_parent_id");
  CREATE INDEX "licenses_links_order_idx" ON "licenses_links" USING btree ("_order");
  CREATE INDEX "licenses_links_parent_id_idx" ON "licenses_links" USING btree ("_parent_id");
  ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menus" ADD CONSTRAINT "menus_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "socials" ADD CONSTRAINT "socials_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills" ADD CONSTRAINT "skills_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "integration" ADD CONSTRAINT "integration_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms" ADD CONSTRAINT "forms_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX "notes_tenant_idx" ON "notes" USING btree ("tenant_id");
  CREATE INDEX "notes_meta_meta_image_idx" ON "notes" USING btree ("meta_image_id");
  CREATE INDEX "blogs_tenant_idx" ON "blogs" USING btree ("tenant_id");
  CREATE INDEX "blogs_featured_image_idx" ON "blogs" USING btree ("featured_image_id");
  CREATE INDEX "blogs_meta_meta_image_idx" ON "blogs" USING btree ("meta_image_id");
  CREATE INDEX "pages_tenant_idx" ON "pages" USING btree ("tenant_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "educations_tenant_idx" ON "educations" USING btree ("tenant_id");
  CREATE INDEX "educations_image_idx" ON "educations" USING btree ("image_id");
  CREATE INDEX "educations_meta_meta_image_idx" ON "educations" USING btree ("meta_image_id");
  CREATE INDEX "projects_tenant_idx" ON "projects" USING btree ("tenant_id");
  CREATE INDEX "projects_thumbnail_idx" ON "projects" USING btree ("thumbnail_id");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "menus_tenant_idx" ON "menus" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "socials_tenant_idx" ON "socials" USING btree ("tenant_id");
  CREATE INDEX "skills_tenant_idx" ON "skills" USING btree ("tenant_id");
  CREATE INDEX "hackathons_tenant_idx" ON "hackathons" USING btree ("tenant_id");
  CREATE INDEX "hackathons_image_idx" ON "hackathons" USING btree ("image_id");
  CREATE INDEX "hackathons_meta_meta_image_idx" ON "hackathons" USING btree ("meta_image_id");
  CREATE INDEX "researches_tenant_idx" ON "researches" USING btree ("tenant_id");
  CREATE INDEX "researches_image_idx" ON "researches" USING btree ("image_id");
  CREATE INDEX "researches_meta_meta_image_idx" ON "researches" USING btree ("meta_image_id");
  CREATE INDEX "achievements_tenant_idx" ON "achievements" USING btree ("tenant_id");
  CREATE INDEX "achievements_image_idx" ON "achievements" USING btree ("image_id");
  CREATE INDEX "achievements_meta_meta_image_idx" ON "achievements" USING btree ("meta_image_id");
  CREATE INDEX "certifications_tenant_idx" ON "certifications" USING btree ("tenant_id");
  CREATE INDEX "certifications_image_idx" ON "certifications" USING btree ("image_id");
  CREATE INDEX "certifications_meta_meta_image_idx" ON "certifications" USING btree ("meta_image_id");
  CREATE INDEX "publications_tenant_idx" ON "publications" USING btree ("tenant_id");
  CREATE INDEX "publications_image_idx" ON "publications" USING btree ("image_id");
  CREATE INDEX "publications_meta_meta_image_idx" ON "publications" USING btree ("meta_image_id");
  CREATE INDEX "licenses_tenant_idx" ON "licenses" USING btree ("tenant_id");
  CREATE INDEX "licenses_image_idx" ON "licenses" USING btree ("image_id");
  CREATE INDEX "licenses_meta_meta_image_idx" ON "licenses" USING btree ("meta_image_id");
  CREATE INDEX "experiences_tenant_idx" ON "experiences" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "integration_tenant_idx" ON "integration" USING btree ("tenant_id");
  CREATE INDEX "forms_tenant_idx" ON "forms" USING btree ("tenant_id");
  CREATE INDEX "form_submissions_tenant_idx" ON "form_submissions" USING btree ("tenant_id");
  ALTER TABLE "notes" DROP COLUMN "content_content";
  ALTER TABLE "notes" DROP COLUMN "seo_title";
  ALTER TABLE "notes" DROP COLUMN "seo_description";
  ALTER TABLE "notes" DROP COLUMN "seo_image_id";
  ALTER TABLE "blogs" DROP COLUMN "content_content";
  ALTER TABLE "blogs" DROP COLUMN "content_description";
  ALTER TABLE "blogs" DROP COLUMN "content_featured_image_id";
  ALTER TABLE "blogs" DROP COLUMN "seo_title";
  ALTER TABLE "blogs" DROP COLUMN "seo_description";
  ALTER TABLE "blogs" DROP COLUMN "seo_image_id";
  ALTER TABLE "pages" DROP COLUMN "content_page_mode_mode";
  ALTER TABLE "pages" DROP COLUMN "content_configurations_slug";
  ALTER TABLE "pages" DROP COLUMN "content_layout";
  ALTER TABLE "pages" DROP COLUMN "seo_title";
  ALTER TABLE "pages" DROP COLUMN "seo_description";
  ALTER TABLE "pages" DROP COLUMN "seo_image_id";
  ALTER TABLE "educations" DROP COLUMN "content_description";
  ALTER TABLE "educations" DROP COLUMN "content_qualification_academy";
  ALTER TABLE "educations" DROP COLUMN "content_qualification_degree";
  ALTER TABLE "educations" DROP COLUMN "content_dates_to";
  ALTER TABLE "educations" DROP COLUMN "content_dates_from";
  ALTER TABLE "educations" DROP COLUMN "content_image_id";
  ALTER TABLE "educations" DROP COLUMN "seo_title";
  ALTER TABLE "educations" DROP COLUMN "seo_description";
  ALTER TABLE "educations" DROP COLUMN "seo_image_id";
  ALTER TABLE "projects" DROP COLUMN "content_thumbnail_id";
  ALTER TABLE "projects" DROP COLUMN "content_overview";
  ALTER TABLE "projects" DROP COLUMN "content_detailed_overview";
  ALTER TABLE "projects" DROP COLUMN "content_published_at";
  ALTER TABLE "projects" DROP COLUMN "content_dates_to";
  ALTER TABLE "projects" DROP COLUMN "content_dates_from";
  ALTER TABLE "projects" DROP COLUMN "content_credential_credential_email";
  ALTER TABLE "projects" DROP COLUMN "content_credential_credential_password";
  ALTER TABLE "projects" DROP COLUMN "content_credential_credential_username";
  ALTER TABLE "projects" DROP COLUMN "seo_title";
  ALTER TABLE "projects" DROP COLUMN "seo_description";
  ALTER TABLE "projects" DROP COLUMN "seo_image_id";
  ALTER TABLE "projects_rels" DROP COLUMN "tenants_id";
  ALTER TABLE "skills_rels" DROP COLUMN "tenants_id";
  ALTER TABLE "hackathons" DROP COLUMN "content_description";
  ALTER TABLE "hackathons" DROP COLUMN "content_dates_to";
  ALTER TABLE "hackathons" DROP COLUMN "content_dates_from";
  ALTER TABLE "hackathons" DROP COLUMN "content_location";
  ALTER TABLE "hackathons" DROP COLUMN "content_image_id";
  ALTER TABLE "hackathons" DROP COLUMN "seo_title";
  ALTER TABLE "hackathons" DROP COLUMN "seo_description";
  ALTER TABLE "hackathons" DROP COLUMN "seo_image_id";
  ALTER TABLE "researches" DROP COLUMN "content_description";
  ALTER TABLE "researches" DROP COLUMN "content_dates_to";
  ALTER TABLE "researches" DROP COLUMN "content_dates_from";
  ALTER TABLE "researches" DROP COLUMN "content_location";
  ALTER TABLE "researches" DROP COLUMN "content_image_id";
  ALTER TABLE "researches" DROP COLUMN "seo_title";
  ALTER TABLE "researches" DROP COLUMN "seo_description";
  ALTER TABLE "researches" DROP COLUMN "seo_image_id";
  ALTER TABLE "achievements" DROP COLUMN "content_description";
  ALTER TABLE "achievements" DROP COLUMN "content_dates_to";
  ALTER TABLE "achievements" DROP COLUMN "content_dates_from";
  ALTER TABLE "achievements" DROP COLUMN "content_location";
  ALTER TABLE "achievements" DROP COLUMN "content_image_id";
  ALTER TABLE "achievements" DROP COLUMN "seo_title";
  ALTER TABLE "achievements" DROP COLUMN "seo_description";
  ALTER TABLE "achievements" DROP COLUMN "seo_image_id";
  ALTER TABLE "certifications" DROP COLUMN "content_description";
  ALTER TABLE "certifications" DROP COLUMN "content_dates_to";
  ALTER TABLE "certifications" DROP COLUMN "content_dates_from";
  ALTER TABLE "certifications" DROP COLUMN "content_location";
  ALTER TABLE "certifications" DROP COLUMN "content_image_id";
  ALTER TABLE "certifications" DROP COLUMN "seo_title";
  ALTER TABLE "certifications" DROP COLUMN "seo_description";
  ALTER TABLE "certifications" DROP COLUMN "seo_image_id";
  ALTER TABLE "publications" DROP COLUMN "content_description";
  ALTER TABLE "publications" DROP COLUMN "content_dates_to";
  ALTER TABLE "publications" DROP COLUMN "content_dates_from";
  ALTER TABLE "publications" DROP COLUMN "content_location";
  ALTER TABLE "publications" DROP COLUMN "content_image_id";
  ALTER TABLE "publications" DROP COLUMN "seo_title";
  ALTER TABLE "publications" DROP COLUMN "seo_description";
  ALTER TABLE "publications" DROP COLUMN "seo_image_id";
  ALTER TABLE "licenses" DROP COLUMN "content_description";
  ALTER TABLE "licenses" DROP COLUMN "content_dates_to";
  ALTER TABLE "licenses" DROP COLUMN "content_dates_from";
  ALTER TABLE "licenses" DROP COLUMN "content_location";
  ALTER TABLE "licenses" DROP COLUMN "content_image_id";
  ALTER TABLE "licenses" DROP COLUMN "seo_title";
  ALTER TABLE "licenses" DROP COLUMN "seo_description";
  ALTER TABLE "licenses" DROP COLUMN "seo_image_id";
  ALTER TABLE "experiences_rels" DROP COLUMN "tenants_id";
  ALTER TABLE "forms_rels" DROP COLUMN "tenants_id";
  DROP TYPE "public"."enum_pages_content_page_mode_mode";`)
}
