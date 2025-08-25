import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "users_field_idx";
  ALTER TABLE "users" ADD COLUMN "category_id" integer;
  ALTER TABLE "users" ADD CONSTRAINT "users_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_category_idx" ON "users" USING btree ("category_id");
  ALTER TABLE "users" DROP COLUMN "field";
  DROP TYPE "public"."enum_users_field";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_field" AS ENUM('information_technology', 'healthcare', 'engineering', 'finance', 'marketing', 'education', 'management');
  ALTER TABLE "users" DROP CONSTRAINT "users_category_id_categories_id_fk";
  
  DROP INDEX "users_category_idx";
  ALTER TABLE "users" ADD COLUMN "field" "enum_users_field";
  CREATE INDEX "users_field_idx" ON "users" USING btree ("field");
  ALTER TABLE "users" DROP COLUMN "category_id";`)
}
