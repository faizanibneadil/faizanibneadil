import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_experiences_job_type" AS ENUM('on-site', 'remote', 'hybrid');
  ALTER TABLE "experiences" ADD COLUMN "job_type" "enum_experiences_job_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "experiences" DROP COLUMN "job_type";
  DROP TYPE "public"."enum_experiences_job_type";`)
}
