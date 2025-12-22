import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- Check if type exists before creating
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_experiences_employment_type') THEN
        CREATE TYPE "public"."enum_experiences_employment_type" AS ENUM('full-time', 'part-time', 'contract', 'freelance', 'internship');
    END IF;
  END $$;

  CREATE TABLE IF NOT EXISTS "experiences" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "employment_type" "enum_experiences_employment_type",
    "website" varchar,
    "start" timestamp(3) with time zone,
    "end" timestamp(3) with time zone,
    "company" varchar,
    "location" varchar,
    "logo_id" integer,
    "description" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "experiences_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "skills_id" integer
  );
  
  -- Use DO blocks for columns to avoid "already exists" errors if partially migrated
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='skills_rels' AND column_name='experiences_id') THEN
        ALTER TABLE "skills_rels" ADD COLUMN "experiences_id" integer;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payload_locked_documents_rels' AND column_name='experiences_id') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "experiences_id" integer;
    END IF;
  END $$;

  ALTER TABLE "experiences" DROP CONSTRAINT IF EXISTS "experiences_logo_id_media_id_fk";
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  
  ALTER TABLE "experiences_rels" DROP CONSTRAINT IF EXISTS "experiences_rels_parent_fk";
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  
  ALTER TABLE "experiences_rels" DROP CONSTRAINT IF EXISTS "experiences_rels_skills_fk";
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  
  CREATE INDEX IF NOT EXISTS "experiences_logo_idx" ON "experiences" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "experiences_rels_order_idx" ON "experiences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "experiences_rels_parent_idx" ON "experiences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "experiences_rels_path_idx" ON "experiences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "experiences_rels_skills_id_idx" ON "experiences_rels" USING btree ("skills_id");
  
  ALTER TABLE "skills_rels" DROP CONSTRAINT IF EXISTS "skills_rels_experiences_fk";
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_experiences_fk";
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  
  CREATE INDEX IF NOT EXISTS "skills_rels_experiences_id_idx" ON "skills_rels" USING btree ("experiences_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "experiences" CASCADE;
  DROP TABLE IF EXISTS "experiences_rels" CASCADE;
  
  -- Remove columns if they exist
  ALTER TABLE "skills_rels" DROP COLUMN IF EXISTS "experiences_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "experiences_id";
  
  DROP TYPE IF EXISTS "public"."enum_experiences_employment_type";
  `)
}