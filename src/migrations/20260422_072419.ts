import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL;
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "users_email_idx";
  ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;`)
}
