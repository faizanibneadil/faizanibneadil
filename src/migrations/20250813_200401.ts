import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "licenses" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_licenses_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  CREATE INDEX "licenses_deleted_at_idx" ON "licenses" USING btree ("deleted_at");
  CREATE INDEX "_licenses_v_version_version_deleted_at_idx" ON "_licenses_v" USING btree ("version_deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "licenses_deleted_at_idx";
  DROP INDEX "_licenses_v_version_version_deleted_at_idx";
  ALTER TABLE "licenses" DROP COLUMN "deleted_at";
  ALTER TABLE "_licenses_v" DROP COLUMN "version_deleted_at";`)
}
