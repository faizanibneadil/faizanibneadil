import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First check and create enum types if they don't exist
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_forms_confirmation_type') THEN
        CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_forms_redirect_type') THEN
        CREATE TYPE "public"."enum_forms_redirect_type" AS ENUM('reference', 'custom');
      END IF;
    END
    $$;
  `);

  // Create tables with IF NOT EXISTS
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "required" boolean,
      "default_value" boolean,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "required" boolean,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "required" boolean,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "message" jsonb,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "default_value" numeric,
      "required" boolean,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "value" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "default_value" varchar,
      "placeholder" varchar,
      "required" boolean,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "required" boolean,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "default_value" varchar,
      "required" boolean,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "default_value" varchar,
      "required" boolean,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "forms_blocks_date" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "label" varchar,
      "width" numeric,
      "required" boolean,
      "default_value" timestamp(3) with time zone,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "forms_emails" (
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

    CREATE TABLE IF NOT EXISTS "forms" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "submit_button_label" varchar,
      "confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
      "confirmation_message" jsonb,
      "redirect_type" "enum_forms_redirect_type" DEFAULT 'reference',
      "redirect_url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "forms_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "pages_id" integer
    );

    CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "field" varchar NOT NULL,
      "value" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "form_submissions" (
      "id" serial PRIMARY KEY NOT NULL,
      "form_id" integer NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `);

  // Add columns if they don't exist
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "forms_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "form_submissions_id" integer;
  `);

  // Add constraints with IF NOT EXISTS
  await db.execute(sql`
    DO $$
    BEGIN
      -- Check and add foreign key constraints
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'forms_blocks_checkbox_parent_id_fk'
      ) THEN
        ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" 
        FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
      END IF;

      -- Repeat similar checks for all other constraints...
      -- [All other foreign key constraints would go here]
      
      -- Check and add indexes
      IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'forms_blocks_checkbox_order_idx'
      ) THEN
        CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
      END IF;

      -- [All other index creations would go here]
    END
    $$;
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop constraints if they exist
    ALTER TABLE "forms_blocks_checkbox" DROP CONSTRAINT IF EXISTS "forms_blocks_checkbox_parent_id_fk";
    -- [Drop all other constraints...]

    -- Drop indexes if they exist
    DROP INDEX IF EXISTS "forms_blocks_checkbox_order_idx";
    -- [Drop all other indexes...]

    -- Drop columns if they exist
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "forms_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "form_submissions_id";

    -- Drop tables if they exist
    DROP TABLE IF EXISTS "forms_blocks_checkbox" CASCADE;
    DROP TABLE IF EXISTS "forms_blocks_country" CASCADE;
    -- [Drop all other tables...]

    -- Drop types if they exist
    DROP TYPE IF EXISTS "public"."enum_forms_confirmation_type";
    DROP TYPE IF EXISTS "public"."enum_forms_redirect_type";
  `);
}