import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "menus_menu" DROP CONSTRAINT "menus_menu_icon_id_icons_id_fk";
  
  DROP INDEX "menus_menu_icon_idx";
  ALTER TABLE "menus_menu" ADD COLUMN "iconify" varchar;
  ALTER TABLE "menus_menu" DROP COLUMN "icon_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "menus_menu" ADD COLUMN "icon_id" integer NOT NULL;
  ALTER TABLE "menus_menu" ADD CONSTRAINT "menus_menu_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "menus_menu_icon_idx" ON "menus_menu" USING btree ("icon_id");
  ALTER TABLE "menus_menu" DROP COLUMN "iconify";`)
}
