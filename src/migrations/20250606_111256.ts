import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "content" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN IF EXISTS "content";`)
}
