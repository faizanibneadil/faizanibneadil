import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_socials_socials_links_social_type" AS ENUM('facebook', 'instagram', 'twitter', 'youtube', 'github', 'linkedin');
  ALTER TABLE "socials_socials_links" ADD COLUMN "social_type" "enum_socials_socials_links_social_type";
  ALTER TABLE "socials_socials_links" DROP COLUMN IF EXISTS "type";
  DROP TYPE "public"."enum_socials_socials_links_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_socials_socials_links_type" AS ENUM('facebook', 'instagram', 'twitter', 'youtube', 'github', 'linkedin');
  ALTER TABLE "socials_socials_links" ADD COLUMN "type" "enum_socials_socials_links_type";
  ALTER TABLE "socials_socials_links" DROP COLUMN IF EXISTS "social_type";
  DROP TYPE "public"."enum_socials_socials_links_social_type";`)
}
