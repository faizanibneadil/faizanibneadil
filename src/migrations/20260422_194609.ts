import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "themes" RENAME TO "shelves";
  ALTER TABLE "portfolio_settings" RENAME COLUMN "theme_id" TO "shelf_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "themes_id" TO "shelves_id";
  ALTER TABLE "portfolio_settings" DROP CONSTRAINT "portfolio_settings_theme_id_themes_id_fk";
  
  ALTER TABLE "shelves" DROP CONSTRAINT "themes_thumbnail_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_themes_fk";
  
  DROP INDEX "portfolio_settings_theme_idx";
  DROP INDEX "themes_thumbnail_idx";
  DROP INDEX "themes_updated_at_idx";
  DROP INDEX "themes_created_at_idx";
  DROP INDEX "themes_deleted_at_idx";
  DROP INDEX "payload_locked_documents_rels_themes_id_idx";
  ALTER TABLE "portfolio_settings" ADD CONSTRAINT "portfolio_settings_shelf_id_shelves_id_fk" FOREIGN KEY ("shelf_id") REFERENCES "public"."shelves"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shelves" ADD CONSTRAINT "shelves_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shelves_fk" FOREIGN KEY ("shelves_id") REFERENCES "public"."shelves"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "portfolio_settings_shelf_idx" ON "portfolio_settings" USING btree ("shelf_id");
  CREATE INDEX "shelves_thumbnail_idx" ON "shelves" USING btree ("thumbnail_id");
  CREATE INDEX "shelves_updated_at_idx" ON "shelves" USING btree ("updated_at");
  CREATE INDEX "shelves_created_at_idx" ON "shelves" USING btree ("created_at");
  CREATE INDEX "shelves_deleted_at_idx" ON "shelves" USING btree ("deleted_at");
  CREATE INDEX "payload_locked_documents_rels_shelves_id_idx" ON "payload_locked_documents_rels" USING btree ("shelves_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "shelves" RENAME TO "themes";
  ALTER TABLE "portfolio_settings" RENAME COLUMN "shelf_id" TO "theme_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "shelves_id" TO "themes_id";
  ALTER TABLE "portfolio_settings" DROP CONSTRAINT "portfolio_settings_shelf_id_shelves_id_fk";
  
  ALTER TABLE "themes" DROP CONSTRAINT "shelves_thumbnail_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_shelves_fk";
  
  DROP INDEX "portfolio_settings_shelf_idx";
  DROP INDEX "shelves_thumbnail_idx";
  DROP INDEX "shelves_updated_at_idx";
  DROP INDEX "shelves_created_at_idx";
  DROP INDEX "shelves_deleted_at_idx";
  DROP INDEX "payload_locked_documents_rels_shelves_id_idx";
  ALTER TABLE "portfolio_settings" ADD CONSTRAINT "portfolio_settings_theme_id_themes_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."themes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "themes" ADD CONSTRAINT "themes_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_themes_fk" FOREIGN KEY ("themes_id") REFERENCES "public"."themes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "portfolio_settings_theme_idx" ON "portfolio_settings" USING btree ("theme_id");
  CREATE INDEX "themes_thumbnail_idx" ON "themes" USING btree ("thumbnail_id");
  CREATE INDEX "themes_updated_at_idx" ON "themes" USING btree ("updated_at");
  CREATE INDEX "themes_created_at_idx" ON "themes" USING btree ("created_at");
  CREATE INDEX "themes_deleted_at_idx" ON "themes" USING btree ("deleted_at");
  CREATE INDEX "payload_locked_documents_rels_themes_id_idx" ON "payload_locked_documents_rels" USING btree ("themes_id");`)
}
