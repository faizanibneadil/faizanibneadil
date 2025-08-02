import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "configurations_slug" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_configurations_slug" SET DATA TYPE varchar;
  DROP TYPE "public"."enum_pages_configurations_slug";
  DROP TYPE "public"."enum__pages_v_version_configurations_slug";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_configurations_slug" AS ENUM();
  CREATE TYPE "public"."enum__pages_v_version_configurations_slug" AS ENUM();
  ALTER TABLE "pages" ALTER COLUMN "configurations_slug" SET DATA TYPE "public"."enum_pages_configurations_slug" USING "configurations_slug"::"public"."enum_pages_configurations_slug";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_configurations_slug" SET DATA TYPE "public"."enum__pages_v_version_configurations_slug" USING "version_configurations_slug"::"public"."enum__pages_v_version_configurations_slug";`)
}
