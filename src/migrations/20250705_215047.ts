import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "educations" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_educations_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educations_v" ADD CONSTRAINT "_educations_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "educations_tenant_idx" ON "educations" USING btree ("tenant_id");
  CREATE INDEX "_educations_v_version_version_tenant_idx" ON "_educations_v" USING btree ("version_tenant_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "educations" DROP CONSTRAINT "educations_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_educations_v" DROP CONSTRAINT "_educations_v_version_tenant_id_tenants_id_fk";
  
  DROP INDEX "educations_tenant_idx";
  DROP INDEX "_educations_v_version_version_tenant_idx";
  ALTER TABLE "educations" DROP COLUMN "tenant_id";
  ALTER TABLE "_educations_v" DROP COLUMN "version_tenant_id";`)
}
