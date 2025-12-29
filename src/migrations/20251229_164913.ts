import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Disable RLS only if table exists
    DO $$ 
    BEGIN 
      IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'icons') THEN
        ALTER TABLE "icons" DISABLE ROW LEVEL SECURITY;
      END IF;
    END $$;

    -- Drop table and cascade
    DROP TABLE IF EXISTS "icons" CASCADE;

    -- Drop constraint safely
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_icons_fk";
    
    -- Drop index and column safely
    DROP INDEX IF EXISTS "payload_locked_documents_rels_icons_id_idx";
    
    DO $$ 
    BEGIN 
      IF EXISTS (SELECT FROM information_schema.columns WHERE table_name='payload_locked_documents_rels' AND column_name='icons_id') THEN
        ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "icons_id";
      END IF;
    END $$;

    -- Drop enum type safely
    DROP TYPE IF EXISTS "public"."enum_icons_icon_specs_type";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Re-create the enum if it doesn't exist
    DO $$ 
    BEGIN 
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_icons_icon_specs_type') THEN
        CREATE TYPE "public"."enum_icons_icon_specs_type" AS ENUM('svg', 'html');
      END IF;
    END $$;

    CREATE TABLE IF NOT EXISTS "icons" (
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
    
    -- Add column if not exists
    DO $$ 
    BEGIN 
      IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='payload_locked_documents_rels' AND column_name='icons_id') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "icons_id" integer;
      END IF;
    END $$;

    -- Add constraints and indexes safely
    ALTER TABLE "icons" DROP CONSTRAINT IF EXISTS "icons_icon_specs_svg_id_media_id_fk";
    ALTER TABLE "icons" ADD CONSTRAINT "icons_icon_specs_svg_id_media_id_fk" FOREIGN KEY ("icon_specs_svg_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    
    CREATE INDEX IF NOT EXISTS "icons_icon_specs_icon_specs_svg_idx" ON "icons" USING btree ("icon_specs_svg_id");
    CREATE INDEX IF NOT EXISTS "icons_slug_idx" ON "icons" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "icons_updated_at_idx" ON "icons" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "icons_created_at_idx" ON "icons" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "icons_deleted_at_idx" ON "icons" USING btree ("deleted_at");
    
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_icons_fk";
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_icons_fk" FOREIGN KEY ("icons_id") REFERENCES "public"."icons"("id") ON DELETE cascade ON UPDATE no action;
    
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_icons_id_idx" ON "payload_locked_documents_rels" USING btree ("icons_id");
  `)
}