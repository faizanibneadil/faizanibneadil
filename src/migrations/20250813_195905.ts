import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "certifications" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_certifications_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  CREATE INDEX "certifications_deleted_at_idx" ON "certifications" USING btree ("deleted_at");
  CREATE INDEX "_certifications_v_version_version_deleted_at_idx" ON "_certifications_v" USING btree ("version_deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "certifications_deleted_at_idx";
  DROP INDEX "_certifications_v_version_version_deleted_at_idx";
  ALTER TABLE "certifications" DROP COLUMN "deleted_at";
  ALTER TABLE "_certifications_v" DROP COLUMN "version_deleted_at";`)
}
