import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First check if the enum types exist before creating them
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_page_mode_mode') THEN
        CREATE TYPE "public"."enum_pages_page_mode_mode" AS ENUM('layout', 'collection');
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_version_page_mode_mode') THEN
        CREATE TYPE "public"."enum__pages_v_version_page_mode_mode" AS ENUM('layout', 'collection');
      END IF;
    END
    $$;

    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_mode_mode" "enum_pages_page_mode_mode" DEFAULT 'layout';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_page_mode_mode" "enum__pages_v_version_page_mode_mode" DEFAULT 'layout';
    
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "mode";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_mode";
    
    DROP TYPE IF EXISTS "public"."enum_pages_mode";
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_mode";
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_mode') THEN
        CREATE TYPE "public"."enum_pages_mode" AS ENUM('layout', 'collection');
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_version_mode') THEN
        CREATE TYPE "public"."enum__pages_v_version_mode" AS ENUM('layout', 'collection');
      END IF;
    END
    $$;

    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "mode" "enum_pages_mode" DEFAULT 'layout';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_mode" "enum__pages_v_version_mode" DEFAULT 'layout';
    
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_mode_mode";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_page_mode_mode";
    
    DROP TYPE IF EXISTS "public"."enum_pages_page_mode_mode";
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_page_mode_mode";
  `);
}