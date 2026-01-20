import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "portfolio_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_page_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio_settings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tenants_id" integer
  );
  
  ALTER TABLE "pages" ADD COLUMN "is_root_page" boolean DEFAULT false NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "portfolio_settings_id" integer;
  ALTER TABLE "portfolio_settings" ADD CONSTRAINT "portfolio_settings_root_page_id_pages_id_fk" FOREIGN KEY ("root_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_settings_rels" ADD CONSTRAINT "portfolio_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolio_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_settings_rels" ADD CONSTRAINT "portfolio_settings_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "portfolio_settings_root_page_idx" ON "portfolio_settings" USING btree ("root_page_id");
  CREATE INDEX "portfolio_settings_updated_at_idx" ON "portfolio_settings" USING btree ("updated_at");
  CREATE INDEX "portfolio_settings_created_at_idx" ON "portfolio_settings" USING btree ("created_at");
  CREATE INDEX "portfolio_settings_rels_order_idx" ON "portfolio_settings_rels" USING btree ("order");
  CREATE INDEX "portfolio_settings_rels_parent_idx" ON "portfolio_settings_rels" USING btree ("parent_id");
  CREATE INDEX "portfolio_settings_rels_path_idx" ON "portfolio_settings_rels" USING btree ("path");
  CREATE UNIQUE INDEX "portfolio_settings_rels_tenants_id_idx" ON "portfolio_settings_rels" USING btree ("tenants_id","path");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolio_settings_fk" FOREIGN KEY ("portfolio_settings_id") REFERENCES "public"."portfolio_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_portfolio_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("portfolio_settings_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "portfolio_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_settings_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "portfolio_settings" CASCADE;
  DROP TABLE "portfolio_settings_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_portfolio_settings_fk";
  
  DROP INDEX "payload_locked_documents_rels_portfolio_settings_id_idx";
  ALTER TABLE "pages" DROP COLUMN "is_root_page";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "portfolio_settings_id";`)
}
