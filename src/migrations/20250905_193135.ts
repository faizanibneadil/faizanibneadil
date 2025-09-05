import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" RENAME COLUMN "description" TO "detailed_overview";
  ALTER TABLE "projects" ADD COLUMN "overview" jsonb;
  ALTER TABLE "projects" DROP COLUMN "visit_u_r_l";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "description" jsonb;
  ALTER TABLE "projects" ADD COLUMN "visit_u_r_l" varchar;
  ALTER TABLE "projects" DROP COLUMN "overview";
  ALTER TABLE "projects" DROP COLUMN "detailed_overview";`)
}
