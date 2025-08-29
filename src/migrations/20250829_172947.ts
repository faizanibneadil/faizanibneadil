import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_notes_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_notes_v" CASCADE;
  DROP INDEX "notes__status_idx";
  ALTER TABLE "notes" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "notes" DROP COLUMN "_status";
  DROP TYPE "public"."enum_notes_status";
  DROP TYPE "public"."enum__notes_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_notes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__notes_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_notes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__notes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "notes" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "notes" ADD COLUMN "_status" "enum_notes_status" DEFAULT 'draft';
  ALTER TABLE "_notes_v" ADD CONSTRAINT "_notes_v_parent_id_notes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."notes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_notes_v" ADD CONSTRAINT "_notes_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_notes_v_parent_idx" ON "_notes_v" USING btree ("parent_id");
  CREATE INDEX "_notes_v_version_version_tenant_idx" ON "_notes_v" USING btree ("version_tenant_id");
  CREATE INDEX "_notes_v_version_version_updated_at_idx" ON "_notes_v" USING btree ("version_updated_at");
  CREATE INDEX "_notes_v_version_version_created_at_idx" ON "_notes_v" USING btree ("version_created_at");
  CREATE INDEX "_notes_v_version_version_deleted_at_idx" ON "_notes_v" USING btree ("version_deleted_at");
  CREATE INDEX "_notes_v_version_version__status_idx" ON "_notes_v" USING btree ("version__status");
  CREATE INDEX "_notes_v_created_at_idx" ON "_notes_v" USING btree ("created_at");
  CREATE INDEX "_notes_v_updated_at_idx" ON "_notes_v" USING btree ("updated_at");
  CREATE INDEX "_notes_v_latest_idx" ON "_notes_v" USING btree ("latest");
  CREATE INDEX "_notes_v_autosave_idx" ON "_notes_v" USING btree ("autosave");
  CREATE INDEX "notes__status_idx" ON "notes" USING btree ("_status");`)
}
