import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "menu" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "menu" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "menu" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "menu" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "socials" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "socials" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "socials" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "socials" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "menu_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "socials_id" integer;
  ALTER TABLE "menu" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "socials" ADD COLUMN "tenant_id" integer;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_socials_fk" FOREIGN KEY ("socials_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "menu" ADD CONSTRAINT "menu_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "socials" ADD CONSTRAINT "socials_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_menu_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_socials_id_idx" ON "payload_locked_documents_rels" USING btree ("socials_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "menu_tenant_idx" ON "menu" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "menu_updated_at_idx" ON "menu" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "menu_created_at_idx" ON "menu" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "socials_tenant_idx" ON "socials" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "socials_updated_at_idx" ON "socials" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "socials_created_at_idx" ON "socials" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "menu" DROP CONSTRAINT "menu_tenant_id_tenants_id_fk";
  
  ALTER TABLE "socials" DROP CONSTRAINT "socials_tenant_id_tenants_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_menu_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_socials_fk";
  
  DROP INDEX IF EXISTS "menu_tenant_idx";
  DROP INDEX IF EXISTS "menu_updated_at_idx";
  DROP INDEX IF EXISTS "menu_created_at_idx";
  DROP INDEX IF EXISTS "socials_tenant_idx";
  DROP INDEX IF EXISTS "socials_updated_at_idx";
  DROP INDEX IF EXISTS "socials_created_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_menu_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_socials_id_idx";
  ALTER TABLE "menu" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "menu" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "menu" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "menu" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "socials" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "socials" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "socials" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "socials" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "menu" DROP COLUMN IF EXISTS "tenant_id";
  ALTER TABLE "socials" DROP COLUMN IF EXISTS "tenant_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "menu_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "socials_id";`)
}
