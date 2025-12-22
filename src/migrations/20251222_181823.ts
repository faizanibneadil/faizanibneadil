import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- 1. Create Type safely
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_integration_chat_bubble_type') THEN
        CREATE TYPE "public"."enum_integration_chat_bubble_type" AS ENUM('tawk');
    END IF;
  END $$;

  -- 2. Create integration table safely
  CREATE TABLE IF NOT EXISTS "integration" (
    "id" serial PRIMARY KEY NOT NULL,
    "tenant_id" integer,
    "chat_bubble_type" "enum_integration_chat_bubble_type" DEFAULT 'tawk',
    "tawl_property_id" varchar NOT NULL,
    "tawk_widget_id" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  -- 3. Add columns safely to existing tables
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='experiences' AND column_name='tenant_id') THEN
        ALTER TABLE "experiences" ADD COLUMN "tenant_id" integer;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payload_locked_documents_rels' AND column_name='integration_id') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "integration_id" integer;
    END IF;
  END $$;

  -- 4. Constraints and Indexes
  ALTER TABLE "integration" DROP CONSTRAINT IF EXISTS "integration_tenant_id_tenants_id_fk";
  ALTER TABLE "integration" ADD CONSTRAINT "integration_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "integration_tenant_idx" ON "integration" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "integration_updated_at_idx" ON "integration" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "integration_created_at_idx" ON "integration" USING btree ("created_at");
  
  ALTER TABLE "experiences" DROP CONSTRAINT IF EXISTS "experiences_tenant_id_tenants_id_fk";
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_integration_fk";
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_integration_fk" FOREIGN KEY ("integration_id") REFERENCES "public"."integration"("id") ON DELETE cascade ON UPDATE no action;
  
  CREATE INDEX IF NOT EXISTS "experiences_tenant_idx" ON "experiences" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_integration_id_idx" ON "payload_locked_documents_rels" USING btree ("integration_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  -- Disable RLS and Drop table
  ALTER TABLE IF EXISTS "integration" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "integration" CASCADE;
  
  -- Drop specific constraints
  ALTER TABLE IF EXISTS "experiences" DROP CONSTRAINT IF EXISTS "experiences_tenant_id_tenants_id_fk";
  ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_integration_fk";
  
  -- Drop indexes
  DROP INDEX IF EXISTS "experiences_tenant_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_integration_id_idx";
  
  -- Drop columns
  ALTER TABLE IF EXISTS "experiences" DROP COLUMN IF EXISTS "tenant_id";
  ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP COLUMN IF EXISTS "integration_id";
  
  -- Drop type
  DROP TYPE IF EXISTS "public"."enum_integration_chat_bubble_type";
  `)
}