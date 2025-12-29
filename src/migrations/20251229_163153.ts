import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "integration" ADD COLUMN "enable_chat_button" boolean DEFAULT false;
  ALTER TABLE "integration" ADD COLUMN "tawk_property_id" varchar;
  ALTER TABLE "integration" ADD COLUMN "enable_t_a_w_k_bubble" boolean;
  ALTER TABLE "integration" DROP COLUMN "tawl_property_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "integration" ADD COLUMN "tawl_property_id" varchar;
  ALTER TABLE "integration" DROP COLUMN "enable_chat_button";
  ALTER TABLE "integration" DROP COLUMN "tawk_property_id";
  ALTER TABLE "integration" DROP COLUMN "enable_t_a_w_k_bubble";`)
}
