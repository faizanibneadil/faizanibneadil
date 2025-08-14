import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "languages" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "_languages_v" DISABLE ROW LEVEL SECURITY;
    DROP TABLE IF EXISTS "languages" CASCADE;
    DROP TABLE IF EXISTS "_languages_v" CASCADE;
    
    -- Modified part to handle non-existing constraint
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_languages_fk";
    
    DROP INDEX IF EXISTS "payload_locked_documents_rels_languages_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "languages_id";
    DROP TYPE IF EXISTS "public"."enum_languages_status";
    DROP TYPE IF EXISTS "public"."enum__languages_v_version_status";
  `)
}

// Down function remains same as before
export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_languages_status" AS ENUM('draft', 'published');
   CREATE TYPE "public"."enum__languages_v_version_status" AS ENUM('draft', 'published');
   CREATE TABLE "languages" (
    "id" serial PRIMARY KEY NOT NULL,
    "tenant_id" integer,
    "title" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_languages_status" DEFAULT 'draft'
   );
   
   CREATE TABLE "_languages_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_tenant_id" integer,
    "version_title" varchar,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__languages_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
   );
   
   ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "languages_id" integer;
   ALTER TABLE "languages" ADD CONSTRAINT "languages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
   ALTER TABLE "_languages_v" ADD CONSTRAINT "_languages_v_parent_id_languages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."languages"("id") ON DELETE set null ON UPDATE no action;
   ALTER TABLE "_languages_v" ADD CONSTRAINT "_languages_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
   CREATE INDEX "languages_tenant_idx" ON "languages" USING btree ("tenant_id");
   CREATE INDEX "languages_updated_at_idx" ON "languages" USING btree ("updated_at");
   CREATE INDEX "languages_created_at_idx" ON "languages" USING btree ("created_at");
   CREATE INDEX "languages__status_idx" ON "languages" USING btree ("_status");
   CREATE INDEX "_languages_v_parent_idx" ON "_languages_v" USING btree ("parent_id");
   CREATE INDEX "_languages_v_version_version_tenant_idx" ON "_languages_v" USING btree ("version_tenant_id");
   CREATE INDEX "_languages_v_version_version_updated_at_idx" ON "_languages_v" USING btree ("version_updated_at");
   CREATE INDEX "_languages_v_version_version_created_at_idx" ON "_languages_v" USING btree ("version_created_at");
   CREATE INDEX "_languages_v_version_version__status_idx" ON "_languages_v" USING btree ("version__status");
   CREATE INDEX "_languages_v_created_at_idx" ON "_languages_v" USING btree ("created_at");
   CREATE INDEX "_languages_v_updated_at_idx" ON "_languages_v" USING btree ("updated_at");
   CREATE INDEX "_languages_v_latest_idx" ON "_languages_v" USING btree ("latest");
   CREATE INDEX "_languages_v_autosave_idx" ON "_languages_v" USING btree ("autosave");
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_languages_fk" FOREIGN KEY ("languages_id") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE no action;
   CREATE INDEX "payload_locked_documents_rels_languages_id_idx" ON "payload_locked_documents_rels" USING btree ("languages_id");
  `)
}