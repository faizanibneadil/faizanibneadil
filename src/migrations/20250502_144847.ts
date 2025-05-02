import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_socials_socials_links_type" AS ENUM('facebook', 'instagram', 'twitter', 'youtube', 'github', 'linkedin');
  CREATE TABLE IF NOT EXISTS "menu_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"page_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "socials_socials_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_socials_socials_links_type",
  	"link" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "menu_menu" ADD CONSTRAINT "menu_menu_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "menu_menu" ADD CONSTRAINT "menu_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "socials_socials_links" ADD CONSTRAINT "socials_socials_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "menu_menu_order_idx" ON "menu_menu" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "menu_menu_parent_id_idx" ON "menu_menu" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "menu_menu_page_idx" ON "menu_menu" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "socials_socials_links_order_idx" ON "socials_socials_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "socials_socials_links_parent_id_idx" ON "socials_socials_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "menu_menu" CASCADE;
  DROP TABLE "menu" CASCADE;
  DROP TABLE "socials_socials_links" CASCADE;
  DROP TABLE "socials" CASCADE;
  DROP TYPE "public"."enum_socials_socials_links_type";`)
}
