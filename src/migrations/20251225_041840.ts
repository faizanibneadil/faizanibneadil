import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ 
    BEGIN 
      -- Check if column exists before adding to prevent crashes
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='forms' AND column_name='submit_button_width') THEN
        ALTER TABLE "forms" ADD COLUMN "submit_button_width" numeric DEFAULT 100;
      END IF;

      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='forms' AND column_name='submit_button_loading_text') THEN
        ALTER TABLE "forms" ADD COLUMN "submit_button_loading_text" varchar DEFAULT 'Loading...';
      END IF;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "forms" DROP COLUMN IF EXISTS "submit_button_width";
    ALTER TABLE "forms" DROP COLUMN IF EXISTS "submit_button_loading_text";
  `)
}