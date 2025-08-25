import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Check if slug column exists in categories table
  const categoriesSlugExists = await db.execute(sql`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'categories' AND column_name = 'slug'
  `)
  
  // Check if slug column exists in _categories_v table
  const versionSlugExists = await db.execute(sql`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = '_categories_v' AND column_name = 'version_slug'
  `)

  // Only add columns if they don't exist
  if (categoriesSlugExists.rows.length === 0) {
    await db.execute(sql`
      ALTER TABLE "categories" ADD COLUMN "slug" varchar;
      ALTER TABLE "categories" ADD COLUMN "slug_lock" boolean DEFAULT true;
    `)
  }

  if (versionSlugExists.rows.length === 0) {
    await db.execute(sql`
      ALTER TABLE "_categories_v" ADD COLUMN "version_slug" varchar;
      ALTER TABLE "_categories_v" ADD COLUMN "version_slug_lock" boolean DEFAULT true;
    `)
  }

  // Create indexes (they will fail gracefully if they exist)
  try {
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
      CREATE INDEX IF NOT EXISTS "_categories_v_version_version_slug_idx" ON "_categories_v" USING btree ("version_slug");
    `)
  } catch (error) {
    // Indexes might already exist, but we can continue
    console.log('Index creation might have failed (they may already exist)')
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "categories_slug_idx";
    DROP INDEX IF EXISTS "_categories_v_version_version_slug_idx";
    ALTER TABLE "categories" DROP COLUMN IF EXISTS "slug";
    ALTER TABLE "categories" DROP COLUMN IF EXISTS "slug_lock";
    ALTER TABLE "_categories_v" DROP COLUMN IF EXISTS "version_slug";
    ALTER TABLE "_categories_v" DROP COLUMN IF EXISTS "version_slug_lock";
  `)
}