import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_projects_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  CREATE INDEX "projects_deleted_at_idx" ON "projects" USING btree ("deleted_at");
  CREATE INDEX "_projects_v_version_version_deleted_at_idx" ON "_projects_v" USING btree ("version_deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "projects_deleted_at_idx";
  DROP INDEX "_projects_v_version_version_deleted_at_idx";
  ALTER TABLE "projects" DROP COLUMN "deleted_at";
  ALTER TABLE "_projects_v" DROP COLUMN "version_deleted_at";`)
}
