import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "skills" DROP CONSTRAINT "skills_techstack_icon_id_icons_id_fk";
  
  DROP INDEX "skills_techstack_techstack_icon_idx";
  ALTER TABLE "skills" ADD COLUMN "techstack_iconify" varchar;
  ALTER TABLE "skills" DROP COLUMN "techstack_icon_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "skills" ADD COLUMN "techstack_icon_id" integer;
  ALTER TABLE "skills" ADD CONSTRAINT "skills_techstack_icon_id_icons_id_fk" FOREIGN KEY ("techstack_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "skills_techstack_techstack_icon_idx" ON "skills" USING btree ("techstack_icon_id");
  ALTER TABLE "skills" DROP COLUMN "techstack_iconify";`)
}
