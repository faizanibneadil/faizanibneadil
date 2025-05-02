import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_socials_socials_links_social_type" RENAME TO "enum_socials_socials_links_kind";
  ALTER TABLE "socials_socials_links" RENAME COLUMN "social_type" TO "kind";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_socials_socials_links_kind" RENAME TO "enum_socials_socials_links_social_type";
  ALTER TABLE "socials_socials_links" RENAME COLUMN "kind" TO "social_type";`)
}
