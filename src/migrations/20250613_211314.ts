import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "type" varchar;
  ALTER TABLE "media" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "media" ADD COLUMN "type" varchar;
  ALTER TABLE "notes" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "notes" ADD COLUMN "type" varchar;
  ALTER TABLE "blogs" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "type" varchar;
  ALTER TABLE "pages" ADD COLUMN "type" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_type" varchar;
  ALTER TABLE "projects" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "projects" ADD COLUMN "type" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "_projects_v" ADD COLUMN "version_type" varchar;
  ALTER TABLE "tenants" ADD COLUMN "type" varchar;
  ALTER TABLE "menu" ADD COLUMN "type" varchar;
  ALTER TABLE "socials" ADD COLUMN "type" varchar;
  DO $$ BEGIN
   ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "notes" ADD CONSTRAINT "notes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs" ADD CONSTRAINT "blogs_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects" ADD CONSTRAINT "projects_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "notes_tenant_idx" ON "notes" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "blogs_tenant_idx" ON "blogs" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "projects_tenant_idx" ON "projects" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_version_tenant_idx" ON "_projects_v" USING btree ("version_tenant_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP CONSTRAINT "media_tenant_id_tenants_id_fk";
  
  ALTER TABLE "notes" DROP CONSTRAINT "notes_tenant_id_tenants_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_tenant_id_tenants_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_projects_v" DROP CONSTRAINT "_projects_v_version_tenant_id_tenants_id_fk";
  
  DROP INDEX IF EXISTS "media_tenant_idx";
  DROP INDEX IF EXISTS "notes_tenant_idx";
  DROP INDEX IF EXISTS "blogs_tenant_idx";
  DROP INDEX IF EXISTS "projects_tenant_idx";
  DROP INDEX IF EXISTS "_projects_v_version_version_tenant_idx";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "tenant_id";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "notes" DROP COLUMN IF EXISTS "tenant_id";
  ALTER TABLE "notes" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "blogs" DROP COLUMN IF EXISTS "tenant_id";
  ALTER TABLE "blogs" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_type";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "tenant_id";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_tenant_id";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_type";
  ALTER TABLE "tenants" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "menu" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "socials" DROP COLUMN IF EXISTS "type";`)
}
