import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "tenants_domain_idx";
  DROP INDEX "users_username_idx";
  DROP INDEX "tenants_slug_idx";
  CREATE INDEX "users_username_idx" ON "users" USING btree ("username");
  CREATE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "users_username_idx";
  DROP INDEX "tenants_slug_idx";
  CREATE UNIQUE INDEX "tenants_domain_idx" ON "tenants" USING btree ("domain");
  CREATE UNIQUE INDEX "users_username_idx" ON "users" USING btree ("username");
  CREATE UNIQUE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug");`)
}
