import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "forms" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_forms_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  CREATE INDEX "forms_deleted_at_idx" ON "forms" USING btree ("deleted_at");
  CREATE INDEX "_forms_v_version_version_deleted_at_idx" ON "_forms_v" USING btree ("version_deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "forms_deleted_at_idx";
  DROP INDEX "_forms_v_version_version_deleted_at_idx";
  ALTER TABLE "forms" DROP COLUMN "deleted_at";
  ALTER TABLE "_forms_v" DROP COLUMN "version_deleted_at";`)
}
