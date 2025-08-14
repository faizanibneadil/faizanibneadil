import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  CREATE INDEX "users_deleted_at_idx" ON "users" USING btree ("deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "users_deleted_at_idx";
  ALTER TABLE "users" DROP COLUMN "deleted_at";`)
}
