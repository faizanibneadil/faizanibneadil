import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tenants" ALTER COLUMN "domain" DROP NOT NULL;
  ALTER TABLE "tenants" ADD COLUMN "allow_public_read" boolean DEFAULT false;
  CREATE INDEX IF NOT EXISTS "tenants_slug_idx" ON "tenants" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "tenants_allow_public_read_idx" ON "tenants" USING btree ("allow_public_read");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "tenants_slug_idx";
  DROP INDEX IF EXISTS "tenants_allow_public_read_idx";
  ALTER TABLE "tenants" ALTER COLUMN "domain" SET NOT NULL;
  ALTER TABLE "tenants" DROP COLUMN IF EXISTS "allow_public_read";`)
}
