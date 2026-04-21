import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('super-admin', 'user');
  CREATE TYPE "public"."enum_users_tenants_roles" AS ENUM('tenant-admin', 'tenant-viewer');
  CREATE TYPE "public"."enum_blogs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blogs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_educations_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_educations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__educations_v_version_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__educations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_menus_menu_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_skills_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__skills_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_hackathons_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_hackathons_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__hackathons_v_version_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__hackathons_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_researches_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_researches_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__researches_v_version_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__researches_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_achievements_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_achievements_type" AS ENUM('award', 'honor', 'speaking-engagement', 'competition-winner', 'community-contribution', 'other');
  CREATE TYPE "public"."enum_achievements_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__achievements_v_version_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__achievements_v_version_type" AS ENUM('award', 'honor', 'speaking-engagement', 'competition-winner', 'community-contribution', 'other');
  CREATE TYPE "public"."enum__achievements_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_certifications_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_certifications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certifications_v_version_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__certifications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_publications_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_publications_type" AS ENUM('research_paper', 'book', 'conference', 'patent', 'white_paper');
  CREATE TYPE "public"."enum_publications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_v_version_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__publications_v_version_type" AS ENUM('research_paper', 'book', 'conference', 'patent', 'white_paper');
  CREATE TYPE "public"."enum__publications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_licenses_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_licenses_validity_status" AS ENUM('active', 'expired', 'renewal', 'inactive');
  CREATE TYPE "public"."enum_licenses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__licenses_v_version_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__licenses_v_version_validity_status" AS ENUM('active', 'expired', 'renewal', 'inactive');
  CREATE TYPE "public"."enum__licenses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_experiences_employment_type" AS ENUM('full-time', 'part-time', 'contract', 'freelance', 'internship');
  CREATE TYPE "public"."enum_experiences_job_type" AS ENUM('on-site', 'remote', 'hybrid');
  CREATE TYPE "public"."enum_experiences_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__experiences_v_version_employment_type" AS ENUM('full-time', 'part-time', 'contract', 'freelance', 'internship');
  CREATE TYPE "public"."enum__experiences_v_version_job_type" AS ENUM('on-site', 'remote', 'hybrid');
  CREATE TYPE "public"."enum__experiences_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_integration_chat_bubble_type" AS ENUM('tawk');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_forms_redirect_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_tenants_roles" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_users_tenants_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"profile_id" integer,
  	"industry_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"email" varchar,
  	"username" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"content" jsonb,
  	"description" jsonb,
  	"featured_image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"lock_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_blogs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_blogs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_description" jsonb,
  	"version_featured_image_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_lock_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__blogs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"configured_collection_slug" varchar,
  	"layout" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"enable_collection" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"lock_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_configured_collection_slug" varchar,
  	"version_layout" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_enable_collection" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_lock_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "educations_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_educations_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "educations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"academy" varchar,
  	"degree" varchar,
  	"image_id" integer,
  	"description" jsonb,
  	"details_grade" varchar,
  	"details_location" varchar,
  	"dates_from" timestamp(3) with time zone,
  	"dates_to" timestamp(3) with time zone,
  	"dates_currently_studying" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_educations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "educations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_educations_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__educations_v_version_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_educations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_academy" varchar,
  	"version_degree" varchar,
  	"version_image_id" integer,
  	"version_description" jsonb,
  	"version_details_grade" varchar,
  	"version_details_location" varchar,
  	"version_dates_from" timestamp(3) with time zone,
  	"version_dates_to" timestamp(3) with time zone,
  	"version_dates_currently_studying" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__educations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_educations_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "projects_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_projects_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"thumbnail_id" integer,
  	"overview" jsonb,
  	"detailed_overview" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"dates_to" timestamp(3) with time zone,
  	"dates_from" timestamp(3) with time zone,
  	"credential_credential_email" varchar,
  	"credential_credential_password" varchar,
  	"credential_credential_username" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"lock_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_projects_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__projects_v_version_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_thumbnail_id" integer,
  	"version_overview" jsonb,
  	"version_detailed_overview" jsonb,
  	"version_published_at" timestamp(3) with time zone,
  	"version_dates_to" timestamp(3) with time zone,
  	"version_dates_from" timestamp(3) with time zone,
  	"version_credential_credential_email" varchar,
  	"version_credential_credential_password" varchar,
  	"version_credential_credential_username" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_lock_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "tenants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"domain" varchar,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "menus_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"type" "enum_menus_menu_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "menus" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menus_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "socials_socials_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iconify" varchar,
  	"title" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "skills" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"published_at" timestamp(3) with time zone,
  	"enable_label" boolean DEFAULT false,
  	"skill_custom_label" varchar,
  	"enable_icon" boolean DEFAULT false,
  	"icon" varchar,
  	"enable_achievements_count" boolean DEFAULT false,
  	"enable_certifications_count" boolean DEFAULT false,
  	"enable_educations_count" boolean DEFAULT false,
  	"enable_experiences_count" boolean DEFAULT false,
  	"enable_hackathons_count" boolean DEFAULT false,
  	"enable_projects_count" boolean DEFAULT false,
  	"enable_publications_count" boolean DEFAULT false,
  	"enable_researches_count" boolean DEFAULT false,
  	"lock_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_skills_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_skills_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_enable_label" boolean DEFAULT false,
  	"version_skill_custom_label" varchar,
  	"version_enable_icon" boolean DEFAULT false,
  	"version_icon" varchar,
  	"version_enable_achievements_count" boolean DEFAULT false,
  	"version_enable_certifications_count" boolean DEFAULT false,
  	"version_enable_educations_count" boolean DEFAULT false,
  	"version_enable_experiences_count" boolean DEFAULT false,
  	"version_enable_hackathons_count" boolean DEFAULT false,
  	"version_enable_projects_count" boolean DEFAULT false,
  	"version_enable_publications_count" boolean DEFAULT false,
  	"version_enable_researches_count" boolean DEFAULT false,
  	"version_lock_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__skills_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "hackathons_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_hackathons_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "hackathons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"dates_to" timestamp(3) with time zone,
  	"dates_from" timestamp(3) with time zone,
  	"location" varchar,
  	"image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"lock_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_hackathons_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "hackathons_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_hackathons_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__hackathons_v_version_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hackathons_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_dates_to" timestamp(3) with time zone,
  	"version_dates_from" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_image_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_lock_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__hackathons_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_hackathons_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "researches_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_researches_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "researches" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"status" "enum_researches_status",
  	"role" varchar,
  	"image_id" integer,
  	"description" jsonb,
  	"dates_from" timestamp(3) with time zone,
  	"dates_to" timestamp(3) with time zone,
  	"dates_location" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"lock_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_researches_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "researches_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_researches_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__researches_v_version_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_researches_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_status" "enum__researches_v_version_status",
  	"version_role" varchar,
  	"version_image_id" integer,
  	"version_description" jsonb,
  	"version_dates_from" timestamp(3) with time zone,
  	"version_dates_to" timestamp(3) with time zone,
  	"version_dates_location" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_lock_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__researches_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_researches_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "achievements_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "achievements_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_achievements_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "achievements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"type" "enum_achievements_type",
  	"image_id" integer,
  	"description" jsonb,
  	"dates_from" timestamp(3) with time zone,
  	"dates_to" timestamp(3) with time zone,
  	"dates_location" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"lock_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_achievements_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "achievements_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_achievements_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_achievements_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__achievements_v_version_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_achievements_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_type" "enum__achievements_v_version_type",
  	"version_image_id" integer,
  	"version_description" jsonb,
  	"version_dates_from" timestamp(3) with time zone,
  	"version_dates_to" timestamp(3) with time zone,
  	"version_dates_location" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_lock_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__achievements_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_achievements_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "certifications_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_certifications_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "certifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"issuer" varchar,
  	"credential_id" varchar,
  	"image_id" integer,
  	"description" jsonb,
  	"validity_issued_date" timestamp(3) with time zone,
  	"validity_expiry_date" timestamp(3) with time zone,
  	"validity_is_lifetime" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"lock_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_certifications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "certifications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_certifications_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__certifications_v_version_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_certifications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_issuer" varchar,
  	"version_credential_id" varchar,
  	"version_image_id" integer,
  	"version_description" jsonb,
  	"version_validity_issued_date" timestamp(3) with time zone,
  	"version_validity_expiry_date" timestamp(3) with time zone,
  	"version_validity_is_lifetime" boolean DEFAULT false,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_lock_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__certifications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_certifications_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "publications_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_publications_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"type" "enum_publications_type",
  	"publisher" varchar,
  	"image_id" integer,
  	"description" jsonb,
  	"published_date" timestamp(3) with time zone,
  	"doi" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"lock_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_publications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "publications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_publications_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__publications_v_version_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_publications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_type" "enum__publications_v_version_type",
  	"version_publisher" varchar,
  	"version_image_id" integer,
  	"version_description" jsonb,
  	"version_published_date" timestamp(3) with time zone,
  	"version_doi" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_lock_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__publications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_publications_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "licenses_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_licenses_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "licenses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"issuing_authority" varchar,
  	"license_number" varchar,
  	"image_id" integer,
  	"description" jsonb,
  	"validity_issued_date" timestamp(3) with time zone,
  	"validity_expiry_date" timestamp(3) with time zone,
  	"validity_status" "enum_licenses_validity_status" DEFAULT 'active',
  	"location" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_licenses_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "licenses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "_licenses_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__licenses_v_version_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_licenses_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_issuing_authority" varchar,
  	"version_license_number" varchar,
  	"version_image_id" integer,
  	"version_description" jsonb,
  	"version_validity_issued_date" timestamp(3) with time zone,
  	"version_validity_expiry_date" timestamp(3) with time zone,
  	"version_validity_status" "enum__licenses_v_version_validity_status" DEFAULT 'active',
  	"version_location" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__licenses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_licenses_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"lock_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"employment_type" "enum_experiences_employment_type",
  	"job_type" "enum_experiences_job_type",
  	"company" varchar,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"website" varchar,
  	"location" varchar,
  	"logo_id" integer,
  	"description" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_experiences_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "experiences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer
  );
  
  CREATE TABLE "_experiences_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_employment_type" "enum__experiences_v_version_employment_type",
  	"version_job_type" "enum__experiences_v_version_job_type",
  	"version_company" varchar,
  	"version_start" timestamp(3) with time zone,
  	"version_end" timestamp(3) with time zone,
  	"version_website" varchar,
  	"version_location" varchar,
  	"version_logo_id" integer,
  	"version_description" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__experiences_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_experiences_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer
  );
  
  CREATE TABLE "integration" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"enable_chat_button" boolean DEFAULT false,
  	"chat_bubble_type" "enum_integration_chat_bubble_type" DEFAULT 'tawk',
  	"tawk_property_id" varchar,
  	"tawk_widget_id" varchar,
  	"enable_tawk_bubble" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"theme_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar NOT NULL,
  	"fields" jsonb,
  	"submit_button_label" varchar,
  	"submit_button_width" numeric DEFAULT 100,
  	"submit_button_loading_text" varchar DEFAULT 'Loading...',
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_type" "enum_forms_redirect_type" DEFAULT 'reference',
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "forms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"blogs_id" integer,
  	"pages_id" integer,
  	"educations_id" integer,
  	"projects_id" integer,
  	"tenants_id" integer,
  	"menus_id" integer,
  	"socials_id" integer,
  	"skills_id" integer,
  	"hackathons_id" integer,
  	"researches_id" integer,
  	"achievements_id" integer,
  	"certifications_id" integer,
  	"publications_id" integer,
  	"licenses_id" integer,
  	"industries_id" integer,
  	"experiences_id" integer,
  	"integration_id" integer,
  	"portfolio_settings_id" integer,
  	"themes_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_tenants_roles" ADD CONSTRAINT "users_tenants_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users_tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_profile_id_media_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_industry_id_industries_id_fk" FOREIGN KEY ("industry_id") REFERENCES "public"."industries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_parent_id_blogs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations_resources" ADD CONSTRAINT "educations_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations_rels" ADD CONSTRAINT "educations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educations_rels" ADD CONSTRAINT "educations_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educations_rels" ADD CONSTRAINT "educations_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_educations_v_version_resources" ADD CONSTRAINT "_educations_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_educations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_parent_id_educations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."educations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v_rels" ADD CONSTRAINT "_educations_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_educations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_educations_v_rels" ADD CONSTRAINT "_educations_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_educations_v_rels" ADD CONSTRAINT "_educations_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_resources" ADD CONSTRAINT "projects_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_resources" ADD CONSTRAINT "_projects_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus_menu" ADD CONSTRAINT "menus_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus" ADD CONSTRAINT "menus_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials_socials_links" ADD CONSTRAINT "socials_socials_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials" ADD CONSTRAINT "socials_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills" ADD CONSTRAINT "skills_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_parent_id_skills_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."skills"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons_resources" ADD CONSTRAINT "hackathons_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hackathons_v_version_resources" ADD CONSTRAINT "_hackathons_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hackathons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_parent_id_hackathons_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hackathons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v_rels" ADD CONSTRAINT "_hackathons_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_hackathons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hackathons_v_rels" ADD CONSTRAINT "_hackathons_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hackathons_v_rels" ADD CONSTRAINT "_hackathons_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_resources" ADD CONSTRAINT "researches_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches_rels" ADD CONSTRAINT "researches_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_rels" ADD CONSTRAINT "researches_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches_rels" ADD CONSTRAINT "researches_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_researches_v_version_resources" ADD CONSTRAINT "_researches_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_researches_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_researches_v" ADD CONSTRAINT "_researches_v_parent_id_researches_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."researches"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_researches_v" ADD CONSTRAINT "_researches_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_researches_v" ADD CONSTRAINT "_researches_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_researches_v" ADD CONSTRAINT "_researches_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_researches_v_rels" ADD CONSTRAINT "_researches_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_researches_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_researches_v_rels" ADD CONSTRAINT "_researches_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_researches_v_rels" ADD CONSTRAINT "_researches_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_stats" ADD CONSTRAINT "achievements_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_resources" ADD CONSTRAINT "achievements_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements_rels" ADD CONSTRAINT "achievements_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_rels" ADD CONSTRAINT "achievements_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements_rels" ADD CONSTRAINT "achievements_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_achievements_v_version_stats" ADD CONSTRAINT "_achievements_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_achievements_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_achievements_v_version_resources" ADD CONSTRAINT "_achievements_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_achievements_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_achievements_v" ADD CONSTRAINT "_achievements_v_parent_id_achievements_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."achievements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_achievements_v" ADD CONSTRAINT "_achievements_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_achievements_v" ADD CONSTRAINT "_achievements_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_achievements_v" ADD CONSTRAINT "_achievements_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_achievements_v_rels" ADD CONSTRAINT "_achievements_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_achievements_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_achievements_v_rels" ADD CONSTRAINT "_achievements_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_achievements_v_rels" ADD CONSTRAINT "_achievements_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_resources" ADD CONSTRAINT "certifications_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v_version_resources" ADD CONSTRAINT "_certifications_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_certifications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_parent_id_certifications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v_rels" ADD CONSTRAINT "_certifications_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_certifications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v_rels" ADD CONSTRAINT "_certifications_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v_rels" ADD CONSTRAINT "_certifications_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_resources" ADD CONSTRAINT "publications_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_resources" ADD CONSTRAINT "_publications_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_parent_id_publications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_rels" ADD CONSTRAINT "_publications_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_rels" ADD CONSTRAINT "_publications_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_rels" ADD CONSTRAINT "_publications_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses_resources" ADD CONSTRAINT "licenses_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses_rels" ADD CONSTRAINT "licenses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses_rels" ADD CONSTRAINT "licenses_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_licenses_v_version_resources" ADD CONSTRAINT "_licenses_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_licenses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_licenses_v" ADD CONSTRAINT "_licenses_v_parent_id_licenses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."licenses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_licenses_v" ADD CONSTRAINT "_licenses_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_licenses_v" ADD CONSTRAINT "_licenses_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_licenses_v_rels" ADD CONSTRAINT "_licenses_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_licenses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_licenses_v_rels" ADD CONSTRAINT "_licenses_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_parent_id_experiences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v_rels" ADD CONSTRAINT "_experiences_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_rels" ADD CONSTRAINT "_experiences_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integration" ADD CONSTRAINT "integration_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_settings" ADD CONSTRAINT "portfolio_settings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_settings" ADD CONSTRAINT "portfolio_settings_theme_id_themes_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."themes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "themes" ADD CONSTRAINT "themes_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms" ADD CONSTRAINT "forms_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects" ADD CONSTRAINT "redirects_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_educations_fk" FOREIGN KEY ("educations_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menus_fk" FOREIGN KEY ("menus_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_socials_fk" FOREIGN KEY ("socials_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hackathons_fk" FOREIGN KEY ("hackathons_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_researches_fk" FOREIGN KEY ("researches_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_achievements_fk" FOREIGN KEY ("achievements_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certifications_fk" FOREIGN KEY ("certifications_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_licenses_fk" FOREIGN KEY ("licenses_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_integration_fk" FOREIGN KEY ("integration_id") REFERENCES "public"."integration"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolio_settings_fk" FOREIGN KEY ("portfolio_settings_id") REFERENCES "public"."portfolio_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_themes_fk" FOREIGN KEY ("themes_id") REFERENCES "public"."themes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_tenants_roles_order_idx" ON "users_tenants_roles" USING btree ("order");
  CREATE INDEX "users_tenants_roles_parent_idx" ON "users_tenants_roles" USING btree ("parent_id");
  CREATE INDEX "users_tenants_order_idx" ON "users_tenants" USING btree ("_order");
  CREATE INDEX "users_tenants_parent_id_idx" ON "users_tenants" USING btree ("_parent_id");
  CREATE INDEX "users_tenants_tenant_idx" ON "users_tenants" USING btree ("tenant_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_profile_idx" ON "users" USING btree ("profile_id");
  CREATE INDEX "users_industry_idx" ON "users" USING btree ("industry_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX "users_deleted_at_idx" ON "users" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "users_username_idx" ON "users" USING btree ("username");
  CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE INDEX "media_deleted_at_idx" ON "media" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "blogs_tenant_idx" ON "blogs" USING btree ("tenant_id");
  CREATE INDEX "blogs_featured_image_idx" ON "blogs" USING btree ("featured_image_id");
  CREATE INDEX "blogs_meta_meta_image_idx" ON "blogs" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
  CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at");
  CREATE INDEX "blogs_deleted_at_idx" ON "blogs" USING btree ("deleted_at");
  CREATE INDEX "blogs__status_idx" ON "blogs" USING btree ("_status");
  CREATE INDEX "_blogs_v_parent_idx" ON "_blogs_v" USING btree ("parent_id");
  CREATE INDEX "_blogs_v_version_version_tenant_idx" ON "_blogs_v" USING btree ("version_tenant_id");
  CREATE INDEX "_blogs_v_version_version_featured_image_idx" ON "_blogs_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blogs_v_version_meta_version_meta_image_idx" ON "_blogs_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_blogs_v_version_version_slug_idx" ON "_blogs_v" USING btree ("version_slug");
  CREATE INDEX "_blogs_v_version_version_updated_at_idx" ON "_blogs_v" USING btree ("version_updated_at");
  CREATE INDEX "_blogs_v_version_version_created_at_idx" ON "_blogs_v" USING btree ("version_created_at");
  CREATE INDEX "_blogs_v_version_version_deleted_at_idx" ON "_blogs_v" USING btree ("version_deleted_at");
  CREATE INDEX "_blogs_v_version_version__status_idx" ON "_blogs_v" USING btree ("version__status");
  CREATE INDEX "_blogs_v_created_at_idx" ON "_blogs_v" USING btree ("created_at");
  CREATE INDEX "_blogs_v_updated_at_idx" ON "_blogs_v" USING btree ("updated_at");
  CREATE INDEX "_blogs_v_latest_idx" ON "_blogs_v" USING btree ("latest");
  CREATE INDEX "_blogs_v_autosave_idx" ON "_blogs_v" USING btree ("autosave");
  CREATE INDEX "pages_tenant_idx" ON "pages" USING btree ("tenant_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_deleted_at_idx" ON "pages" USING btree ("deleted_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_tenant_idx" ON "_pages_v" USING btree ("version_tenant_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version_deleted_at_idx" ON "_pages_v" USING btree ("version_deleted_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "educations_resources_order_idx" ON "educations_resources" USING btree ("_order");
  CREATE INDEX "educations_resources_parent_id_idx" ON "educations_resources" USING btree ("_parent_id");
  CREATE INDEX "educations_tenant_idx" ON "educations" USING btree ("tenant_id");
  CREATE INDEX "educations_image_idx" ON "educations" USING btree ("image_id");
  CREATE INDEX "educations_updated_at_idx" ON "educations" USING btree ("updated_at");
  CREATE INDEX "educations_created_at_idx" ON "educations" USING btree ("created_at");
  CREATE INDEX "educations_deleted_at_idx" ON "educations" USING btree ("deleted_at");
  CREATE INDEX "educations__status_idx" ON "educations" USING btree ("_status");
  CREATE INDEX "educations_rels_order_idx" ON "educations_rels" USING btree ("order");
  CREATE INDEX "educations_rels_parent_idx" ON "educations_rels" USING btree ("parent_id");
  CREATE INDEX "educations_rels_path_idx" ON "educations_rels" USING btree ("path");
  CREATE INDEX "educations_rels_skills_id_idx" ON "educations_rels" USING btree ("skills_id");
  CREATE INDEX "educations_rels_pages_id_idx" ON "educations_rels" USING btree ("pages_id");
  CREATE INDEX "_educations_v_version_resources_order_idx" ON "_educations_v_version_resources" USING btree ("_order");
  CREATE INDEX "_educations_v_version_resources_parent_id_idx" ON "_educations_v_version_resources" USING btree ("_parent_id");
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
  CREATE INDEX "_educations_v_rels_order_idx" ON "_educations_v_rels" USING btree ("order");
  CREATE INDEX "_educations_v_rels_parent_idx" ON "_educations_v_rels" USING btree ("parent_id");
  CREATE INDEX "_educations_v_rels_path_idx" ON "_educations_v_rels" USING btree ("path");
  CREATE INDEX "_educations_v_rels_skills_id_idx" ON "_educations_v_rels" USING btree ("skills_id");
  CREATE INDEX "_educations_v_rels_pages_id_idx" ON "_educations_v_rels" USING btree ("pages_id");
  CREATE INDEX "projects_resources_order_idx" ON "projects_resources" USING btree ("_order");
  CREATE INDEX "projects_resources_parent_id_idx" ON "projects_resources" USING btree ("_parent_id");
  CREATE INDEX "projects_tenant_idx" ON "projects" USING btree ("tenant_id");
  CREATE INDEX "projects_thumbnail_idx" ON "projects" USING btree ("thumbnail_id");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects_deleted_at_idx" ON "projects" USING btree ("deleted_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_skills_id_idx" ON "projects_rels" USING btree ("skills_id");
  CREATE INDEX "projects_rels_pages_id_idx" ON "projects_rels" USING btree ("pages_id");
  CREATE INDEX "_projects_v_version_resources_order_idx" ON "_projects_v_version_resources" USING btree ("_order");
  CREATE INDEX "_projects_v_version_resources_parent_id_idx" ON "_projects_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_tenant_idx" ON "_projects_v" USING btree ("version_tenant_id");
  CREATE INDEX "_projects_v_version_version_thumbnail_idx" ON "_projects_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version_deleted_at_idx" ON "_projects_v" USING btree ("version_deleted_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_skills_id_idx" ON "_projects_v_rels" USING btree ("skills_id");
  CREATE INDEX "_projects_v_rels_pages_id_idx" ON "_projects_v_rels" USING btree ("pages_id");
  CREATE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug");
  CREATE INDEX "tenants_updated_at_idx" ON "tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "tenants" USING btree ("created_at");
  CREATE INDEX "tenants_deleted_at_idx" ON "tenants" USING btree ("deleted_at");
  CREATE INDEX "menus_menu_order_idx" ON "menus_menu" USING btree ("_order");
  CREATE INDEX "menus_menu_parent_id_idx" ON "menus_menu" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "menus_tenant_idx" ON "menus" USING btree ("tenant_id");
  CREATE INDEX "menus_updated_at_idx" ON "menus" USING btree ("updated_at");
  CREATE INDEX "menus_created_at_idx" ON "menus" USING btree ("created_at");
  CREATE INDEX "menus_rels_order_idx" ON "menus_rels" USING btree ("order");
  CREATE INDEX "menus_rels_parent_idx" ON "menus_rels" USING btree ("parent_id");
  CREATE INDEX "menus_rels_path_idx" ON "menus_rels" USING btree ("path");
  CREATE INDEX "menus_rels_pages_id_idx" ON "menus_rels" USING btree ("pages_id");
  CREATE INDEX "socials_socials_links_order_idx" ON "socials_socials_links" USING btree ("_order");
  CREATE INDEX "socials_socials_links_parent_id_idx" ON "socials_socials_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "socials_tenant_idx" ON "socials" USING btree ("tenant_id");
  CREATE INDEX "socials_updated_at_idx" ON "socials" USING btree ("updated_at");
  CREATE INDEX "socials_created_at_idx" ON "socials" USING btree ("created_at");
  CREATE INDEX "skills_tenant_idx" ON "skills" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "skills_slug_idx" ON "skills" USING btree ("slug");
  CREATE INDEX "skills_updated_at_idx" ON "skills" USING btree ("updated_at");
  CREATE INDEX "skills_created_at_idx" ON "skills" USING btree ("created_at");
  CREATE INDEX "skills_deleted_at_idx" ON "skills" USING btree ("deleted_at");
  CREATE INDEX "skills__status_idx" ON "skills" USING btree ("_status");
  CREATE INDEX "_skills_v_parent_idx" ON "_skills_v" USING btree ("parent_id");
  CREATE INDEX "_skills_v_version_version_tenant_idx" ON "_skills_v" USING btree ("version_tenant_id");
  CREATE INDEX "_skills_v_version_version_slug_idx" ON "_skills_v" USING btree ("version_slug");
  CREATE INDEX "_skills_v_version_version_updated_at_idx" ON "_skills_v" USING btree ("version_updated_at");
  CREATE INDEX "_skills_v_version_version_created_at_idx" ON "_skills_v" USING btree ("version_created_at");
  CREATE INDEX "_skills_v_version_version_deleted_at_idx" ON "_skills_v" USING btree ("version_deleted_at");
  CREATE INDEX "_skills_v_version_version__status_idx" ON "_skills_v" USING btree ("version__status");
  CREATE INDEX "_skills_v_created_at_idx" ON "_skills_v" USING btree ("created_at");
  CREATE INDEX "_skills_v_updated_at_idx" ON "_skills_v" USING btree ("updated_at");
  CREATE INDEX "_skills_v_latest_idx" ON "_skills_v" USING btree ("latest");
  CREATE INDEX "_skills_v_autosave_idx" ON "_skills_v" USING btree ("autosave");
  CREATE INDEX "hackathons_resources_order_idx" ON "hackathons_resources" USING btree ("_order");
  CREATE INDEX "hackathons_resources_parent_id_idx" ON "hackathons_resources" USING btree ("_parent_id");
  CREATE INDEX "hackathons_tenant_idx" ON "hackathons" USING btree ("tenant_id");
  CREATE INDEX "hackathons_image_idx" ON "hackathons" USING btree ("image_id");
  CREATE INDEX "hackathons_meta_meta_image_idx" ON "hackathons" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "hackathons_slug_idx" ON "hackathons" USING btree ("slug");
  CREATE INDEX "hackathons_updated_at_idx" ON "hackathons" USING btree ("updated_at");
  CREATE INDEX "hackathons_created_at_idx" ON "hackathons" USING btree ("created_at");
  CREATE INDEX "hackathons_deleted_at_idx" ON "hackathons" USING btree ("deleted_at");
  CREATE INDEX "hackathons__status_idx" ON "hackathons" USING btree ("_status");
  CREATE INDEX "hackathons_rels_order_idx" ON "hackathons_rels" USING btree ("order");
  CREATE INDEX "hackathons_rels_parent_idx" ON "hackathons_rels" USING btree ("parent_id");
  CREATE INDEX "hackathons_rels_path_idx" ON "hackathons_rels" USING btree ("path");
  CREATE INDEX "hackathons_rels_skills_id_idx" ON "hackathons_rels" USING btree ("skills_id");
  CREATE INDEX "hackathons_rels_pages_id_idx" ON "hackathons_rels" USING btree ("pages_id");
  CREATE INDEX "_hackathons_v_version_resources_order_idx" ON "_hackathons_v_version_resources" USING btree ("_order");
  CREATE INDEX "_hackathons_v_version_resources_parent_id_idx" ON "_hackathons_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_hackathons_v_parent_idx" ON "_hackathons_v" USING btree ("parent_id");
  CREATE INDEX "_hackathons_v_version_version_tenant_idx" ON "_hackathons_v" USING btree ("version_tenant_id");
  CREATE INDEX "_hackathons_v_version_version_image_idx" ON "_hackathons_v" USING btree ("version_image_id");
  CREATE INDEX "_hackathons_v_version_meta_version_meta_image_idx" ON "_hackathons_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_hackathons_v_version_version_slug_idx" ON "_hackathons_v" USING btree ("version_slug");
  CREATE INDEX "_hackathons_v_version_version_updated_at_idx" ON "_hackathons_v" USING btree ("version_updated_at");
  CREATE INDEX "_hackathons_v_version_version_created_at_idx" ON "_hackathons_v" USING btree ("version_created_at");
  CREATE INDEX "_hackathons_v_version_version_deleted_at_idx" ON "_hackathons_v" USING btree ("version_deleted_at");
  CREATE INDEX "_hackathons_v_version_version__status_idx" ON "_hackathons_v" USING btree ("version__status");
  CREATE INDEX "_hackathons_v_created_at_idx" ON "_hackathons_v" USING btree ("created_at");
  CREATE INDEX "_hackathons_v_updated_at_idx" ON "_hackathons_v" USING btree ("updated_at");
  CREATE INDEX "_hackathons_v_latest_idx" ON "_hackathons_v" USING btree ("latest");
  CREATE INDEX "_hackathons_v_autosave_idx" ON "_hackathons_v" USING btree ("autosave");
  CREATE INDEX "_hackathons_v_rels_order_idx" ON "_hackathons_v_rels" USING btree ("order");
  CREATE INDEX "_hackathons_v_rels_parent_idx" ON "_hackathons_v_rels" USING btree ("parent_id");
  CREATE INDEX "_hackathons_v_rels_path_idx" ON "_hackathons_v_rels" USING btree ("path");
  CREATE INDEX "_hackathons_v_rels_skills_id_idx" ON "_hackathons_v_rels" USING btree ("skills_id");
  CREATE INDEX "_hackathons_v_rels_pages_id_idx" ON "_hackathons_v_rels" USING btree ("pages_id");
  CREATE INDEX "researches_resources_order_idx" ON "researches_resources" USING btree ("_order");
  CREATE INDEX "researches_resources_parent_id_idx" ON "researches_resources" USING btree ("_parent_id");
  CREATE INDEX "researches_tenant_idx" ON "researches" USING btree ("tenant_id");
  CREATE INDEX "researches_image_idx" ON "researches" USING btree ("image_id");
  CREATE INDEX "researches_meta_meta_image_idx" ON "researches" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "researches_slug_idx" ON "researches" USING btree ("slug");
  CREATE INDEX "researches_updated_at_idx" ON "researches" USING btree ("updated_at");
  CREATE INDEX "researches_created_at_idx" ON "researches" USING btree ("created_at");
  CREATE INDEX "researches_deleted_at_idx" ON "researches" USING btree ("deleted_at");
  CREATE INDEX "researches__status_idx" ON "researches" USING btree ("_status");
  CREATE INDEX "researches_rels_order_idx" ON "researches_rels" USING btree ("order");
  CREATE INDEX "researches_rels_parent_idx" ON "researches_rels" USING btree ("parent_id");
  CREATE INDEX "researches_rels_path_idx" ON "researches_rels" USING btree ("path");
  CREATE INDEX "researches_rels_skills_id_idx" ON "researches_rels" USING btree ("skills_id");
  CREATE INDEX "researches_rels_pages_id_idx" ON "researches_rels" USING btree ("pages_id");
  CREATE INDEX "_researches_v_version_resources_order_idx" ON "_researches_v_version_resources" USING btree ("_order");
  CREATE INDEX "_researches_v_version_resources_parent_id_idx" ON "_researches_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_researches_v_parent_idx" ON "_researches_v" USING btree ("parent_id");
  CREATE INDEX "_researches_v_version_version_tenant_idx" ON "_researches_v" USING btree ("version_tenant_id");
  CREATE INDEX "_researches_v_version_version_image_idx" ON "_researches_v" USING btree ("version_image_id");
  CREATE INDEX "_researches_v_version_meta_version_meta_image_idx" ON "_researches_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_researches_v_version_version_slug_idx" ON "_researches_v" USING btree ("version_slug");
  CREATE INDEX "_researches_v_version_version_updated_at_idx" ON "_researches_v" USING btree ("version_updated_at");
  CREATE INDEX "_researches_v_version_version_created_at_idx" ON "_researches_v" USING btree ("version_created_at");
  CREATE INDEX "_researches_v_version_version_deleted_at_idx" ON "_researches_v" USING btree ("version_deleted_at");
  CREATE INDEX "_researches_v_version_version__status_idx" ON "_researches_v" USING btree ("version__status");
  CREATE INDEX "_researches_v_created_at_idx" ON "_researches_v" USING btree ("created_at");
  CREATE INDEX "_researches_v_updated_at_idx" ON "_researches_v" USING btree ("updated_at");
  CREATE INDEX "_researches_v_latest_idx" ON "_researches_v" USING btree ("latest");
  CREATE INDEX "_researches_v_autosave_idx" ON "_researches_v" USING btree ("autosave");
  CREATE INDEX "_researches_v_rels_order_idx" ON "_researches_v_rels" USING btree ("order");
  CREATE INDEX "_researches_v_rels_parent_idx" ON "_researches_v_rels" USING btree ("parent_id");
  CREATE INDEX "_researches_v_rels_path_idx" ON "_researches_v_rels" USING btree ("path");
  CREATE INDEX "_researches_v_rels_skills_id_idx" ON "_researches_v_rels" USING btree ("skills_id");
  CREATE INDEX "_researches_v_rels_pages_id_idx" ON "_researches_v_rels" USING btree ("pages_id");
  CREATE INDEX "achievements_stats_order_idx" ON "achievements_stats" USING btree ("_order");
  CREATE INDEX "achievements_stats_parent_id_idx" ON "achievements_stats" USING btree ("_parent_id");
  CREATE INDEX "achievements_resources_order_idx" ON "achievements_resources" USING btree ("_order");
  CREATE INDEX "achievements_resources_parent_id_idx" ON "achievements_resources" USING btree ("_parent_id");
  CREATE INDEX "achievements_tenant_idx" ON "achievements" USING btree ("tenant_id");
  CREATE INDEX "achievements_image_idx" ON "achievements" USING btree ("image_id");
  CREATE INDEX "achievements_meta_meta_image_idx" ON "achievements" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "achievements_slug_idx" ON "achievements" USING btree ("slug");
  CREATE INDEX "achievements_updated_at_idx" ON "achievements" USING btree ("updated_at");
  CREATE INDEX "achievements_created_at_idx" ON "achievements" USING btree ("created_at");
  CREATE INDEX "achievements__status_idx" ON "achievements" USING btree ("_status");
  CREATE INDEX "achievements_rels_order_idx" ON "achievements_rels" USING btree ("order");
  CREATE INDEX "achievements_rels_parent_idx" ON "achievements_rels" USING btree ("parent_id");
  CREATE INDEX "achievements_rels_path_idx" ON "achievements_rels" USING btree ("path");
  CREATE INDEX "achievements_rels_skills_id_idx" ON "achievements_rels" USING btree ("skills_id");
  CREATE INDEX "achievements_rels_pages_id_idx" ON "achievements_rels" USING btree ("pages_id");
  CREATE INDEX "_achievements_v_version_stats_order_idx" ON "_achievements_v_version_stats" USING btree ("_order");
  CREATE INDEX "_achievements_v_version_stats_parent_id_idx" ON "_achievements_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_achievements_v_version_resources_order_idx" ON "_achievements_v_version_resources" USING btree ("_order");
  CREATE INDEX "_achievements_v_version_resources_parent_id_idx" ON "_achievements_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_achievements_v_parent_idx" ON "_achievements_v" USING btree ("parent_id");
  CREATE INDEX "_achievements_v_version_version_tenant_idx" ON "_achievements_v" USING btree ("version_tenant_id");
  CREATE INDEX "_achievements_v_version_version_image_idx" ON "_achievements_v" USING btree ("version_image_id");
  CREATE INDEX "_achievements_v_version_meta_version_meta_image_idx" ON "_achievements_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_achievements_v_version_version_slug_idx" ON "_achievements_v" USING btree ("version_slug");
  CREATE INDEX "_achievements_v_version_version_updated_at_idx" ON "_achievements_v" USING btree ("version_updated_at");
  CREATE INDEX "_achievements_v_version_version_created_at_idx" ON "_achievements_v" USING btree ("version_created_at");
  CREATE INDEX "_achievements_v_version_version__status_idx" ON "_achievements_v" USING btree ("version__status");
  CREATE INDEX "_achievements_v_created_at_idx" ON "_achievements_v" USING btree ("created_at");
  CREATE INDEX "_achievements_v_updated_at_idx" ON "_achievements_v" USING btree ("updated_at");
  CREATE INDEX "_achievements_v_latest_idx" ON "_achievements_v" USING btree ("latest");
  CREATE INDEX "_achievements_v_autosave_idx" ON "_achievements_v" USING btree ("autosave");
  CREATE INDEX "_achievements_v_rels_order_idx" ON "_achievements_v_rels" USING btree ("order");
  CREATE INDEX "_achievements_v_rels_parent_idx" ON "_achievements_v_rels" USING btree ("parent_id");
  CREATE INDEX "_achievements_v_rels_path_idx" ON "_achievements_v_rels" USING btree ("path");
  CREATE INDEX "_achievements_v_rels_skills_id_idx" ON "_achievements_v_rels" USING btree ("skills_id");
  CREATE INDEX "_achievements_v_rels_pages_id_idx" ON "_achievements_v_rels" USING btree ("pages_id");
  CREATE INDEX "certifications_resources_order_idx" ON "certifications_resources" USING btree ("_order");
  CREATE INDEX "certifications_resources_parent_id_idx" ON "certifications_resources" USING btree ("_parent_id");
  CREATE INDEX "certifications_tenant_idx" ON "certifications" USING btree ("tenant_id");
  CREATE INDEX "certifications_image_idx" ON "certifications" USING btree ("image_id");
  CREATE INDEX "certifications_meta_meta_image_idx" ON "certifications" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "certifications_slug_idx" ON "certifications" USING btree ("slug");
  CREATE INDEX "certifications_updated_at_idx" ON "certifications" USING btree ("updated_at");
  CREATE INDEX "certifications_created_at_idx" ON "certifications" USING btree ("created_at");
  CREATE INDEX "certifications_deleted_at_idx" ON "certifications" USING btree ("deleted_at");
  CREATE INDEX "certifications__status_idx" ON "certifications" USING btree ("_status");
  CREATE INDEX "certifications_rels_order_idx" ON "certifications_rels" USING btree ("order");
  CREATE INDEX "certifications_rels_parent_idx" ON "certifications_rels" USING btree ("parent_id");
  CREATE INDEX "certifications_rels_path_idx" ON "certifications_rels" USING btree ("path");
  CREATE INDEX "certifications_rels_skills_id_idx" ON "certifications_rels" USING btree ("skills_id");
  CREATE INDEX "certifications_rels_pages_id_idx" ON "certifications_rels" USING btree ("pages_id");
  CREATE INDEX "_certifications_v_version_resources_order_idx" ON "_certifications_v_version_resources" USING btree ("_order");
  CREATE INDEX "_certifications_v_version_resources_parent_id_idx" ON "_certifications_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_certifications_v_parent_idx" ON "_certifications_v" USING btree ("parent_id");
  CREATE INDEX "_certifications_v_version_version_tenant_idx" ON "_certifications_v" USING btree ("version_tenant_id");
  CREATE INDEX "_certifications_v_version_version_image_idx" ON "_certifications_v" USING btree ("version_image_id");
  CREATE INDEX "_certifications_v_version_meta_version_meta_image_idx" ON "_certifications_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_certifications_v_version_version_slug_idx" ON "_certifications_v" USING btree ("version_slug");
  CREATE INDEX "_certifications_v_version_version_updated_at_idx" ON "_certifications_v" USING btree ("version_updated_at");
  CREATE INDEX "_certifications_v_version_version_created_at_idx" ON "_certifications_v" USING btree ("version_created_at");
  CREATE INDEX "_certifications_v_version_version_deleted_at_idx" ON "_certifications_v" USING btree ("version_deleted_at");
  CREATE INDEX "_certifications_v_version_version__status_idx" ON "_certifications_v" USING btree ("version__status");
  CREATE INDEX "_certifications_v_created_at_idx" ON "_certifications_v" USING btree ("created_at");
  CREATE INDEX "_certifications_v_updated_at_idx" ON "_certifications_v" USING btree ("updated_at");
  CREATE INDEX "_certifications_v_latest_idx" ON "_certifications_v" USING btree ("latest");
  CREATE INDEX "_certifications_v_autosave_idx" ON "_certifications_v" USING btree ("autosave");
  CREATE INDEX "_certifications_v_rels_order_idx" ON "_certifications_v_rels" USING btree ("order");
  CREATE INDEX "_certifications_v_rels_parent_idx" ON "_certifications_v_rels" USING btree ("parent_id");
  CREATE INDEX "_certifications_v_rels_path_idx" ON "_certifications_v_rels" USING btree ("path");
  CREATE INDEX "_certifications_v_rels_skills_id_idx" ON "_certifications_v_rels" USING btree ("skills_id");
  CREATE INDEX "_certifications_v_rels_pages_id_idx" ON "_certifications_v_rels" USING btree ("pages_id");
  CREATE INDEX "publications_resources_order_idx" ON "publications_resources" USING btree ("_order");
  CREATE INDEX "publications_resources_parent_id_idx" ON "publications_resources" USING btree ("_parent_id");
  CREATE INDEX "publications_tenant_idx" ON "publications" USING btree ("tenant_id");
  CREATE INDEX "publications_image_idx" ON "publications" USING btree ("image_id");
  CREATE INDEX "publications_meta_meta_image_idx" ON "publications" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "publications_slug_idx" ON "publications" USING btree ("slug");
  CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
  CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
  CREATE INDEX "publications_deleted_at_idx" ON "publications" USING btree ("deleted_at");
  CREATE INDEX "publications__status_idx" ON "publications" USING btree ("_status");
  CREATE INDEX "publications_rels_order_idx" ON "publications_rels" USING btree ("order");
  CREATE INDEX "publications_rels_parent_idx" ON "publications_rels" USING btree ("parent_id");
  CREATE INDEX "publications_rels_path_idx" ON "publications_rels" USING btree ("path");
  CREATE INDEX "publications_rels_skills_id_idx" ON "publications_rels" USING btree ("skills_id");
  CREATE INDEX "publications_rels_pages_id_idx" ON "publications_rels" USING btree ("pages_id");
  CREATE INDEX "_publications_v_version_resources_order_idx" ON "_publications_v_version_resources" USING btree ("_order");
  CREATE INDEX "_publications_v_version_resources_parent_id_idx" ON "_publications_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_publications_v_parent_idx" ON "_publications_v" USING btree ("parent_id");
  CREATE INDEX "_publications_v_version_version_tenant_idx" ON "_publications_v" USING btree ("version_tenant_id");
  CREATE INDEX "_publications_v_version_version_image_idx" ON "_publications_v" USING btree ("version_image_id");
  CREATE INDEX "_publications_v_version_meta_version_meta_image_idx" ON "_publications_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_publications_v_version_version_slug_idx" ON "_publications_v" USING btree ("version_slug");
  CREATE INDEX "_publications_v_version_version_updated_at_idx" ON "_publications_v" USING btree ("version_updated_at");
  CREATE INDEX "_publications_v_version_version_created_at_idx" ON "_publications_v" USING btree ("version_created_at");
  CREATE INDEX "_publications_v_version_version_deleted_at_idx" ON "_publications_v" USING btree ("version_deleted_at");
  CREATE INDEX "_publications_v_version_version__status_idx" ON "_publications_v" USING btree ("version__status");
  CREATE INDEX "_publications_v_created_at_idx" ON "_publications_v" USING btree ("created_at");
  CREATE INDEX "_publications_v_updated_at_idx" ON "_publications_v" USING btree ("updated_at");
  CREATE INDEX "_publications_v_latest_idx" ON "_publications_v" USING btree ("latest");
  CREATE INDEX "_publications_v_autosave_idx" ON "_publications_v" USING btree ("autosave");
  CREATE INDEX "_publications_v_rels_order_idx" ON "_publications_v_rels" USING btree ("order");
  CREATE INDEX "_publications_v_rels_parent_idx" ON "_publications_v_rels" USING btree ("parent_id");
  CREATE INDEX "_publications_v_rels_path_idx" ON "_publications_v_rels" USING btree ("path");
  CREATE INDEX "_publications_v_rels_skills_id_idx" ON "_publications_v_rels" USING btree ("skills_id");
  CREATE INDEX "_publications_v_rels_pages_id_idx" ON "_publications_v_rels" USING btree ("pages_id");
  CREATE INDEX "licenses_resources_order_idx" ON "licenses_resources" USING btree ("_order");
  CREATE INDEX "licenses_resources_parent_id_idx" ON "licenses_resources" USING btree ("_parent_id");
  CREATE INDEX "licenses_tenant_idx" ON "licenses" USING btree ("tenant_id");
  CREATE INDEX "licenses_image_idx" ON "licenses" USING btree ("image_id");
  CREATE INDEX "licenses_updated_at_idx" ON "licenses" USING btree ("updated_at");
  CREATE INDEX "licenses_created_at_idx" ON "licenses" USING btree ("created_at");
  CREATE INDEX "licenses_deleted_at_idx" ON "licenses" USING btree ("deleted_at");
  CREATE INDEX "licenses__status_idx" ON "licenses" USING btree ("_status");
  CREATE INDEX "licenses_rels_order_idx" ON "licenses_rels" USING btree ("order");
  CREATE INDEX "licenses_rels_parent_idx" ON "licenses_rels" USING btree ("parent_id");
  CREATE INDEX "licenses_rels_path_idx" ON "licenses_rels" USING btree ("path");
  CREATE INDEX "licenses_rels_pages_id_idx" ON "licenses_rels" USING btree ("pages_id");
  CREATE INDEX "_licenses_v_version_resources_order_idx" ON "_licenses_v_version_resources" USING btree ("_order");
  CREATE INDEX "_licenses_v_version_resources_parent_id_idx" ON "_licenses_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_licenses_v_parent_idx" ON "_licenses_v" USING btree ("parent_id");
  CREATE INDEX "_licenses_v_version_version_tenant_idx" ON "_licenses_v" USING btree ("version_tenant_id");
  CREATE INDEX "_licenses_v_version_version_image_idx" ON "_licenses_v" USING btree ("version_image_id");
  CREATE INDEX "_licenses_v_version_version_updated_at_idx" ON "_licenses_v" USING btree ("version_updated_at");
  CREATE INDEX "_licenses_v_version_version_created_at_idx" ON "_licenses_v" USING btree ("version_created_at");
  CREATE INDEX "_licenses_v_version_version_deleted_at_idx" ON "_licenses_v" USING btree ("version_deleted_at");
  CREATE INDEX "_licenses_v_version_version__status_idx" ON "_licenses_v" USING btree ("version__status");
  CREATE INDEX "_licenses_v_created_at_idx" ON "_licenses_v" USING btree ("created_at");
  CREATE INDEX "_licenses_v_updated_at_idx" ON "_licenses_v" USING btree ("updated_at");
  CREATE INDEX "_licenses_v_latest_idx" ON "_licenses_v" USING btree ("latest");
  CREATE INDEX "_licenses_v_autosave_idx" ON "_licenses_v" USING btree ("autosave");
  CREATE INDEX "_licenses_v_rels_order_idx" ON "_licenses_v_rels" USING btree ("order");
  CREATE INDEX "_licenses_v_rels_parent_idx" ON "_licenses_v_rels" USING btree ("parent_id");
  CREATE INDEX "_licenses_v_rels_path_idx" ON "_licenses_v_rels" USING btree ("path");
  CREATE INDEX "_licenses_v_rels_pages_id_idx" ON "_licenses_v_rels" USING btree ("pages_id");
  CREATE UNIQUE INDEX "industries_slug_idx" ON "industries" USING btree ("slug");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "industries_deleted_at_idx" ON "industries" USING btree ("deleted_at");
  CREATE INDEX "experiences_tenant_idx" ON "experiences" USING btree ("tenant_id");
  CREATE INDEX "experiences_logo_idx" ON "experiences" USING btree ("logo_id");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX "experiences__status_idx" ON "experiences" USING btree ("_status");
  CREATE INDEX "experiences_rels_order_idx" ON "experiences_rels" USING btree ("order");
  CREATE INDEX "experiences_rels_parent_idx" ON "experiences_rels" USING btree ("parent_id");
  CREATE INDEX "experiences_rels_path_idx" ON "experiences_rels" USING btree ("path");
  CREATE INDEX "experiences_rels_skills_id_idx" ON "experiences_rels" USING btree ("skills_id");
  CREATE INDEX "_experiences_v_parent_idx" ON "_experiences_v" USING btree ("parent_id");
  CREATE INDEX "_experiences_v_version_version_tenant_idx" ON "_experiences_v" USING btree ("version_tenant_id");
  CREATE INDEX "_experiences_v_version_version_logo_idx" ON "_experiences_v" USING btree ("version_logo_id");
  CREATE INDEX "_experiences_v_version_version_updated_at_idx" ON "_experiences_v" USING btree ("version_updated_at");
  CREATE INDEX "_experiences_v_version_version_created_at_idx" ON "_experiences_v" USING btree ("version_created_at");
  CREATE INDEX "_experiences_v_version_version__status_idx" ON "_experiences_v" USING btree ("version__status");
  CREATE INDEX "_experiences_v_created_at_idx" ON "_experiences_v" USING btree ("created_at");
  CREATE INDEX "_experiences_v_updated_at_idx" ON "_experiences_v" USING btree ("updated_at");
  CREATE INDEX "_experiences_v_latest_idx" ON "_experiences_v" USING btree ("latest");
  CREATE INDEX "_experiences_v_autosave_idx" ON "_experiences_v" USING btree ("autosave");
  CREATE INDEX "_experiences_v_rels_order_idx" ON "_experiences_v_rels" USING btree ("order");
  CREATE INDEX "_experiences_v_rels_parent_idx" ON "_experiences_v_rels" USING btree ("parent_id");
  CREATE INDEX "_experiences_v_rels_path_idx" ON "_experiences_v_rels" USING btree ("path");
  CREATE INDEX "_experiences_v_rels_skills_id_idx" ON "_experiences_v_rels" USING btree ("skills_id");
  CREATE UNIQUE INDEX "integration_tenant_idx" ON "integration" USING btree ("tenant_id");
  CREATE INDEX "integration_updated_at_idx" ON "integration" USING btree ("updated_at");
  CREATE INDEX "integration_created_at_idx" ON "integration" USING btree ("created_at");
  CREATE UNIQUE INDEX "portfolio_settings_tenant_idx" ON "portfolio_settings" USING btree ("tenant_id");
  CREATE INDEX "portfolio_settings_theme_idx" ON "portfolio_settings" USING btree ("theme_id");
  CREATE INDEX "portfolio_settings_updated_at_idx" ON "portfolio_settings" USING btree ("updated_at");
  CREATE INDEX "portfolio_settings_created_at_idx" ON "portfolio_settings" USING btree ("created_at");
  CREATE INDEX "themes_thumbnail_idx" ON "themes" USING btree ("thumbnail_id");
  CREATE INDEX "themes_updated_at_idx" ON "themes" USING btree ("updated_at");
  CREATE INDEX "themes_created_at_idx" ON "themes" USING btree ("created_at");
  CREATE INDEX "themes_deleted_at_idx" ON "themes" USING btree ("deleted_at");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_tenant_idx" ON "forms" USING btree ("tenant_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "forms_deleted_at_idx" ON "forms" USING btree ("deleted_at");
  CREATE INDEX "forms_rels_order_idx" ON "forms_rels" USING btree ("order");
  CREATE INDEX "forms_rels_parent_idx" ON "forms_rels" USING btree ("parent_id");
  CREATE INDEX "forms_rels_path_idx" ON "forms_rels" USING btree ("path");
  CREATE INDEX "forms_rels_pages_id_idx" ON "forms_rels" USING btree ("pages_id");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_tenant_idx" ON "form_submissions" USING btree ("tenant_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "redirects_tenant_idx" ON "redirects" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_educations_id_idx" ON "payload_locked_documents_rels" USING btree ("educations_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_locked_documents_rels" USING btree ("tenants_id");
  CREATE INDEX "payload_locked_documents_rels_menus_id_idx" ON "payload_locked_documents_rels" USING btree ("menus_id");
  CREATE INDEX "payload_locked_documents_rels_socials_id_idx" ON "payload_locked_documents_rels" USING btree ("socials_id");
  CREATE INDEX "payload_locked_documents_rels_skills_id_idx" ON "payload_locked_documents_rels" USING btree ("skills_id");
  CREATE INDEX "payload_locked_documents_rels_hackathons_id_idx" ON "payload_locked_documents_rels" USING btree ("hackathons_id");
  CREATE INDEX "payload_locked_documents_rels_researches_id_idx" ON "payload_locked_documents_rels" USING btree ("researches_id");
  CREATE INDEX "payload_locked_documents_rels_achievements_id_idx" ON "payload_locked_documents_rels" USING btree ("achievements_id");
  CREATE INDEX "payload_locked_documents_rels_certifications_id_idx" ON "payload_locked_documents_rels" USING btree ("certifications_id");
  CREATE INDEX "payload_locked_documents_rels_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("publications_id");
  CREATE INDEX "payload_locked_documents_rels_licenses_id_idx" ON "payload_locked_documents_rels" USING btree ("licenses_id");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_integration_id_idx" ON "payload_locked_documents_rels" USING btree ("integration_id");
  CREATE INDEX "payload_locked_documents_rels_portfolio_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("portfolio_settings_id");
  CREATE INDEX "payload_locked_documents_rels_themes_id_idx" ON "payload_locked_documents_rels" USING btree ("themes_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_tenants_roles" CASCADE;
  DROP TABLE "users_tenants" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "blogs" CASCADE;
  DROP TABLE "_blogs_v" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "educations_resources" CASCADE;
  DROP TABLE "educations" CASCADE;
  DROP TABLE "educations_rels" CASCADE;
  DROP TABLE "_educations_v_version_resources" CASCADE;
  DROP TABLE "_educations_v" CASCADE;
  DROP TABLE "_educations_v_rels" CASCADE;
  DROP TABLE "projects_resources" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_resources" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "tenants" CASCADE;
  DROP TABLE "menus_menu" CASCADE;
  DROP TABLE "menus" CASCADE;
  DROP TABLE "menus_rels" CASCADE;
  DROP TABLE "socials_socials_links" CASCADE;
  DROP TABLE "socials" CASCADE;
  DROP TABLE "skills" CASCADE;
  DROP TABLE "_skills_v" CASCADE;
  DROP TABLE "hackathons_resources" CASCADE;
  DROP TABLE "hackathons" CASCADE;
  DROP TABLE "hackathons_rels" CASCADE;
  DROP TABLE "_hackathons_v_version_resources" CASCADE;
  DROP TABLE "_hackathons_v" CASCADE;
  DROP TABLE "_hackathons_v_rels" CASCADE;
  DROP TABLE "researches_resources" CASCADE;
  DROP TABLE "researches" CASCADE;
  DROP TABLE "researches_rels" CASCADE;
  DROP TABLE "_researches_v_version_resources" CASCADE;
  DROP TABLE "_researches_v" CASCADE;
  DROP TABLE "_researches_v_rels" CASCADE;
  DROP TABLE "achievements_stats" CASCADE;
  DROP TABLE "achievements_resources" CASCADE;
  DROP TABLE "achievements" CASCADE;
  DROP TABLE "achievements_rels" CASCADE;
  DROP TABLE "_achievements_v_version_stats" CASCADE;
  DROP TABLE "_achievements_v_version_resources" CASCADE;
  DROP TABLE "_achievements_v" CASCADE;
  DROP TABLE "_achievements_v_rels" CASCADE;
  DROP TABLE "certifications_resources" CASCADE;
  DROP TABLE "certifications" CASCADE;
  DROP TABLE "certifications_rels" CASCADE;
  DROP TABLE "_certifications_v_version_resources" CASCADE;
  DROP TABLE "_certifications_v" CASCADE;
  DROP TABLE "_certifications_v_rels" CASCADE;
  DROP TABLE "publications_resources" CASCADE;
  DROP TABLE "publications" CASCADE;
  DROP TABLE "publications_rels" CASCADE;
  DROP TABLE "_publications_v_version_resources" CASCADE;
  DROP TABLE "_publications_v" CASCADE;
  DROP TABLE "_publications_v_rels" CASCADE;
  DROP TABLE "licenses_resources" CASCADE;
  DROP TABLE "licenses" CASCADE;
  DROP TABLE "licenses_rels" CASCADE;
  DROP TABLE "_licenses_v_version_resources" CASCADE;
  DROP TABLE "_licenses_v" CASCADE;
  DROP TABLE "_licenses_v_rels" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "experiences_rels" CASCADE;
  DROP TABLE "_experiences_v" CASCADE;
  DROP TABLE "_experiences_v_rels" CASCADE;
  DROP TABLE "integration" CASCADE;
  DROP TABLE "portfolio_settings" CASCADE;
  DROP TABLE "themes" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_rels" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_users_tenants_roles";
  DROP TYPE "public"."enum_blogs_status";
  DROP TYPE "public"."enum__blogs_v_version_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_educations_resources_type";
  DROP TYPE "public"."enum_educations_status";
  DROP TYPE "public"."enum__educations_v_version_resources_type";
  DROP TYPE "public"."enum__educations_v_version_status";
  DROP TYPE "public"."enum_projects_resources_type";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_resources_type";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_menus_menu_type";
  DROP TYPE "public"."enum_skills_status";
  DROP TYPE "public"."enum__skills_v_version_status";
  DROP TYPE "public"."enum_hackathons_resources_type";
  DROP TYPE "public"."enum_hackathons_status";
  DROP TYPE "public"."enum__hackathons_v_version_resources_type";
  DROP TYPE "public"."enum__hackathons_v_version_status";
  DROP TYPE "public"."enum_researches_resources_type";
  DROP TYPE "public"."enum_researches_status";
  DROP TYPE "public"."enum__researches_v_version_resources_type";
  DROP TYPE "public"."enum__researches_v_version_status";
  DROP TYPE "public"."enum_achievements_resources_type";
  DROP TYPE "public"."enum_achievements_type";
  DROP TYPE "public"."enum_achievements_status";
  DROP TYPE "public"."enum__achievements_v_version_resources_type";
  DROP TYPE "public"."enum__achievements_v_version_type";
  DROP TYPE "public"."enum__achievements_v_version_status";
  DROP TYPE "public"."enum_certifications_resources_type";
  DROP TYPE "public"."enum_certifications_status";
  DROP TYPE "public"."enum__certifications_v_version_resources_type";
  DROP TYPE "public"."enum__certifications_v_version_status";
  DROP TYPE "public"."enum_publications_resources_type";
  DROP TYPE "public"."enum_publications_type";
  DROP TYPE "public"."enum_publications_status";
  DROP TYPE "public"."enum__publications_v_version_resources_type";
  DROP TYPE "public"."enum__publications_v_version_type";
  DROP TYPE "public"."enum__publications_v_version_status";
  DROP TYPE "public"."enum_licenses_resources_type";
  DROP TYPE "public"."enum_licenses_validity_status";
  DROP TYPE "public"."enum_licenses_status";
  DROP TYPE "public"."enum__licenses_v_version_resources_type";
  DROP TYPE "public"."enum__licenses_v_version_validity_status";
  DROP TYPE "public"."enum__licenses_v_version_status";
  DROP TYPE "public"."enum_experiences_employment_type";
  DROP TYPE "public"."enum_experiences_job_type";
  DROP TYPE "public"."enum_experiences_status";
  DROP TYPE "public"."enum__experiences_v_version_employment_type";
  DROP TYPE "public"."enum__experiences_v_version_job_type";
  DROP TYPE "public"."enum__experiences_v_version_status";
  DROP TYPE "public"."enum_integration_chat_bubble_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_forms_redirect_type";
  DROP TYPE "public"."enum_redirects_to_type";`)
}
