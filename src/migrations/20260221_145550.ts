import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_mcp_api_keys_tenant_idx" ON "payload_mcp_api_keys" USING btree ("tenant_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" DROP CONSTRAINT "payload_mcp_api_keys_tenant_id_tenants_id_fk";
  
  DROP INDEX "payload_mcp_api_keys_tenant_idx";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "tenant_id";`)
}
