import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tenants" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  CREATE INDEX "tenants_deleted_at_idx" ON "tenants" USING btree ("deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "tenants_deleted_at_idx";
  ALTER TABLE "tenants" DROP COLUMN "deleted_at";`)
}
