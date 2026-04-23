import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blogs_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__blogs_v_version_resources_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_gallery_resources_type" AS ENUM('internal', 'external');
  CREATE TABLE "blogs_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_blogs_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "_blogs_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__blogs_v_version_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "gallery_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_gallery_resources_type" DEFAULT 'internal',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar
  );
  
  ALTER TABLE "blogs_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_blogs_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "gallery_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "blogs_resources" ADD CONSTRAINT "blogs_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_version_resources" ADD CONSTRAINT "_blogs_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_resources" ADD CONSTRAINT "gallery_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blogs_resources_order_idx" ON "blogs_resources" USING btree ("_order");
  CREATE INDEX "blogs_resources_parent_id_idx" ON "blogs_resources" USING btree ("_parent_id");
  CREATE INDEX "_blogs_v_version_resources_order_idx" ON "_blogs_v_version_resources" USING btree ("_order");
  CREATE INDEX "_blogs_v_version_resources_parent_id_idx" ON "_blogs_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "gallery_resources_order_idx" ON "gallery_resources" USING btree ("_order");
  CREATE INDEX "gallery_resources_parent_id_idx" ON "gallery_resources" USING btree ("_parent_id");
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blogs_rels_pages_id_idx" ON "blogs_rels" USING btree ("pages_id");
  CREATE INDEX "_blogs_v_rels_pages_id_idx" ON "_blogs_v_rels" USING btree ("pages_id");
  CREATE INDEX "gallery_rels_pages_id_idx" ON "gallery_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blogs_v_version_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_resources" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "blogs_resources" CASCADE;
  DROP TABLE "_blogs_v_version_resources" CASCADE;
  DROP TABLE "gallery_resources" CASCADE;
  ALTER TABLE "blogs_rels" DROP CONSTRAINT "blogs_rels_pages_fk";
  
  ALTER TABLE "_blogs_v_rels" DROP CONSTRAINT "_blogs_v_rels_pages_fk";
  
  ALTER TABLE "gallery_rels" DROP CONSTRAINT "gallery_rels_pages_fk";
  
  DROP INDEX "blogs_rels_pages_id_idx";
  DROP INDEX "_blogs_v_rels_pages_id_idx";
  DROP INDEX "gallery_rels_pages_id_idx";
  ALTER TABLE "blogs_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_blogs_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "gallery_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_blogs_resources_type";
  DROP TYPE "public"."enum__blogs_v_version_resources_type";
  DROP TYPE "public"."enum_gallery_resources_type";`)
}
