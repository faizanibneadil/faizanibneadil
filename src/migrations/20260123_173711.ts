import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notes_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "educations_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "menus_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "socials_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hackathons_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "researches_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "achievements_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "certifications_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "publications_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "licenses_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "integration_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_settings_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_submissions_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "notes_rels" CASCADE;
  DROP TABLE "blogs_rels" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "educations_rels" CASCADE;
  DROP TABLE "menus_rels" CASCADE;
  DROP TABLE "socials_rels" CASCADE;
  DROP TABLE "hackathons_rels" CASCADE;
  DROP TABLE "researches_rels" CASCADE;
  DROP TABLE "achievements_rels" CASCADE;
  DROP TABLE "certifications_rels" CASCADE;
  DROP TABLE "publications_rels" CASCADE;
  DROP TABLE "licenses_rels" CASCADE;
  DROP TABLE "integration_rels" CASCADE;
  DROP TABLE "portfolio_settings_rels" CASCADE;
  DROP TABLE "form_submissions_rels" CASCADE;
  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_tenants_fk";
  
  ALTER TABLE "skills_rels" DROP CONSTRAINT "skills_rels_tenants_fk";
  
  ALTER TABLE "experiences_rels" DROP CONSTRAINT "experiences_rels_tenants_fk";
  
  ALTER TABLE "forms_rels" DROP CONSTRAINT "forms_rels_tenants_fk";
  
  DROP INDEX "projects_rels_tenants_id_idx";
  DROP INDEX "skills_rels_tenants_id_idx";
  DROP INDEX "experiences_rels_tenants_id_idx";
  DROP INDEX "forms_rels_tenants_id_idx";
  ALTER TABLE "media" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "notes" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "pages" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "educations" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "projects" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "menus" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "socials" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "skills" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "hackathons" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "researches" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "achievements" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "certifications" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "publications" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "licenses" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "experiences" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "integration" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "portfolio_settings" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "forms" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "form_submissions" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menus" ADD CONSTRAINT "menus_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "socials" ADD CONSTRAINT "socials_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills" ADD CONSTRAINT "skills_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "integration" ADD CONSTRAINT "integration_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_settings" ADD CONSTRAINT "portfolio_settings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms" ADD CONSTRAINT "forms_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX "notes_tenant_idx" ON "notes" USING btree ("tenant_id");
  CREATE INDEX "blogs_tenant_idx" ON "blogs" USING btree ("tenant_id");
  CREATE INDEX "pages_tenant_idx" ON "pages" USING btree ("tenant_id");
  CREATE INDEX "educations_tenant_idx" ON "educations" USING btree ("tenant_id");
  CREATE INDEX "projects_tenant_idx" ON "projects" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "menus_tenant_idx" ON "menus" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "socials_tenant_idx" ON "socials" USING btree ("tenant_id");
  CREATE INDEX "skills_tenant_idx" ON "skills" USING btree ("tenant_id");
  CREATE INDEX "hackathons_tenant_idx" ON "hackathons" USING btree ("tenant_id");
  CREATE INDEX "researches_tenant_idx" ON "researches" USING btree ("tenant_id");
  CREATE INDEX "achievements_tenant_idx" ON "achievements" USING btree ("tenant_id");
  CREATE INDEX "certifications_tenant_idx" ON "certifications" USING btree ("tenant_id");
  CREATE INDEX "publications_tenant_idx" ON "publications" USING btree ("tenant_id");
  CREATE INDEX "licenses_tenant_idx" ON "licenses" USING btree ("tenant_id");
  CREATE INDEX "experiences_tenant_idx" ON "experiences" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "integration_tenant_idx" ON "integration" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "portfolio_settings_tenant_idx" ON "portfolio_settings" USING btree ("tenant_id");
  CREATE INDEX "forms_tenant_idx" ON "forms" USING btree ("tenant_id");
  CREATE INDEX "form_submissions_tenant_idx" ON "form_submissions" USING btree ("tenant_id");
  ALTER TABLE "projects_rels" DROP COLUMN "tenants_id";
  ALTER TABLE "skills_rels" DROP COLUMN "tenants_id";
  ALTER TABLE "experiences_rels" DROP COLUMN "tenants_id";
  ALTER TABLE "forms_rels" DROP COLUMN "tenants_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  
  CREATE TABLE "hackathons_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "researches_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "achievements_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "certifications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  CREATE TABLE "publications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
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
  
  CREATE TABLE "portfolio_settings_rels" (
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
  
  ALTER TABLE "media" DROP CONSTRAINT "media_tenant_id_tenants_id_fk";
  
  ALTER TABLE "notes" DROP CONSTRAINT "notes_tenant_id_tenants_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_tenant_id_tenants_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_tenant_id_tenants_id_fk";
  
  ALTER TABLE "educations" DROP CONSTRAINT "educations_tenant_id_tenants_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_tenant_id_tenants_id_fk";
  
  ALTER TABLE "menus" DROP CONSTRAINT "menus_tenant_id_tenants_id_fk";
  
  ALTER TABLE "socials" DROP CONSTRAINT "socials_tenant_id_tenants_id_fk";
  
  ALTER TABLE "skills" DROP CONSTRAINT "skills_tenant_id_tenants_id_fk";
  
  ALTER TABLE "hackathons" DROP CONSTRAINT "hackathons_tenant_id_tenants_id_fk";
  
  ALTER TABLE "researches" DROP CONSTRAINT "researches_tenant_id_tenants_id_fk";
  
  ALTER TABLE "achievements" DROP CONSTRAINT "achievements_tenant_id_tenants_id_fk";
  
  ALTER TABLE "certifications" DROP CONSTRAINT "certifications_tenant_id_tenants_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_tenant_id_tenants_id_fk";
  
  ALTER TABLE "licenses" DROP CONSTRAINT "licenses_tenant_id_tenants_id_fk";
  
  ALTER TABLE "experiences" DROP CONSTRAINT "experiences_tenant_id_tenants_id_fk";
  
  ALTER TABLE "integration" DROP CONSTRAINT "integration_tenant_id_tenants_id_fk";
  
  ALTER TABLE "portfolio_settings" DROP CONSTRAINT "portfolio_settings_tenant_id_tenants_id_fk";
  
  ALTER TABLE "forms" DROP CONSTRAINT "forms_tenant_id_tenants_id_fk";
  
  ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_tenant_id_tenants_id_fk";
  
  DROP INDEX "media_tenant_idx";
  DROP INDEX "notes_tenant_idx";
  DROP INDEX "blogs_tenant_idx";
  DROP INDEX "pages_tenant_idx";
  DROP INDEX "educations_tenant_idx";
  DROP INDEX "projects_tenant_idx";
  DROP INDEX "menus_tenant_idx";
  DROP INDEX "socials_tenant_idx";
  DROP INDEX "skills_tenant_idx";
  DROP INDEX "hackathons_tenant_idx";
  DROP INDEX "researches_tenant_idx";
  DROP INDEX "achievements_tenant_idx";
  DROP INDEX "certifications_tenant_idx";
  DROP INDEX "publications_tenant_idx";
  DROP INDEX "licenses_tenant_idx";
  DROP INDEX "experiences_tenant_idx";
  DROP INDEX "integration_tenant_idx";
  DROP INDEX "portfolio_settings_tenant_idx";
  DROP INDEX "forms_tenant_idx";
  DROP INDEX "form_submissions_tenant_idx";
  ALTER TABLE "projects_rels" ADD COLUMN "tenants_id" integer;
  ALTER TABLE "skills_rels" ADD COLUMN "tenants_id" integer;
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
  ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials_rels" ADD CONSTRAINT "socials_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials_rels" ADD CONSTRAINT "socials_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_rels" ADD CONSTRAINT "researches_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_rels" ADD CONSTRAINT "researches_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_rels" ADD CONSTRAINT "achievements_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_rels" ADD CONSTRAINT "achievements_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses_rels" ADD CONSTRAINT "licenses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses_rels" ADD CONSTRAINT "licenses_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integration_rels" ADD CONSTRAINT "integration_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."integration"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integration_rels" ADD CONSTRAINT "integration_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_settings_rels" ADD CONSTRAINT "portfolio_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolio_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_settings_rels" ADD CONSTRAINT "portfolio_settings_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "menus_rels_order_idx" ON "menus_rels" USING btree ("order");
  CREATE INDEX "menus_rels_parent_idx" ON "menus_rels" USING btree ("parent_id");
  CREATE INDEX "menus_rels_path_idx" ON "menus_rels" USING btree ("path");
  CREATE UNIQUE INDEX "menus_rels_tenants_id_idx" ON "menus_rels" USING btree ("tenants_id","path");
  CREATE INDEX "socials_rels_order_idx" ON "socials_rels" USING btree ("order");
  CREATE INDEX "socials_rels_parent_idx" ON "socials_rels" USING btree ("parent_id");
  CREATE INDEX "socials_rels_path_idx" ON "socials_rels" USING btree ("path");
  CREATE UNIQUE INDEX "socials_rels_tenants_id_idx" ON "socials_rels" USING btree ("tenants_id","path");
  CREATE INDEX "hackathons_rels_order_idx" ON "hackathons_rels" USING btree ("order");
  CREATE INDEX "hackathons_rels_parent_idx" ON "hackathons_rels" USING btree ("parent_id");
  CREATE INDEX "hackathons_rels_path_idx" ON "hackathons_rels" USING btree ("path");
  CREATE INDEX "hackathons_rels_tenants_id_idx" ON "hackathons_rels" USING btree ("tenants_id");
  CREATE INDEX "researches_rels_order_idx" ON "researches_rels" USING btree ("order");
  CREATE INDEX "researches_rels_parent_idx" ON "researches_rels" USING btree ("parent_id");
  CREATE INDEX "researches_rels_path_idx" ON "researches_rels" USING btree ("path");
  CREATE INDEX "researches_rels_tenants_id_idx" ON "researches_rels" USING btree ("tenants_id");
  CREATE INDEX "achievements_rels_order_idx" ON "achievements_rels" USING btree ("order");
  CREATE INDEX "achievements_rels_parent_idx" ON "achievements_rels" USING btree ("parent_id");
  CREATE INDEX "achievements_rels_path_idx" ON "achievements_rels" USING btree ("path");
  CREATE INDEX "achievements_rels_tenants_id_idx" ON "achievements_rels" USING btree ("tenants_id");
  CREATE INDEX "certifications_rels_order_idx" ON "certifications_rels" USING btree ("order");
  CREATE INDEX "certifications_rels_parent_idx" ON "certifications_rels" USING btree ("parent_id");
  CREATE INDEX "certifications_rels_path_idx" ON "certifications_rels" USING btree ("path");
  CREATE INDEX "certifications_rels_tenants_id_idx" ON "certifications_rels" USING btree ("tenants_id");
  CREATE INDEX "publications_rels_order_idx" ON "publications_rels" USING btree ("order");
  CREATE INDEX "publications_rels_parent_idx" ON "publications_rels" USING btree ("parent_id");
  CREATE INDEX "publications_rels_path_idx" ON "publications_rels" USING btree ("path");
  CREATE INDEX "publications_rels_tenants_id_idx" ON "publications_rels" USING btree ("tenants_id");
  CREATE INDEX "licenses_rels_order_idx" ON "licenses_rels" USING btree ("order");
  CREATE INDEX "licenses_rels_parent_idx" ON "licenses_rels" USING btree ("parent_id");
  CREATE INDEX "licenses_rels_path_idx" ON "licenses_rels" USING btree ("path");
  CREATE INDEX "licenses_rels_tenants_id_idx" ON "licenses_rels" USING btree ("tenants_id");
  CREATE INDEX "integration_rels_order_idx" ON "integration_rels" USING btree ("order");
  CREATE INDEX "integration_rels_parent_idx" ON "integration_rels" USING btree ("parent_id");
  CREATE INDEX "integration_rels_path_idx" ON "integration_rels" USING btree ("path");
  CREATE UNIQUE INDEX "integration_rels_tenants_id_idx" ON "integration_rels" USING btree ("tenants_id","path");
  CREATE INDEX "portfolio_settings_rels_order_idx" ON "portfolio_settings_rels" USING btree ("order");
  CREATE INDEX "portfolio_settings_rels_parent_idx" ON "portfolio_settings_rels" USING btree ("parent_id");
  CREATE INDEX "portfolio_settings_rels_path_idx" ON "portfolio_settings_rels" USING btree ("path");
  CREATE UNIQUE INDEX "portfolio_settings_rels_tenants_id_idx" ON "portfolio_settings_rels" USING btree ("tenants_id","path");
  CREATE INDEX "form_submissions_rels_order_idx" ON "form_submissions_rels" USING btree ("order");
  CREATE INDEX "form_submissions_rels_parent_idx" ON "form_submissions_rels" USING btree ("parent_id");
  CREATE INDEX "form_submissions_rels_path_idx" ON "form_submissions_rels" USING btree ("path");
  CREATE INDEX "form_submissions_rels_tenants_id_idx" ON "form_submissions_rels" USING btree ("tenants_id");
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_rels_tenants_id_idx" ON "projects_rels" USING btree ("tenants_id");
  CREATE INDEX "skills_rels_tenants_id_idx" ON "skills_rels" USING btree ("tenants_id");
  CREATE INDEX "experiences_rels_tenants_id_idx" ON "experiences_rels" USING btree ("tenants_id");
  CREATE INDEX "forms_rels_tenants_id_idx" ON "forms_rels" USING btree ("tenants_id");
  ALTER TABLE "media" DROP COLUMN "tenant_id";
  ALTER TABLE "notes" DROP COLUMN "tenant_id";
  ALTER TABLE "blogs" DROP COLUMN "tenant_id";
  ALTER TABLE "pages" DROP COLUMN "tenant_id";
  ALTER TABLE "educations" DROP COLUMN "tenant_id";
  ALTER TABLE "projects" DROP COLUMN "tenant_id";
  ALTER TABLE "menus" DROP COLUMN "tenant_id";
  ALTER TABLE "socials" DROP COLUMN "tenant_id";
  ALTER TABLE "skills" DROP COLUMN "tenant_id";
  ALTER TABLE "hackathons" DROP COLUMN "tenant_id";
  ALTER TABLE "researches" DROP COLUMN "tenant_id";
  ALTER TABLE "achievements" DROP COLUMN "tenant_id";
  ALTER TABLE "certifications" DROP COLUMN "tenant_id";
  ALTER TABLE "publications" DROP COLUMN "tenant_id";
  ALTER TABLE "licenses" DROP COLUMN "tenant_id";
  ALTER TABLE "experiences" DROP COLUMN "tenant_id";
  ALTER TABLE "integration" DROP COLUMN "tenant_id";
  ALTER TABLE "portfolio_settings" DROP COLUMN "tenant_id";
  ALTER TABLE "forms" DROP COLUMN "tenant_id";
  ALTER TABLE "form_submissions" DROP COLUMN "tenant_id";`)
}
