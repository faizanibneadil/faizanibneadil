import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hackathons_links" DROP CONSTRAINT "hackathons_links_icon_id_icons_id_fk";
  
  DROP INDEX "hackathons_links_icon_idx";
  ALTER TABLE "hackathons_links" ADD COLUMN "iconify" varchar;
  ALTER TABLE "hackathons_links" DROP COLUMN "icon_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hackathons_links" ADD COLUMN "icon_id" integer NOT NULL;
  ALTER TABLE "hackathons_links" ADD CONSTRAINT "hackathons_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "hackathons_links_icon_idx" ON "hackathons_links" USING btree ("icon_id");
  ALTER TABLE "hackathons_links" DROP COLUMN "iconify";`)
}
