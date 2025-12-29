import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "integration" ADD COLUMN "enable_tawk_bubble" boolean DEFAULT false;
  ALTER TABLE "integration" DROP COLUMN "enable_t_a_w_k_bubble";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "integration" ADD COLUMN "enable_t_a_w_k_bubble" boolean;
  ALTER TABLE "integration" DROP COLUMN "enable_tawk_bubble";`)
}
