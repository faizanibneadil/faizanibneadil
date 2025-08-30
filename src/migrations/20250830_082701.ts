import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Check if profile_id column already exists in users table
  const profileIdExists = await db.execute(sql`
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'profile_id'
  `);

  // Only add the column if it doesn't exist
  if (profileIdExists.rows.length === 0) {
    await db.execute(sql`
      ALTER TABLE "users" ADD COLUMN "profile_id" integer;
    `);
  }

  // Check if slug column already exists in blogs table
  const slugExists = await db.execute(sql`
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'slug'
  `);

  // Only add the column if it doesn't exist
  if (slugExists.rows.length === 0) {
    await db.execute(sql`
      ALTER TABLE "blogs" ADD COLUMN "slug" varchar;
    `);
  }

  // Check if slug_lock column already exists in blogs table
  const slugLockExists = await db.execute(sql`
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'slug_lock'
  `);

  // Only add the column if it doesn't exist
  if (slugLockExists.rows.length === 0) {
    await db.execute(sql`
      ALTER TABLE "blogs" ADD COLUMN "slug_lock" boolean DEFAULT true;
    `);
  }

  // Check if foreign key constraint already exists
  const fkExists = await db.execute(sql`
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'users_profile_id_media_id_fk' 
    AND table_name = 'users'
  `);

  // Only add the constraint if it doesn't exist
  if (fkExists.rows.length === 0) {
    await db.execute(sql`
      ALTER TABLE "users" ADD CONSTRAINT "users_profile_id_media_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    `);
  }

  // Check if indexes already exist and create them if they don't
  const userProfileIndexExists = await db.execute(sql`
    SELECT 1 FROM pg_indexes WHERE indexname = 'users_profile_idx'
  `);

  if (userProfileIndexExists.rows.length === 0) {
    await db.execute(sql`
      CREATE INDEX "users_profile_idx" ON "users" USING btree ("profile_id");
    `);
  }

  const blogSlugIndexExists = await db.execute(sql`
    SELECT 1 FROM pg_indexes WHERE indexname = 'blogs_slug_idx'
  `);

  if (blogSlugIndexExists.rows.length === 0) {
    await db.execute(sql`
      CREATE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
    `);
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_profile_id_media_id_fk";
  
  DROP INDEX IF EXISTS "users_profile_idx";
  DROP INDEX IF EXISTS "blogs_slug_idx";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "profile_id";
  ALTER TABLE "blogs" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "blogs" DROP COLUMN IF EXISTS "slug_lock";`)
}