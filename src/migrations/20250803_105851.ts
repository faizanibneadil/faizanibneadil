import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "skills" ADD COLUMN "techstack_icon_id" integer;
  ALTER TABLE "_skills_v" ADD COLUMN "version_techstack_icon_id" integer;
  ALTER TABLE "skills" ADD CONSTRAINT "skills_techstack_icon_id_icons_id_fk" FOREIGN KEY ("techstack_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_version_techstack_icon_id_icons_id_fk" FOREIGN KEY ("version_techstack_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "skills_techstack_techstack_icon_idx" ON "skills" USING btree ("techstack_icon_id");
  CREATE INDEX "_skills_v_version_techstack_version_techstack_icon_idx" ON "_skills_v" USING btree ("version_techstack_icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "skills" DROP CONSTRAINT "skills_techstack_icon_id_icons_id_fk";
  
  ALTER TABLE "_skills_v" DROP CONSTRAINT "_skills_v_version_techstack_icon_id_icons_id_fk";
  
  DROP INDEX "skills_techstack_techstack_icon_idx";
  DROP INDEX "_skills_v_version_techstack_version_techstack_icon_idx";
  ALTER TABLE "skills" DROP COLUMN "techstack_icon_id";
  ALTER TABLE "_skills_v" DROP COLUMN "version_techstack_icon_id";`)
}
