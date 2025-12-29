import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "socials_socials_links" DROP CONSTRAINT "socials_socials_links_icon_id_icons_id_fk";
  
  DROP INDEX "socials_socials_links_icon_idx";
  ALTER TABLE "socials_socials_links" ADD COLUMN "iconify" varchar;
  ALTER TABLE "socials_socials_links" DROP COLUMN "icon_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "socials_socials_links" ADD COLUMN "icon_id" integer NOT NULL;
  ALTER TABLE "socials_socials_links" ADD CONSTRAINT "socials_socials_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "socials_socials_links_icon_idx" ON "socials_socials_links" USING btree ("icon_id");
  ALTER TABLE "socials_socials_links" DROP COLUMN "iconify";`)
}
