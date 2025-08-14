import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "educations" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_educations_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  CREATE INDEX "educations_deleted_at_idx" ON "educations" USING btree ("deleted_at");
  CREATE INDEX "_educations_v_version_version_deleted_at_idx" ON "_educations_v" USING btree ("version_deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "educations_deleted_at_idx";
  DROP INDEX "_educations_v_version_version_deleted_at_idx";
  ALTER TABLE "educations" DROP COLUMN "deleted_at";
  ALTER TABLE "_educations_v" DROP COLUMN "version_deleted_at";`)
}
