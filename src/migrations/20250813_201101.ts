import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "researches" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_researches_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  CREATE INDEX "researches_deleted_at_idx" ON "researches" USING btree ("deleted_at");
  CREATE INDEX "_researches_v_version_version_deleted_at_idx" ON "_researches_v" USING btree ("version_deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "researches_deleted_at_idx";
  DROP INDEX "_researches_v_version_version_deleted_at_idx";
  ALTER TABLE "researches" DROP COLUMN "deleted_at";
  ALTER TABLE "_researches_v" DROP COLUMN "version_deleted_at";`)
}
