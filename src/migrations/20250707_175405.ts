import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_tenants_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_tenants_v" CASCADE;
  DROP INDEX "tenants__status_idx";
  ALTER TABLE "tenants" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "tenants" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "tenants" DROP COLUMN "_status";
  DROP TYPE "public"."enum_tenants_status";
  DROP TYPE "public"."enum__tenants_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tenants_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tenants_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_tenants_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_domain" varchar,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__tenants_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "tenants" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "tenants" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "tenants" ADD COLUMN "_status" "enum_tenants_status" DEFAULT 'draft';
  ALTER TABLE "_tenants_v" ADD CONSTRAINT "_tenants_v_parent_id_tenants_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_tenants_v_parent_idx" ON "_tenants_v" USING btree ("parent_id");
  CREATE INDEX "_tenants_v_version_version_slug_idx" ON "_tenants_v" USING btree ("version_slug");
  CREATE INDEX "_tenants_v_version_version_updated_at_idx" ON "_tenants_v" USING btree ("version_updated_at");
  CREATE INDEX "_tenants_v_version_version_created_at_idx" ON "_tenants_v" USING btree ("version_created_at");
  CREATE INDEX "_tenants_v_version_version__status_idx" ON "_tenants_v" USING btree ("version__status");
  CREATE INDEX "_tenants_v_created_at_idx" ON "_tenants_v" USING btree ("created_at");
  CREATE INDEX "_tenants_v_updated_at_idx" ON "_tenants_v" USING btree ("updated_at");
  CREATE INDEX "_tenants_v_latest_idx" ON "_tenants_v" USING btree ("latest");
  CREATE INDEX "_tenants_v_autosave_idx" ON "_tenants_v" USING btree ("autosave");
  CREATE INDEX "tenants__status_idx" ON "tenants" USING btree ("_status");`)
}
