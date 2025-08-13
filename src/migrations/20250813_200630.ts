import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "notes" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_notes_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  CREATE INDEX "notes_deleted_at_idx" ON "notes" USING btree ("deleted_at");
  CREATE INDEX "_notes_v_version_version_deleted_at_idx" ON "_notes_v" USING btree ("version_deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "notes_deleted_at_idx";
  DROP INDEX "_notes_v_version_version_deleted_at_idx";
  ALTER TABLE "notes" DROP COLUMN "deleted_at";
  ALTER TABLE "_notes_v" DROP COLUMN "version_deleted_at";`)
}
