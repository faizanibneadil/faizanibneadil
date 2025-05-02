import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_me" ADD COLUMN "name_on_resume" varchar;
  ALTER TABLE "pages_blocks_me" ADD COLUMN "about_me" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_me" DROP COLUMN IF EXISTS "name_on_resume";
  ALTER TABLE "pages_blocks_me" DROP COLUMN IF EXISTS "about_me";`)
}
