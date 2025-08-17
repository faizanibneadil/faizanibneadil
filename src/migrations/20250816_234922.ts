import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('super-admin', 'user');
  CREATE TYPE "public"."enum_users_tenants_roles" AS ENUM('tenant-admin', 'tenant-viewer');
  CREATE TYPE "public"."enum_users_field" AS ENUM('information_technology', 'healthcare', 'engineering', 'finance', 'marketing', 'education', 'management');
  CREATE TYPE "public"."enum_icons_icon_specs_type" AS ENUM('svg', 'html');
  CREATE TYPE "public"."enum_notes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__notes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blogs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blogs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_page_mode_mode" AS ENUM('layout', 'collection');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_page_mode_mode" AS ENUM('layout', 'collection');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_educations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__educations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_menus_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__menus_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_socials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__socials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_skills_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__skills_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_hackathons_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__hackathons_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_researches_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__researches_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_achievements_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__achievements_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_certifications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certifications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_publications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_licenses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__licenses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_forms_redirect_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__forms_v_version_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum__forms_v_version_redirect_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__forms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
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
  	"tenant_id" integer NOT NULL
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
  	"username" varchar,
  	"field" "enum_users_field",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "icons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon_specs_type" "enum_icons_icon_specs_type" DEFAULT 'svg' NOT NULL,
  	"icon_specs_icon_code" varchar,
  	"icon_specs_svg_id" integer,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"alt" varchar NOT NULL,
  	"_key" varchar,
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
  
  CREATE TABLE "notes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_notes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_notes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__notes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"content" jsonb,
  	"featured_image_id" integer,
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
  	"version_featured_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__blogs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_achievement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_certification" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_experiance_experiances" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"company" varchar,
  	"subtitle" varchar,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_experiance" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hackathon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name_on_resume" varchar,
  	"headline" varchar,
  	"profile_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_license" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_project" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_publication" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_skill" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_research" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"page_mode_mode" "enum_pages_page_mode_mode" DEFAULT 'layout',
  	"configurations_slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
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
  
  CREATE TABLE "educations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"qualification_academy" varchar,
  	"qualification_degree" varchar,
  	"dates_to" timestamp(3) with time zone,
  	"dates_from" timestamp(3) with time zone,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_educations_status" DEFAULT 'draft'
  );
  
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
  
  CREATE TABLE "projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"visit_u_r_l" varchar,
  	"published_at" timestamp(3) with time zone,
  	"dates_to" timestamp(3) with time zone,
  	"dates_from" timestamp(3) with time zone,
  	"credential_credential_email" varchar,
  	"credential_credential_password" varchar,
  	"credential_credential_username" varchar,
  	"thumbnail_id" integer,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
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
  	"skills_id" integer
  );
  
  CREATE TABLE "_projects_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_visit_u_r_l" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_dates_to" timestamp(3) with time zone,
  	"version_dates_from" timestamp(3) with time zone,
  	"version_credential_credential_email" varchar,
  	"version_credential_credential_password" varchar,
  	"version_credential_credential_username" varchar,
  	"version_thumbnail_id" integer,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
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
  	"skills_id" integer
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
  	"icon_id" integer,
  	"label" varchar,
  	"page_id" integer
  );
  
  CREATE TABLE "menus" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_menus_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_menus_v_version_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"page_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_menus_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__menus_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "socials_socials_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_socials_status" DEFAULT 'draft'
  );
  
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
  
  CREATE TABLE "skills" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"published_at" timestamp(3) with time zone,
  	"techstack_icon_id" integer,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_skills_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "skills_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "_skills_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_techstack_icon_id" integer,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__skills_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_skills_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "hackathons_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar
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
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_hackathons_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_hackathons_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar,
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
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__hackathons_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "researches_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "researches" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"dates_to" timestamp(3) with time zone,
  	"dates_from" timestamp(3) with time zone,
  	"location" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_researches_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_researches_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_researches_v" (
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
  	"version__status" "enum__researches_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "achievements_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "achievements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"dates_to" timestamp(3) with time zone,
  	"dates_from" timestamp(3) with time zone,
  	"location" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_achievements_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_achievements_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_achievements_v" (
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
  	"version__status" "enum__achievements_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "certifications_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "certifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"dates_to" timestamp(3) with time zone,
  	"dates_from" timestamp(3) with time zone,
  	"location" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_certifications_status" DEFAULT 'draft'
  );
  
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
  
  CREATE TABLE "publications_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"dates_to" timestamp(3) with time zone,
  	"dates_from" timestamp(3) with time zone,
  	"location" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_publications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_publications_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_publications_v" (
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
  	"version__status" "enum__publications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "licenses_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "licenses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"description" jsonb,
  	"dates_to" timestamp(3) with time zone,
  	"dates_from" timestamp(3) with time zone,
  	"location" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_licenses_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_licenses_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"label" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_licenses_v" (
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
  	"version__status" "enum__licenses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_date" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" timestamp(3) with time zone,
  	"block_name" varchar
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
  	"subject" varchar DEFAULT 'You''ve received a new message.',
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"title" varchar,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_type" "enum_forms_redirect_type" DEFAULT 'reference',
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_forms_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "forms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "_forms_v_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_forms_v_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_forms_v_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_forms_v_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_forms_v_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_forms_v_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_forms_v_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_forms_v_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_forms_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_forms_v_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_forms_v_blocks_date" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" timestamp(3) with time zone,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_forms_v_version_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.',
  	"message" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_forms_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_submit_button_label" varchar,
  	"version_confirmation_type" "enum__forms_v_version_confirmation_type" DEFAULT 'message',
  	"version_confirmation_message" jsonb,
  	"version_redirect_type" "enum__forms_v_version_redirect_type" DEFAULT 'reference',
  	"version_redirect_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__forms_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_forms_v_rels" (
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
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  	"icons_id" integer,
  	"media_id" integer,
  	"notes_id" integer,
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
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"payload_jobs_id" integer
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
  ALTER TABLE "icons" ADD CONSTRAINT "icons_icon_specs_svg_id_media_id_fk" FOREIGN KEY ("icon_specs_svg_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_notes_v" ADD CONSTRAINT "_notes_v_parent_id_notes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."notes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_notes_v" ADD CONSTRAINT "_notes_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_parent_id_blogs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_achievement" ADD CONSTRAINT "pages_blocks_achievement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_certification" ADD CONSTRAINT "pages_blocks_certification_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education" ADD CONSTRAINT "pages_blocks_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experiance_experiances" ADD CONSTRAINT "pages_blocks_experiance_experiances_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_experiance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experiance" ADD CONSTRAINT "pages_blocks_experiance_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hackathon" ADD CONSTRAINT "pages_blocks_hackathon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_profile_id_media_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_license" ADD CONSTRAINT "pages_blocks_license_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_project" ADD CONSTRAINT "pages_blocks_project_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_publication" ADD CONSTRAINT "pages_blocks_publication_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_skill" ADD CONSTRAINT "pages_blocks_skill_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research" ADD CONSTRAINT "pages_blocks_research_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_achievements_fk" FOREIGN KEY ("achievements_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_certifications_fk" FOREIGN KEY ("certifications_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_educations_fk" FOREIGN KEY ("educations_id") REFERENCES "public"."educations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_hackathons_fk" FOREIGN KEY ("hackathons_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_licenses_fk" FOREIGN KEY ("licenses_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_researches_fk" FOREIGN KEY ("researches_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "educations" ADD CONSTRAINT "educations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_parent_id_educations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."educations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links" ADD CONSTRAINT "_projects_v_version_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links" ADD CONSTRAINT "_projects_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus_menu" ADD CONSTRAINT "menus_menu_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menus_menu" ADD CONSTRAINT "menus_menu_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menus_menu" ADD CONSTRAINT "menus_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus" ADD CONSTRAINT "menus_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menus_v_version_menu" ADD CONSTRAINT "_menus_v_version_menu_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menus_v_version_menu" ADD CONSTRAINT "_menus_v_version_menu_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menus_v_version_menu" ADD CONSTRAINT "_menus_v_version_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_menus_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menus_v" ADD CONSTRAINT "_menus_v_parent_id_menus_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menus"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menus_v" ADD CONSTRAINT "_menus_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "socials_socials_links" ADD CONSTRAINT "socials_socials_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "socials_socials_links" ADD CONSTRAINT "socials_socials_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials" ADD CONSTRAINT "socials_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_socials_v_version_socials_links" ADD CONSTRAINT "_socials_v_version_socials_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_socials_v_version_socials_links" ADD CONSTRAINT "_socials_v_version_socials_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_socials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_socials_v" ADD CONSTRAINT "_socials_v_parent_id_socials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."socials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_socials_v" ADD CONSTRAINT "_socials_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills" ADD CONSTRAINT "skills_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills" ADD CONSTRAINT "skills_techstack_icon_id_icons_id_fk" FOREIGN KEY ("techstack_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_parent_id_skills_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."skills"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_version_techstack_icon_id_icons_id_fk" FOREIGN KEY ("version_techstack_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v_rels" ADD CONSTRAINT "_skills_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_skills_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_skills_v_rels" ADD CONSTRAINT "_skills_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_links" ADD CONSTRAINT "hackathons_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons_links" ADD CONSTRAINT "hackathons_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v_version_links" ADD CONSTRAINT "_hackathons_v_version_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v_version_links" ADD CONSTRAINT "_hackathons_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hackathons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_parent_id_hackathons_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hackathons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches_links" ADD CONSTRAINT "researches_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches_links" ADD CONSTRAINT "researches_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."researches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_researches_v_version_links" ADD CONSTRAINT "_researches_v_version_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_researches_v_version_links" ADD CONSTRAINT "_researches_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_researches_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_researches_v" ADD CONSTRAINT "_researches_v_parent_id_researches_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."researches"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_researches_v" ADD CONSTRAINT "_researches_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_researches_v" ADD CONSTRAINT "_researches_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements_links" ADD CONSTRAINT "achievements_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements_links" ADD CONSTRAINT "achievements_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_achievements_v_version_links" ADD CONSTRAINT "_achievements_v_version_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_achievements_v_version_links" ADD CONSTRAINT "_achievements_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_achievements_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_achievements_v" ADD CONSTRAINT "_achievements_v_parent_id_achievements_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."achievements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_achievements_v" ADD CONSTRAINT "_achievements_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_achievements_v" ADD CONSTRAINT "_achievements_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications_links" ADD CONSTRAINT "certifications_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications_links" ADD CONSTRAINT "certifications_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v_version_links" ADD CONSTRAINT "_certifications_v_version_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v_version_links" ADD CONSTRAINT "_certifications_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_certifications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_parent_id_certifications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_links" ADD CONSTRAINT "publications_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_links" ADD CONSTRAINT "publications_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_version_links" ADD CONSTRAINT "_publications_v_version_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_version_links" ADD CONSTRAINT "_publications_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_parent_id_publications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses_links" ADD CONSTRAINT "licenses_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses_links" ADD CONSTRAINT "licenses_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_licenses_v_version_links" ADD CONSTRAINT "_licenses_v_version_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_licenses_v_version_links" ADD CONSTRAINT "_licenses_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_licenses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_licenses_v" ADD CONSTRAINT "_licenses_v_parent_id_licenses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."licenses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_licenses_v" ADD CONSTRAINT "_licenses_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_licenses_v" ADD CONSTRAINT "_licenses_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_date" ADD CONSTRAINT "forms_blocks_date_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms" ADD CONSTRAINT "forms_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_checkbox" ADD CONSTRAINT "_forms_v_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_country" ADD CONSTRAINT "_forms_v_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_email" ADD CONSTRAINT "_forms_v_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_message" ADD CONSTRAINT "_forms_v_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_number" ADD CONSTRAINT "_forms_v_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_select_options" ADD CONSTRAINT "_forms_v_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_select" ADD CONSTRAINT "_forms_v_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_state" ADD CONSTRAINT "_forms_v_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_text" ADD CONSTRAINT "_forms_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_textarea" ADD CONSTRAINT "_forms_v_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_blocks_date" ADD CONSTRAINT "_forms_v_blocks_date_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_version_emails" ADD CONSTRAINT "_forms_v_version_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v" ADD CONSTRAINT "_forms_v_parent_id_forms_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_forms_v" ADD CONSTRAINT "_forms_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_forms_v_rels" ADD CONSTRAINT "_forms_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_rels" ADD CONSTRAINT "_forms_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_icons_fk" FOREIGN KEY ("icons_id") REFERENCES "public"."icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE UNIQUE INDEX "users_username_idx" ON "users" USING btree ("username");
  CREATE INDEX "users_field_idx" ON "users" USING btree ("field");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX "users_deleted_at_idx" ON "users" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "icons_icon_specs_icon_specs_svg_idx" ON "icons" USING btree ("icon_specs_svg_id");
  CREATE INDEX "icons_slug_idx" ON "icons" USING btree ("slug");
  CREATE INDEX "icons_updated_at_idx" ON "icons" USING btree ("updated_at");
  CREATE INDEX "icons_created_at_idx" ON "icons" USING btree ("created_at");
  CREATE INDEX "icons_deleted_at_idx" ON "icons" USING btree ("deleted_at");
  CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE INDEX "media_deleted_at_idx" ON "media" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "notes_tenant_idx" ON "notes" USING btree ("tenant_id");
  CREATE INDEX "notes_updated_at_idx" ON "notes" USING btree ("updated_at");
  CREATE INDEX "notes_created_at_idx" ON "notes" USING btree ("created_at");
  CREATE INDEX "notes_deleted_at_idx" ON "notes" USING btree ("deleted_at");
  CREATE INDEX "notes__status_idx" ON "notes" USING btree ("_status");
  CREATE INDEX "_notes_v_parent_idx" ON "_notes_v" USING btree ("parent_id");
  CREATE INDEX "_notes_v_version_version_tenant_idx" ON "_notes_v" USING btree ("version_tenant_id");
  CREATE INDEX "_notes_v_version_version_updated_at_idx" ON "_notes_v" USING btree ("version_updated_at");
  CREATE INDEX "_notes_v_version_version_created_at_idx" ON "_notes_v" USING btree ("version_created_at");
  CREATE INDEX "_notes_v_version_version_deleted_at_idx" ON "_notes_v" USING btree ("version_deleted_at");
  CREATE INDEX "_notes_v_version_version__status_idx" ON "_notes_v" USING btree ("version__status");
  CREATE INDEX "_notes_v_created_at_idx" ON "_notes_v" USING btree ("created_at");
  CREATE INDEX "_notes_v_updated_at_idx" ON "_notes_v" USING btree ("updated_at");
  CREATE INDEX "_notes_v_latest_idx" ON "_notes_v" USING btree ("latest");
  CREATE INDEX "_notes_v_autosave_idx" ON "_notes_v" USING btree ("autosave");
  CREATE INDEX "blogs_tenant_idx" ON "blogs" USING btree ("tenant_id");
  CREATE INDEX "blogs_featured_image_idx" ON "blogs" USING btree ("featured_image_id");
  CREATE INDEX "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
  CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at");
  CREATE INDEX "blogs_deleted_at_idx" ON "blogs" USING btree ("deleted_at");
  CREATE INDEX "blogs__status_idx" ON "blogs" USING btree ("_status");
  CREATE INDEX "_blogs_v_parent_idx" ON "_blogs_v" USING btree ("parent_id");
  CREATE INDEX "_blogs_v_version_version_tenant_idx" ON "_blogs_v" USING btree ("version_tenant_id");
  CREATE INDEX "_blogs_v_version_version_featured_image_idx" ON "_blogs_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blogs_v_version_version_updated_at_idx" ON "_blogs_v" USING btree ("version_updated_at");
  CREATE INDEX "_blogs_v_version_version_created_at_idx" ON "_blogs_v" USING btree ("version_created_at");
  CREATE INDEX "_blogs_v_version_version_deleted_at_idx" ON "_blogs_v" USING btree ("version_deleted_at");
  CREATE INDEX "_blogs_v_version_version__status_idx" ON "_blogs_v" USING btree ("version__status");
  CREATE INDEX "_blogs_v_created_at_idx" ON "_blogs_v" USING btree ("created_at");
  CREATE INDEX "_blogs_v_updated_at_idx" ON "_blogs_v" USING btree ("updated_at");
  CREATE INDEX "_blogs_v_latest_idx" ON "_blogs_v" USING btree ("latest");
  CREATE INDEX "_blogs_v_autosave_idx" ON "_blogs_v" USING btree ("autosave");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_achievement_order_idx" ON "pages_blocks_achievement" USING btree ("_order");
  CREATE INDEX "pages_blocks_achievement_parent_id_idx" ON "pages_blocks_achievement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_achievement_path_idx" ON "pages_blocks_achievement" USING btree ("_path");
  CREATE INDEX "pages_blocks_certification_order_idx" ON "pages_blocks_certification" USING btree ("_order");
  CREATE INDEX "pages_blocks_certification_parent_id_idx" ON "pages_blocks_certification" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_certification_path_idx" ON "pages_blocks_certification" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_education_order_idx" ON "pages_blocks_education" USING btree ("_order");
  CREATE INDEX "pages_blocks_education_parent_id_idx" ON "pages_blocks_education" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_education_path_idx" ON "pages_blocks_education" USING btree ("_path");
  CREATE INDEX "pages_blocks_experiance_experiances_order_idx" ON "pages_blocks_experiance_experiances" USING btree ("_order");
  CREATE INDEX "pages_blocks_experiance_experiances_parent_id_idx" ON "pages_blocks_experiance_experiances" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_experiance_order_idx" ON "pages_blocks_experiance" USING btree ("_order");
  CREATE INDEX "pages_blocks_experiance_parent_id_idx" ON "pages_blocks_experiance" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_experiance_path_idx" ON "pages_blocks_experiance" USING btree ("_path");
  CREATE INDEX "pages_blocks_hackathon_order_idx" ON "pages_blocks_hackathon" USING btree ("_order");
  CREATE INDEX "pages_blocks_hackathon_parent_id_idx" ON "pages_blocks_hackathon" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hackathon_path_idx" ON "pages_blocks_hackathon" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_profile_idx" ON "pages_blocks_hero" USING btree ("profile_id");
  CREATE INDEX "pages_blocks_license_order_idx" ON "pages_blocks_license" USING btree ("_order");
  CREATE INDEX "pages_blocks_license_parent_id_idx" ON "pages_blocks_license" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_license_path_idx" ON "pages_blocks_license" USING btree ("_path");
  CREATE INDEX "pages_blocks_project_order_idx" ON "pages_blocks_project" USING btree ("_order");
  CREATE INDEX "pages_blocks_project_parent_id_idx" ON "pages_blocks_project" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_project_path_idx" ON "pages_blocks_project" USING btree ("_path");
  CREATE INDEX "pages_blocks_publication_order_idx" ON "pages_blocks_publication" USING btree ("_order");
  CREATE INDEX "pages_blocks_publication_parent_id_idx" ON "pages_blocks_publication" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_publication_path_idx" ON "pages_blocks_publication" USING btree ("_path");
  CREATE INDEX "pages_blocks_skill_order_idx" ON "pages_blocks_skill" USING btree ("_order");
  CREATE INDEX "pages_blocks_skill_parent_id_idx" ON "pages_blocks_skill" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_skill_path_idx" ON "pages_blocks_skill" USING btree ("_path");
  CREATE INDEX "pages_blocks_research_order_idx" ON "pages_blocks_research" USING btree ("_order");
  CREATE INDEX "pages_blocks_research_parent_id_idx" ON "pages_blocks_research" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_research_path_idx" ON "pages_blocks_research" USING btree ("_path");
  CREATE INDEX "pages_tenant_idx" ON "pages" USING btree ("tenant_id");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_deleted_at_idx" ON "pages" USING btree ("deleted_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_achievements_id_idx" ON "pages_rels" USING btree ("achievements_id");
  CREATE INDEX "pages_rels_certifications_id_idx" ON "pages_rels" USING btree ("certifications_id");
  CREATE INDEX "pages_rels_educations_id_idx" ON "pages_rels" USING btree ("educations_id");
  CREATE INDEX "pages_rels_hackathons_id_idx" ON "pages_rels" USING btree ("hackathons_id");
  CREATE INDEX "pages_rels_licenses_id_idx" ON "pages_rels" USING btree ("licenses_id");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "pages_rels_publications_id_idx" ON "pages_rels" USING btree ("publications_id");
  CREATE INDEX "pages_rels_skills_id_idx" ON "pages_rels" USING btree ("skills_id");
  CREATE INDEX "pages_rels_researches_id_idx" ON "pages_rels" USING btree ("researches_id");
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
  CREATE INDEX "educations_tenant_idx" ON "educations" USING btree ("tenant_id");
  CREATE INDEX "educations_image_idx" ON "educations" USING btree ("image_id");
  CREATE INDEX "educations_updated_at_idx" ON "educations" USING btree ("updated_at");
  CREATE INDEX "educations_created_at_idx" ON "educations" USING btree ("created_at");
  CREATE INDEX "educations_deleted_at_idx" ON "educations" USING btree ("deleted_at");
  CREATE INDEX "educations__status_idx" ON "educations" USING btree ("_status");
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
  CREATE INDEX "projects_links_order_idx" ON "projects_links" USING btree ("_order");
  CREATE INDEX "projects_links_parent_id_idx" ON "projects_links" USING btree ("_parent_id");
  CREATE INDEX "projects_links_icon_idx" ON "projects_links" USING btree ("icon_id");
  CREATE INDEX "projects_tenant_idx" ON "projects" USING btree ("tenant_id");
  CREATE INDEX "projects_thumbnail_idx" ON "projects" USING btree ("thumbnail_id");
  CREATE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects_deleted_at_idx" ON "projects" USING btree ("deleted_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_skills_id_idx" ON "projects_rels" USING btree ("skills_id");
  CREATE INDEX "_projects_v_version_links_order_idx" ON "_projects_v_version_links" USING btree ("_order");
  CREATE INDEX "_projects_v_version_links_parent_id_idx" ON "_projects_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_links_icon_idx" ON "_projects_v_version_links" USING btree ("icon_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_tenant_idx" ON "_projects_v" USING btree ("version_tenant_id");
  CREATE INDEX "_projects_v_version_version_thumbnail_idx" ON "_projects_v" USING btree ("version_thumbnail_id");
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
  CREATE UNIQUE INDEX "tenants_domain_idx" ON "tenants" USING btree ("domain");
  CREATE UNIQUE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug");
  CREATE INDEX "tenants_updated_at_idx" ON "tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "tenants" USING btree ("created_at");
  CREATE INDEX "tenants_deleted_at_idx" ON "tenants" USING btree ("deleted_at");
  CREATE INDEX "menus_menu_order_idx" ON "menus_menu" USING btree ("_order");
  CREATE INDEX "menus_menu_parent_id_idx" ON "menus_menu" USING btree ("_parent_id");
  CREATE INDEX "menus_menu_icon_idx" ON "menus_menu" USING btree ("icon_id");
  CREATE INDEX "menus_menu_page_idx" ON "menus_menu" USING btree ("page_id");
  CREATE UNIQUE INDEX "menus_tenant_idx" ON "menus" USING btree ("tenant_id");
  CREATE INDEX "menus_updated_at_idx" ON "menus" USING btree ("updated_at");
  CREATE INDEX "menus_created_at_idx" ON "menus" USING btree ("created_at");
  CREATE INDEX "menus__status_idx" ON "menus" USING btree ("_status");
  CREATE INDEX "_menus_v_version_menu_order_idx" ON "_menus_v_version_menu" USING btree ("_order");
  CREATE INDEX "_menus_v_version_menu_parent_id_idx" ON "_menus_v_version_menu" USING btree ("_parent_id");
  CREATE INDEX "_menus_v_version_menu_icon_idx" ON "_menus_v_version_menu" USING btree ("icon_id");
  CREATE INDEX "_menus_v_version_menu_page_idx" ON "_menus_v_version_menu" USING btree ("page_id");
  CREATE INDEX "_menus_v_parent_idx" ON "_menus_v" USING btree ("parent_id");
  CREATE INDEX "_menus_v_version_version_tenant_idx" ON "_menus_v" USING btree ("version_tenant_id");
  CREATE INDEX "_menus_v_version_version_updated_at_idx" ON "_menus_v" USING btree ("version_updated_at");
  CREATE INDEX "_menus_v_version_version_created_at_idx" ON "_menus_v" USING btree ("version_created_at");
  CREATE INDEX "_menus_v_version_version__status_idx" ON "_menus_v" USING btree ("version__status");
  CREATE INDEX "_menus_v_created_at_idx" ON "_menus_v" USING btree ("created_at");
  CREATE INDEX "_menus_v_updated_at_idx" ON "_menus_v" USING btree ("updated_at");
  CREATE INDEX "_menus_v_latest_idx" ON "_menus_v" USING btree ("latest");
  CREATE INDEX "_menus_v_autosave_idx" ON "_menus_v" USING btree ("autosave");
  CREATE INDEX "socials_socials_links_order_idx" ON "socials_socials_links" USING btree ("_order");
  CREATE INDEX "socials_socials_links_parent_id_idx" ON "socials_socials_links" USING btree ("_parent_id");
  CREATE INDEX "socials_socials_links_icon_idx" ON "socials_socials_links" USING btree ("icon_id");
  CREATE UNIQUE INDEX "socials_tenant_idx" ON "socials" USING btree ("tenant_id");
  CREATE INDEX "socials_updated_at_idx" ON "socials" USING btree ("updated_at");
  CREATE INDEX "socials_created_at_idx" ON "socials" USING btree ("created_at");
  CREATE INDEX "socials__status_idx" ON "socials" USING btree ("_status");
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
  CREATE INDEX "skills_tenant_idx" ON "skills" USING btree ("tenant_id");
  CREATE INDEX "skills_techstack_techstack_icon_idx" ON "skills" USING btree ("techstack_icon_id");
  CREATE INDEX "skills_slug_idx" ON "skills" USING btree ("slug");
  CREATE INDEX "skills_updated_at_idx" ON "skills" USING btree ("updated_at");
  CREATE INDEX "skills_created_at_idx" ON "skills" USING btree ("created_at");
  CREATE INDEX "skills_deleted_at_idx" ON "skills" USING btree ("deleted_at");
  CREATE INDEX "skills__status_idx" ON "skills" USING btree ("_status");
  CREATE INDEX "skills_rels_order_idx" ON "skills_rels" USING btree ("order");
  CREATE INDEX "skills_rels_parent_idx" ON "skills_rels" USING btree ("parent_id");
  CREATE INDEX "skills_rels_path_idx" ON "skills_rels" USING btree ("path");
  CREATE INDEX "skills_rels_projects_id_idx" ON "skills_rels" USING btree ("projects_id");
  CREATE INDEX "_skills_v_parent_idx" ON "_skills_v" USING btree ("parent_id");
  CREATE INDEX "_skills_v_version_version_tenant_idx" ON "_skills_v" USING btree ("version_tenant_id");
  CREATE INDEX "_skills_v_version_techstack_version_techstack_icon_idx" ON "_skills_v" USING btree ("version_techstack_icon_id");
  CREATE INDEX "_skills_v_version_version_slug_idx" ON "_skills_v" USING btree ("version_slug");
  CREATE INDEX "_skills_v_version_version_updated_at_idx" ON "_skills_v" USING btree ("version_updated_at");
  CREATE INDEX "_skills_v_version_version_created_at_idx" ON "_skills_v" USING btree ("version_created_at");
  CREATE INDEX "_skills_v_version_version_deleted_at_idx" ON "_skills_v" USING btree ("version_deleted_at");
  CREATE INDEX "_skills_v_version_version__status_idx" ON "_skills_v" USING btree ("version__status");
  CREATE INDEX "_skills_v_created_at_idx" ON "_skills_v" USING btree ("created_at");
  CREATE INDEX "_skills_v_updated_at_idx" ON "_skills_v" USING btree ("updated_at");
  CREATE INDEX "_skills_v_latest_idx" ON "_skills_v" USING btree ("latest");
  CREATE INDEX "_skills_v_autosave_idx" ON "_skills_v" USING btree ("autosave");
  CREATE INDEX "_skills_v_rels_order_idx" ON "_skills_v_rels" USING btree ("order");
  CREATE INDEX "_skills_v_rels_parent_idx" ON "_skills_v_rels" USING btree ("parent_id");
  CREATE INDEX "_skills_v_rels_path_idx" ON "_skills_v_rels" USING btree ("path");
  CREATE INDEX "_skills_v_rels_projects_id_idx" ON "_skills_v_rels" USING btree ("projects_id");
  CREATE INDEX "hackathons_links_order_idx" ON "hackathons_links" USING btree ("_order");
  CREATE INDEX "hackathons_links_parent_id_idx" ON "hackathons_links" USING btree ("_parent_id");
  CREATE INDEX "hackathons_links_icon_idx" ON "hackathons_links" USING btree ("icon_id");
  CREATE INDEX "hackathons_tenant_idx" ON "hackathons" USING btree ("tenant_id");
  CREATE INDEX "hackathons_image_idx" ON "hackathons" USING btree ("image_id");
  CREATE INDEX "hackathons_updated_at_idx" ON "hackathons" USING btree ("updated_at");
  CREATE INDEX "hackathons_created_at_idx" ON "hackathons" USING btree ("created_at");
  CREATE INDEX "hackathons_deleted_at_idx" ON "hackathons" USING btree ("deleted_at");
  CREATE INDEX "hackathons__status_idx" ON "hackathons" USING btree ("_status");
  CREATE INDEX "_hackathons_v_version_links_order_idx" ON "_hackathons_v_version_links" USING btree ("_order");
  CREATE INDEX "_hackathons_v_version_links_parent_id_idx" ON "_hackathons_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_hackathons_v_version_links_icon_idx" ON "_hackathons_v_version_links" USING btree ("icon_id");
  CREATE INDEX "_hackathons_v_parent_idx" ON "_hackathons_v" USING btree ("parent_id");
  CREATE INDEX "_hackathons_v_version_version_tenant_idx" ON "_hackathons_v" USING btree ("version_tenant_id");
  CREATE INDEX "_hackathons_v_version_version_image_idx" ON "_hackathons_v" USING btree ("version_image_id");
  CREATE INDEX "_hackathons_v_version_version_updated_at_idx" ON "_hackathons_v" USING btree ("version_updated_at");
  CREATE INDEX "_hackathons_v_version_version_created_at_idx" ON "_hackathons_v" USING btree ("version_created_at");
  CREATE INDEX "_hackathons_v_version_version_deleted_at_idx" ON "_hackathons_v" USING btree ("version_deleted_at");
  CREATE INDEX "_hackathons_v_version_version__status_idx" ON "_hackathons_v" USING btree ("version__status");
  CREATE INDEX "_hackathons_v_created_at_idx" ON "_hackathons_v" USING btree ("created_at");
  CREATE INDEX "_hackathons_v_updated_at_idx" ON "_hackathons_v" USING btree ("updated_at");
  CREATE INDEX "_hackathons_v_latest_idx" ON "_hackathons_v" USING btree ("latest");
  CREATE INDEX "_hackathons_v_autosave_idx" ON "_hackathons_v" USING btree ("autosave");
  CREATE INDEX "researches_links_order_idx" ON "researches_links" USING btree ("_order");
  CREATE INDEX "researches_links_parent_id_idx" ON "researches_links" USING btree ("_parent_id");
  CREATE INDEX "researches_links_icon_idx" ON "researches_links" USING btree ("icon_id");
  CREATE INDEX "researches_tenant_idx" ON "researches" USING btree ("tenant_id");
  CREATE INDEX "researches_image_idx" ON "researches" USING btree ("image_id");
  CREATE INDEX "researches_updated_at_idx" ON "researches" USING btree ("updated_at");
  CREATE INDEX "researches_created_at_idx" ON "researches" USING btree ("created_at");
  CREATE INDEX "researches_deleted_at_idx" ON "researches" USING btree ("deleted_at");
  CREATE INDEX "researches__status_idx" ON "researches" USING btree ("_status");
  CREATE INDEX "_researches_v_version_links_order_idx" ON "_researches_v_version_links" USING btree ("_order");
  CREATE INDEX "_researches_v_version_links_parent_id_idx" ON "_researches_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_researches_v_version_links_icon_idx" ON "_researches_v_version_links" USING btree ("icon_id");
  CREATE INDEX "_researches_v_parent_idx" ON "_researches_v" USING btree ("parent_id");
  CREATE INDEX "_researches_v_version_version_tenant_idx" ON "_researches_v" USING btree ("version_tenant_id");
  CREATE INDEX "_researches_v_version_version_image_idx" ON "_researches_v" USING btree ("version_image_id");
  CREATE INDEX "_researches_v_version_version_updated_at_idx" ON "_researches_v" USING btree ("version_updated_at");
  CREATE INDEX "_researches_v_version_version_created_at_idx" ON "_researches_v" USING btree ("version_created_at");
  CREATE INDEX "_researches_v_version_version_deleted_at_idx" ON "_researches_v" USING btree ("version_deleted_at");
  CREATE INDEX "_researches_v_version_version__status_idx" ON "_researches_v" USING btree ("version__status");
  CREATE INDEX "_researches_v_created_at_idx" ON "_researches_v" USING btree ("created_at");
  CREATE INDEX "_researches_v_updated_at_idx" ON "_researches_v" USING btree ("updated_at");
  CREATE INDEX "_researches_v_latest_idx" ON "_researches_v" USING btree ("latest");
  CREATE INDEX "_researches_v_autosave_idx" ON "_researches_v" USING btree ("autosave");
  CREATE INDEX "achievements_links_order_idx" ON "achievements_links" USING btree ("_order");
  CREATE INDEX "achievements_links_parent_id_idx" ON "achievements_links" USING btree ("_parent_id");
  CREATE INDEX "achievements_links_icon_idx" ON "achievements_links" USING btree ("icon_id");
  CREATE INDEX "achievements_tenant_idx" ON "achievements" USING btree ("tenant_id");
  CREATE INDEX "achievements_image_idx" ON "achievements" USING btree ("image_id");
  CREATE INDEX "achievements_updated_at_idx" ON "achievements" USING btree ("updated_at");
  CREATE INDEX "achievements_created_at_idx" ON "achievements" USING btree ("created_at");
  CREATE INDEX "achievements_deleted_at_idx" ON "achievements" USING btree ("deleted_at");
  CREATE INDEX "achievements__status_idx" ON "achievements" USING btree ("_status");
  CREATE INDEX "_achievements_v_version_links_order_idx" ON "_achievements_v_version_links" USING btree ("_order");
  CREATE INDEX "_achievements_v_version_links_parent_id_idx" ON "_achievements_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_achievements_v_version_links_icon_idx" ON "_achievements_v_version_links" USING btree ("icon_id");
  CREATE INDEX "_achievements_v_parent_idx" ON "_achievements_v" USING btree ("parent_id");
  CREATE INDEX "_achievements_v_version_version_tenant_idx" ON "_achievements_v" USING btree ("version_tenant_id");
  CREATE INDEX "_achievements_v_version_version_image_idx" ON "_achievements_v" USING btree ("version_image_id");
  CREATE INDEX "_achievements_v_version_version_updated_at_idx" ON "_achievements_v" USING btree ("version_updated_at");
  CREATE INDEX "_achievements_v_version_version_created_at_idx" ON "_achievements_v" USING btree ("version_created_at");
  CREATE INDEX "_achievements_v_version_version_deleted_at_idx" ON "_achievements_v" USING btree ("version_deleted_at");
  CREATE INDEX "_achievements_v_version_version__status_idx" ON "_achievements_v" USING btree ("version__status");
  CREATE INDEX "_achievements_v_created_at_idx" ON "_achievements_v" USING btree ("created_at");
  CREATE INDEX "_achievements_v_updated_at_idx" ON "_achievements_v" USING btree ("updated_at");
  CREATE INDEX "_achievements_v_latest_idx" ON "_achievements_v" USING btree ("latest");
  CREATE INDEX "_achievements_v_autosave_idx" ON "_achievements_v" USING btree ("autosave");
  CREATE INDEX "certifications_links_order_idx" ON "certifications_links" USING btree ("_order");
  CREATE INDEX "certifications_links_parent_id_idx" ON "certifications_links" USING btree ("_parent_id");
  CREATE INDEX "certifications_links_icon_idx" ON "certifications_links" USING btree ("icon_id");
  CREATE INDEX "certifications_tenant_idx" ON "certifications" USING btree ("tenant_id");
  CREATE INDEX "certifications_image_idx" ON "certifications" USING btree ("image_id");
  CREATE INDEX "certifications_updated_at_idx" ON "certifications" USING btree ("updated_at");
  CREATE INDEX "certifications_created_at_idx" ON "certifications" USING btree ("created_at");
  CREATE INDEX "certifications_deleted_at_idx" ON "certifications" USING btree ("deleted_at");
  CREATE INDEX "certifications__status_idx" ON "certifications" USING btree ("_status");
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
  CREATE INDEX "publications_links_order_idx" ON "publications_links" USING btree ("_order");
  CREATE INDEX "publications_links_parent_id_idx" ON "publications_links" USING btree ("_parent_id");
  CREATE INDEX "publications_links_icon_idx" ON "publications_links" USING btree ("icon_id");
  CREATE INDEX "publications_tenant_idx" ON "publications" USING btree ("tenant_id");
  CREATE INDEX "publications_image_idx" ON "publications" USING btree ("image_id");
  CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
  CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
  CREATE INDEX "publications_deleted_at_idx" ON "publications" USING btree ("deleted_at");
  CREATE INDEX "publications__status_idx" ON "publications" USING btree ("_status");
  CREATE INDEX "_publications_v_version_links_order_idx" ON "_publications_v_version_links" USING btree ("_order");
  CREATE INDEX "_publications_v_version_links_parent_id_idx" ON "_publications_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_publications_v_version_links_icon_idx" ON "_publications_v_version_links" USING btree ("icon_id");
  CREATE INDEX "_publications_v_parent_idx" ON "_publications_v" USING btree ("parent_id");
  CREATE INDEX "_publications_v_version_version_tenant_idx" ON "_publications_v" USING btree ("version_tenant_id");
  CREATE INDEX "_publications_v_version_version_image_idx" ON "_publications_v" USING btree ("version_image_id");
  CREATE INDEX "_publications_v_version_version_updated_at_idx" ON "_publications_v" USING btree ("version_updated_at");
  CREATE INDEX "_publications_v_version_version_created_at_idx" ON "_publications_v" USING btree ("version_created_at");
  CREATE INDEX "_publications_v_version_version_deleted_at_idx" ON "_publications_v" USING btree ("version_deleted_at");
  CREATE INDEX "_publications_v_version_version__status_idx" ON "_publications_v" USING btree ("version__status");
  CREATE INDEX "_publications_v_created_at_idx" ON "_publications_v" USING btree ("created_at");
  CREATE INDEX "_publications_v_updated_at_idx" ON "_publications_v" USING btree ("updated_at");
  CREATE INDEX "_publications_v_latest_idx" ON "_publications_v" USING btree ("latest");
  CREATE INDEX "_publications_v_autosave_idx" ON "_publications_v" USING btree ("autosave");
  CREATE INDEX "licenses_links_order_idx" ON "licenses_links" USING btree ("_order");
  CREATE INDEX "licenses_links_parent_id_idx" ON "licenses_links" USING btree ("_parent_id");
  CREATE INDEX "licenses_links_icon_idx" ON "licenses_links" USING btree ("icon_id");
  CREATE INDEX "licenses_tenant_idx" ON "licenses" USING btree ("tenant_id");
  CREATE INDEX "licenses_image_idx" ON "licenses" USING btree ("image_id");
  CREATE INDEX "licenses_updated_at_idx" ON "licenses" USING btree ("updated_at");
  CREATE INDEX "licenses_created_at_idx" ON "licenses" USING btree ("created_at");
  CREATE INDEX "licenses_deleted_at_idx" ON "licenses" USING btree ("deleted_at");
  CREATE INDEX "licenses__status_idx" ON "licenses" USING btree ("_status");
  CREATE INDEX "_licenses_v_version_links_order_idx" ON "_licenses_v_version_links" USING btree ("_order");
  CREATE INDEX "_licenses_v_version_links_parent_id_idx" ON "_licenses_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_licenses_v_version_links_icon_idx" ON "_licenses_v_version_links" USING btree ("icon_id");
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
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_blocks_date_order_idx" ON "forms_blocks_date" USING btree ("_order");
  CREATE INDEX "forms_blocks_date_parent_id_idx" ON "forms_blocks_date" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_date_path_idx" ON "forms_blocks_date" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_tenant_idx" ON "forms" USING btree ("tenant_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "forms_deleted_at_idx" ON "forms" USING btree ("deleted_at");
  CREATE INDEX "forms__status_idx" ON "forms" USING btree ("_status");
  CREATE INDEX "forms_rels_order_idx" ON "forms_rels" USING btree ("order");
  CREATE INDEX "forms_rels_parent_idx" ON "forms_rels" USING btree ("parent_id");
  CREATE INDEX "forms_rels_path_idx" ON "forms_rels" USING btree ("path");
  CREATE INDEX "forms_rels_pages_id_idx" ON "forms_rels" USING btree ("pages_id");
  CREATE INDEX "_forms_v_blocks_checkbox_order_idx" ON "_forms_v_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_checkbox_parent_id_idx" ON "_forms_v_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_checkbox_path_idx" ON "_forms_v_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "_forms_v_blocks_country_order_idx" ON "_forms_v_blocks_country" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_country_parent_id_idx" ON "_forms_v_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_country_path_idx" ON "_forms_v_blocks_country" USING btree ("_path");
  CREATE INDEX "_forms_v_blocks_email_order_idx" ON "_forms_v_blocks_email" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_email_parent_id_idx" ON "_forms_v_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_email_path_idx" ON "_forms_v_blocks_email" USING btree ("_path");
  CREATE INDEX "_forms_v_blocks_message_order_idx" ON "_forms_v_blocks_message" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_message_parent_id_idx" ON "_forms_v_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_message_path_idx" ON "_forms_v_blocks_message" USING btree ("_path");
  CREATE INDEX "_forms_v_blocks_number_order_idx" ON "_forms_v_blocks_number" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_number_parent_id_idx" ON "_forms_v_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_number_path_idx" ON "_forms_v_blocks_number" USING btree ("_path");
  CREATE INDEX "_forms_v_blocks_select_options_order_idx" ON "_forms_v_blocks_select_options" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_select_options_parent_id_idx" ON "_forms_v_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_select_order_idx" ON "_forms_v_blocks_select" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_select_parent_id_idx" ON "_forms_v_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_select_path_idx" ON "_forms_v_blocks_select" USING btree ("_path");
  CREATE INDEX "_forms_v_blocks_state_order_idx" ON "_forms_v_blocks_state" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_state_parent_id_idx" ON "_forms_v_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_state_path_idx" ON "_forms_v_blocks_state" USING btree ("_path");
  CREATE INDEX "_forms_v_blocks_text_order_idx" ON "_forms_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_text_parent_id_idx" ON "_forms_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_text_path_idx" ON "_forms_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_forms_v_blocks_textarea_order_idx" ON "_forms_v_blocks_textarea" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_textarea_parent_id_idx" ON "_forms_v_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_textarea_path_idx" ON "_forms_v_blocks_textarea" USING btree ("_path");
  CREATE INDEX "_forms_v_blocks_date_order_idx" ON "_forms_v_blocks_date" USING btree ("_order");
  CREATE INDEX "_forms_v_blocks_date_parent_id_idx" ON "_forms_v_blocks_date" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_blocks_date_path_idx" ON "_forms_v_blocks_date" USING btree ("_path");
  CREATE INDEX "_forms_v_version_emails_order_idx" ON "_forms_v_version_emails" USING btree ("_order");
  CREATE INDEX "_forms_v_version_emails_parent_id_idx" ON "_forms_v_version_emails" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_parent_idx" ON "_forms_v" USING btree ("parent_id");
  CREATE INDEX "_forms_v_version_version_tenant_idx" ON "_forms_v" USING btree ("version_tenant_id");
  CREATE INDEX "_forms_v_version_version_updated_at_idx" ON "_forms_v" USING btree ("version_updated_at");
  CREATE INDEX "_forms_v_version_version_created_at_idx" ON "_forms_v" USING btree ("version_created_at");
  CREATE INDEX "_forms_v_version_version_deleted_at_idx" ON "_forms_v" USING btree ("version_deleted_at");
  CREATE INDEX "_forms_v_version_version__status_idx" ON "_forms_v" USING btree ("version__status");
  CREATE INDEX "_forms_v_created_at_idx" ON "_forms_v" USING btree ("created_at");
  CREATE INDEX "_forms_v_updated_at_idx" ON "_forms_v" USING btree ("updated_at");
  CREATE INDEX "_forms_v_latest_idx" ON "_forms_v" USING btree ("latest");
  CREATE INDEX "_forms_v_autosave_idx" ON "_forms_v" USING btree ("autosave");
  CREATE INDEX "_forms_v_rels_order_idx" ON "_forms_v_rels" USING btree ("order");
  CREATE INDEX "_forms_v_rels_parent_idx" ON "_forms_v_rels" USING btree ("parent_id");
  CREATE INDEX "_forms_v_rels_path_idx" ON "_forms_v_rels" USING btree ("path");
  CREATE INDEX "_forms_v_rels_pages_id_idx" ON "_forms_v_rels" USING btree ("pages_id");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_tenant_idx" ON "form_submissions" USING btree ("tenant_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_icons_id_idx" ON "payload_locked_documents_rels" USING btree ("icons_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_notes_id_idx" ON "payload_locked_documents_rels" USING btree ("notes_id");
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
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
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
  DROP TABLE "icons" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "notes" CASCADE;
  DROP TABLE "_notes_v" CASCADE;
  DROP TABLE "blogs" CASCADE;
  DROP TABLE "_blogs_v" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_achievement" CASCADE;
  DROP TABLE "pages_blocks_certification" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_education" CASCADE;
  DROP TABLE "pages_blocks_experiance_experiances" CASCADE;
  DROP TABLE "pages_blocks_experiance" CASCADE;
  DROP TABLE "pages_blocks_hackathon" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_license" CASCADE;
  DROP TABLE "pages_blocks_project" CASCADE;
  DROP TABLE "pages_blocks_publication" CASCADE;
  DROP TABLE "pages_blocks_skill" CASCADE;
  DROP TABLE "pages_blocks_research" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
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
  DROP TABLE "educations" CASCADE;
  DROP TABLE "_educations_v" CASCADE;
  DROP TABLE "projects_links" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_links" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "tenants" CASCADE;
  DROP TABLE "menus_menu" CASCADE;
  DROP TABLE "menus" CASCADE;
  DROP TABLE "_menus_v_version_menu" CASCADE;
  DROP TABLE "_menus_v" CASCADE;
  DROP TABLE "socials_socials_links" CASCADE;
  DROP TABLE "socials" CASCADE;
  DROP TABLE "_socials_v_version_socials_links" CASCADE;
  DROP TABLE "_socials_v" CASCADE;
  DROP TABLE "skills" CASCADE;
  DROP TABLE "skills_rels" CASCADE;
  DROP TABLE "_skills_v" CASCADE;
  DROP TABLE "_skills_v_rels" CASCADE;
  DROP TABLE "hackathons_links" CASCADE;
  DROP TABLE "hackathons" CASCADE;
  DROP TABLE "_hackathons_v_version_links" CASCADE;
  DROP TABLE "_hackathons_v" CASCADE;
  DROP TABLE "researches_links" CASCADE;
  DROP TABLE "researches" CASCADE;
  DROP TABLE "_researches_v_version_links" CASCADE;
  DROP TABLE "_researches_v" CASCADE;
  DROP TABLE "achievements_links" CASCADE;
  DROP TABLE "achievements" CASCADE;
  DROP TABLE "_achievements_v_version_links" CASCADE;
  DROP TABLE "_achievements_v" CASCADE;
  DROP TABLE "certifications_links" CASCADE;
  DROP TABLE "certifications" CASCADE;
  DROP TABLE "_certifications_v_version_links" CASCADE;
  DROP TABLE "_certifications_v" CASCADE;
  DROP TABLE "publications_links" CASCADE;
  DROP TABLE "publications" CASCADE;
  DROP TABLE "_publications_v_version_links" CASCADE;
  DROP TABLE "_publications_v" CASCADE;
  DROP TABLE "licenses_links" CASCADE;
  DROP TABLE "licenses" CASCADE;
  DROP TABLE "_licenses_v_version_links" CASCADE;
  DROP TABLE "_licenses_v" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_date" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_rels" CASCADE;
  DROP TABLE "_forms_v_blocks_checkbox" CASCADE;
  DROP TABLE "_forms_v_blocks_country" CASCADE;
  DROP TABLE "_forms_v_blocks_email" CASCADE;
  DROP TABLE "_forms_v_blocks_message" CASCADE;
  DROP TABLE "_forms_v_blocks_number" CASCADE;
  DROP TABLE "_forms_v_blocks_select_options" CASCADE;
  DROP TABLE "_forms_v_blocks_select" CASCADE;
  DROP TABLE "_forms_v_blocks_state" CASCADE;
  DROP TABLE "_forms_v_blocks_text" CASCADE;
  DROP TABLE "_forms_v_blocks_textarea" CASCADE;
  DROP TABLE "_forms_v_blocks_date" CASCADE;
  DROP TABLE "_forms_v_version_emails" CASCADE;
  DROP TABLE "_forms_v" CASCADE;
  DROP TABLE "_forms_v_rels" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_users_tenants_roles";
  DROP TYPE "public"."enum_users_field";
  DROP TYPE "public"."enum_icons_icon_specs_type";
  DROP TYPE "public"."enum_notes_status";
  DROP TYPE "public"."enum__notes_v_version_status";
  DROP TYPE "public"."enum_blogs_status";
  DROP TYPE "public"."enum__blogs_v_version_status";
  DROP TYPE "public"."enum_pages_page_mode_mode";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_page_mode_mode";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_educations_status";
  DROP TYPE "public"."enum__educations_v_version_status";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_menus_status";
  DROP TYPE "public"."enum__menus_v_version_status";
  DROP TYPE "public"."enum_socials_status";
  DROP TYPE "public"."enum__socials_v_version_status";
  DROP TYPE "public"."enum_skills_status";
  DROP TYPE "public"."enum__skills_v_version_status";
  DROP TYPE "public"."enum_hackathons_status";
  DROP TYPE "public"."enum__hackathons_v_version_status";
  DROP TYPE "public"."enum_researches_status";
  DROP TYPE "public"."enum__researches_v_version_status";
  DROP TYPE "public"."enum_achievements_status";
  DROP TYPE "public"."enum__achievements_v_version_status";
  DROP TYPE "public"."enum_certifications_status";
  DROP TYPE "public"."enum__certifications_v_version_status";
  DROP TYPE "public"."enum_publications_status";
  DROP TYPE "public"."enum__publications_v_version_status";
  DROP TYPE "public"."enum_licenses_status";
  DROP TYPE "public"."enum__licenses_v_version_status";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_forms_redirect_type";
  DROP TYPE "public"."enum_forms_status";
  DROP TYPE "public"."enum__forms_v_version_confirmation_type";
  DROP TYPE "public"."enum__forms_v_version_redirect_type";
  DROP TYPE "public"."enum__forms_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
