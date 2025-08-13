import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_publications_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  CREATE INDEX "publications_deleted_at_idx" ON "publications" USING btree ("deleted_at");
  CREATE INDEX "_publications_v_version_version_deleted_at_idx" ON "_publications_v" USING btree ("version_deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "publications_deleted_at_idx";
  DROP INDEX "_publications_v_version_version_deleted_at_idx";
  ALTER TABLE "publications" DROP COLUMN "deleted_at";
  ALTER TABLE "_publications_v" DROP COLUMN "version_deleted_at";`)
}
