import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "researches_links" DROP CONSTRAINT "researches_links_icon_id_icons_id_fk";
  
  DROP INDEX "researches_links_icon_idx";
  ALTER TABLE "researches_links" ADD COLUMN "iconify" varchar;
  ALTER TABLE "researches_links" DROP COLUMN "icon_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "researches_links" ADD COLUMN "icon_id" integer NOT NULL;
  ALTER TABLE "researches_links" ADD CONSTRAINT "researches_links_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "researches_links_icon_idx" ON "researches_links" USING btree ("icon_id");
  ALTER TABLE "researches_links" DROP COLUMN "iconify";`)
}
