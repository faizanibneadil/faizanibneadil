import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First, check if the description column already exists
  const descriptionExists = await db.execute(sql`
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'description'
  `);

  // Only add the column if it doesn't exist
  if (descriptionExists.rows.length === 0) {
    await db.execute(sql`
      ALTER TABLE "blogs" ADD COLUMN "description" jsonb;
    `);
  }

  // Check if featured_image_id has null values and update them if needed
  const nullFeaturedImages = await db.execute<{ count: number }>(sql`
    SELECT COUNT(*) as count FROM "blogs" WHERE "featured_image_id" IS NULL
  `);

  // If there are null values, you need to handle them before setting NOT NULL
  // For example, you could set a default value or update null values
  if (nullFeaturedImages.rows.length > 0 && nullFeaturedImages.rows[0].count > 0) {
    // You need to decide how to handle null values
    // Option 1: Set a default value (if appropriate for your use case)
    // await db.execute(sql`UPDATE "blogs" SET "featured_image_id" = [some_default_id] WHERE "featured_image_id" IS NULL`);
    
    // Option 2: If you can't set a default, you might need to skip the NOT NULL constraint
    // or handle this differently based on your application requirements
    console.warn('Warning: blogs table contains null values in featured_image_id column. NOT NULL constraint cannot be applied.');
  } else {
    // Only set NOT NULL if there are no null values
    await db.execute(sql`
      ALTER TABLE "blogs" ALTER COLUMN "featured_image_id" SET NOT NULL;
    `);
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" ALTER COLUMN "featured_image_id" DROP NOT NULL;
  `);
  
  // Check if description column exists before trying to drop it
  const descriptionExists = await db.execute(sql`
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'description'
  `);

  if (descriptionExists.rows.length > 0) {
    await db.execute(sql`
      ALTER TABLE "blogs" DROP COLUMN "description";
    `);
  }
}