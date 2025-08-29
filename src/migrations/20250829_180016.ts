import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First, update any null values in the title column
  await db.execute(sql`
    UPDATE "skills" SET "title" = 'Untitled Skill' WHERE "title" IS NULL;
  `);
  await db.execute(sql`
   ALTER TABLE "_skills_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_skills_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_skills_v" CASCADE;
  DROP TABLE "_skills_v_rels" CASCADE;
  DROP INDEX "skills__status_idx";
  ALTER TABLE "skills" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "skills" DROP COLUMN "_status";
  DROP TYPE "public"."enum_skills_status";
  DROP TYPE "public"."enum__skills_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_skills_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__skills_v_version_status" AS ENUM('draft', 'published');
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
  
  ALTER TABLE "skills" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "skills" ADD COLUMN "_status" "enum_skills_status" DEFAULT 'draft';
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_parent_id_skills_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."skills"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_version_techstack_icon_id_icons_id_fk" FOREIGN KEY ("version_techstack_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v_rels" ADD CONSTRAINT "_skills_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_skills_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_skills_v_rels" ADD CONSTRAINT "_skills_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "skills__status_idx" ON "skills" USING btree ("_status");`)
}
