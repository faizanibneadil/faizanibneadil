import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_projects_v_version_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_projects_v_version_links" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP INDEX "projects__status_idx";
  ALTER TABLE "projects_links" ALTER COLUMN "icon_id" SET NOT NULL;
  ALTER TABLE "projects_links" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "projects_links" ALTER COLUMN "link" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "thumbnail_id" SET NOT NULL;
  ALTER TABLE "projects" DROP COLUMN "_status";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
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
  
  ALTER TABLE "projects_links" ALTER COLUMN "icon_id" DROP NOT NULL;
  ALTER TABLE "projects_links" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "projects_links" ALTER COLUMN "link" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "thumbnail_id" DROP NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "_status" "enum_projects_status" DEFAULT 'draft';
  ALTER TABLE "_projects_v_version_links" ADD CONSTRAINT "_projects_v_version_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links" ADD CONSTRAINT "_projects_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");`)
}
