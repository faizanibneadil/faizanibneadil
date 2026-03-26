import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_mcp_api_keys" DISABLE ROW LEVEL SECURITY;
    DROP TABLE IF EXISTS "payload_mcp_api_keys" CASCADE;
    
    -- Constraint drop karte waqt IF EXISTS lagaya hai taake error na aye
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_payload_mcp_api_keys_fk";
    ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT IF EXISTS "payload_preferences_rels_payload_mcp_api_keys_fk";
    
    -- Index drop karte waqt bhi IF EXISTS behtar hai
    DROP INDEX IF EXISTS "payload_locked_documents_rels_payload_mcp_api_keys_id_idx";
    DROP INDEX IF EXISTS "payload_preferences_rels_payload_mcp_api_keys_id_idx";
    
    -- Column drop karne se pehle check karein ke column exist karta hai
    DO $$ 
    BEGIN 
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payload_locked_documents_rels' AND column_name='payload_mcp_api_keys_id') THEN
            ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_mcp_api_keys_id";
        END IF;
        
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payload_preferences_rels' AND column_name='payload_mcp_api_keys_id') THEN
            ALTER TABLE "payload_preferences_rels" DROP COLUMN "payload_mcp_api_keys_id";
        END IF;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Down migration ko wese hi rehne dein jese pehle thi
  await db.execute(sql`
   CREATE TABLE "payload_mcp_api_keys" (
    "id" serial PRIMARY KEY NOT NULL,
    "tenant_id" integer,
    "user_id" integer NOT NULL,
    "label" varchar,
    "description" varchar,
    "blogs_find" boolean DEFAULT false,
    "blogs_create" boolean DEFAULT false,
    "blogs_update" boolean DEFAULT false,
    "blogs_delete" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "enable_a_p_i_key" boolean,
    "api_key" varchar,
    "api_key_index" varchar
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_mcp_api_keys_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "payload_mcp_api_keys_id" integer;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_mcp_api_keys_tenant_idx" ON "payload_mcp_api_keys" USING btree ("tenant_id");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");`)
}