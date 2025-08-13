import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Add columns if they don't exist
    ALTER TABLE "forms" ADD COLUMN IF NOT EXISTS "tenant_id" integer;
    ALTER TABLE "form_submissions" ADD COLUMN IF NOT EXISTS "tenant_id" integer;
    
    -- Add foreign key constraints if they don't exist
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'forms_tenant_id_tenants_id_fk'
      ) THEN
        ALTER TABLE "forms" ADD CONSTRAINT "forms_tenant_id_tenants_id_fk" 
        FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
      END IF;
      
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'form_submissions_tenant_id_tenants_id_fk'
      ) THEN
        ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_tenant_id_tenants_id_fk" 
        FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END
    $$;
    
    -- Create indexes if they don't exist
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'forms_tenant_idx'
      ) THEN
        CREATE INDEX "forms_tenant_idx" ON "forms" USING btree ("tenant_id");
      END IF;
      
      IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'form_submissions_tenant_idx'
      ) THEN
        CREATE INDEX "form_submissions_tenant_idx" ON "form_submissions" USING btree ("tenant_id");
      END IF;
    END
    $$;
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop constraints if they exist
    ALTER TABLE "forms" DROP CONSTRAINT IF EXISTS "forms_tenant_id_tenants_id_fk";
    ALTER TABLE "form_submissions" DROP CONSTRAINT IF EXISTS "form_submissions_tenant_id_tenants_id_fk";
    
    -- Drop indexes if they exist
    DROP INDEX IF EXISTS "forms_tenant_idx";
    DROP INDEX IF EXISTS "form_submissions_tenant_idx";
    
    -- Drop columns if they exist
    ALTER TABLE "forms" DROP COLUMN IF EXISTS "tenant_id";
    ALTER TABLE "form_submissions" DROP COLUMN IF EXISTS "tenant_id";
  `);
}