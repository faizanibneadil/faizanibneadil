import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications_links" DROP CONSTRAINT "publications_links_icon_id_icons_id_fk";
  
  DROP INDEX "publications_links_icon_idx";
  ALTER TABLE "publications_links" ADD COLUMN "iconify" varchar;
  ALTER TABLE "publications_links" DROP COLUMN "icon_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications_links" ADD COLUMN "icon_id" integer NOT NULL;
  ALTER TABLE "publications_links" ADD CONSTRAINT "publications_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "publications_links_icon_idx" ON "publications_links" USING btree ("icon_id");
  ALTER TABLE "publications_links" DROP COLUMN "iconify";`)
}
