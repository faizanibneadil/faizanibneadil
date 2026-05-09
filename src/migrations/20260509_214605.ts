import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users"
    ADD COLUMN IF NOT EXISTS "on_boarding_progress_enable_portfolio_info" boolean DEFAULT false;

    ALTER TABLE "users"
    ADD COLUMN IF NOT EXISTS "on_boarding_progress_enable_industry" boolean DEFAULT false;

    ALTER TABLE "users"
    ADD COLUMN IF NOT EXISTS "on_boarding_progress_enable_system_redirects" boolean DEFAULT false;

    ALTER TABLE "users"
    ADD COLUMN IF NOT EXISTS "on_boarding_progress_enable_home_page" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users"
    DROP COLUMN IF EXISTS "on_boarding_progress_enable_portfolio_info";

    ALTER TABLE "users"
    DROP COLUMN IF EXISTS "on_boarding_progress_enable_industry";

    ALTER TABLE "users"
    DROP COLUMN IF EXISTS "on_boarding_progress_enable_system_redirects";

    ALTER TABLE "users"
    DROP COLUMN IF EXISTS "on_boarding_progress_enable_home_page";
  `)
}