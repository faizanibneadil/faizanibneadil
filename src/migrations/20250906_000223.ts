import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" RENAME TO "industries";
  ALTER TABLE "users" RENAME COLUMN "category_id" TO "industry_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "categories_id" TO "industries_id";
  ALTER TABLE "users" DROP CONSTRAINT "users_category_id_categories_id_fk";
  
  ALTER TABLE "industries" DROP CONSTRAINT "categories_meta_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  DROP INDEX "users_category_idx";
  DROP INDEX "categories_slug_idx";
  DROP INDEX "categories_meta_meta_image_idx";
  DROP INDEX "categories_updated_at_idx";
  DROP INDEX "categories_created_at_idx";
  DROP INDEX "categories_deleted_at_idx";
  DROP INDEX "payload_locked_documents_rels_categories_id_idx";
  ALTER TABLE "users" ADD CONSTRAINT "users_industry_id_industries_id_fk" FOREIGN KEY ("industry_id") REFERENCES "public"."industries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_industry_idx" ON "users" USING btree ("industry_id");
  CREATE INDEX "industries_slug_idx" ON "industries" USING btree ("slug");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "industries_deleted_at_idx" ON "industries" USING btree ("deleted_at");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  ALTER TABLE "industries" DROP COLUMN "meta_title";
  ALTER TABLE "industries" DROP COLUMN "meta_description";
  ALTER TABLE "industries" DROP COLUMN "meta_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "industries" RENAME TO "categories";
  ALTER TABLE "users" RENAME COLUMN "industry_id" TO "category_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "industries_id" TO "categories_id";
  ALTER TABLE "users" DROP CONSTRAINT "users_industry_id_industries_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_industries_fk";
  
  DROP INDEX "users_industry_idx";
  DROP INDEX "industries_slug_idx";
  DROP INDEX "industries_updated_at_idx";
  DROP INDEX "industries_created_at_idx";
  DROP INDEX "industries_deleted_at_idx";
  DROP INDEX "payload_locked_documents_rels_industries_id_idx";
  ALTER TABLE "categories" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "categories" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "users" ADD CONSTRAINT "users_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_category_idx" ON "users" USING btree ("category_id");
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_meta_meta_image_idx" ON "categories" USING btree ("meta_image_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories_deleted_at_idx" ON "categories" USING btree ("deleted_at");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");`)
}
