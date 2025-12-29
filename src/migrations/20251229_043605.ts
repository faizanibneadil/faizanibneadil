import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "licenses_links" DROP CONSTRAINT "licenses_links_icon_id_icons_id_fk";
  
  DROP INDEX "licenses_links_icon_idx";
  ALTER TABLE "licenses_links" ADD COLUMN "iconify" varchar;
  ALTER TABLE "licenses_links" DROP COLUMN "icon_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "licenses_links" ADD COLUMN "icon_id" integer NOT NULL;
  ALTER TABLE "licenses_links" ADD CONSTRAINT "licenses_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "licenses_links_icon_idx" ON "licenses_links" USING btree ("icon_id");
  ALTER TABLE "licenses_links" DROP COLUMN "iconify";`)
}
