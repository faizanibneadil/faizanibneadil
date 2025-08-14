import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_blogs_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  CREATE INDEX "blogs_deleted_at_idx" ON "blogs" USING btree ("deleted_at");
  CREATE INDEX "_blogs_v_version_version_deleted_at_idx" ON "_blogs_v" USING btree ("version_deleted_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "blogs_deleted_at_idx";
  DROP INDEX "_blogs_v_version_version_deleted_at_idx";
  ALTER TABLE "blogs" DROP COLUMN "deleted_at";
  ALTER TABLE "_blogs_v" DROP COLUMN "version_deleted_at";`)
}
