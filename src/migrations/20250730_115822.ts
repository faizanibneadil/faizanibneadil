import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "icons" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "icons" ADD CONSTRAINT "icons_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "icons_tenant_idx" ON "icons" USING btree ("tenant_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "icons" DROP CONSTRAINT "icons_tenant_id_tenants_id_fk";
  
  DROP INDEX "icons_tenant_idx";
  ALTER TABLE "icons" DROP COLUMN "tenant_id";`)
}
