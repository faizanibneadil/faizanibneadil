import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_me" ADD COLUMN "profile_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_me" ADD CONSTRAINT "pages_blocks_me_profile_id_media_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_me_profile_idx" ON "pages_blocks_me" USING btree ("profile_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_me" DROP CONSTRAINT "pages_blocks_me_profile_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_me_profile_idx";
  ALTER TABLE "pages_blocks_me" DROP COLUMN IF EXISTS "profile_id";`)
}
