import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First, handle duplicate slugs in each table before creating unique indexes
  const tables = ['icons', 'blogs', 'pages', 'projects', 'skills', 'categories'];

  for (const table of tables) {
    // Check for duplicate slugs and handle them
    const duplicates = await db.execute<{ slug: string, count: number }>(sql`
      SELECT slug, COUNT(*) as count 
      FROM ${sql.identifier(table)} 
      WHERE slug IS NOT NULL 
      GROUP BY slug 
      HAVING COUNT(*) > 1
    `);

    if (duplicates.rows.length > 0) {
      console.warn(`Found duplicate slugs in ${table} table. Handling duplicates...`);
      
      for (const duplicate of duplicates.rows) {
        // For each duplicate slug, update the duplicates to make them unique
        const rowsToUpdate = await db.execute<{ id: number, slug: string }>(sql`
          SELECT id, slug 
          FROM ${sql.identifier(table)} 
          WHERE slug = ${duplicate.slug} 
          ORDER BY id
        `);

        // Keep the first row as is, update the rest with a suffix
        for (let i = 1; i < rowsToUpdate.rows.length; i++) {
          const row = rowsToUpdate.rows[i];
          const newSlug = `${row.slug}-${i}`;
          await db.execute(sql`
            UPDATE ${sql.identifier(table)} 
            SET slug = ${newSlug} 
            WHERE id = ${row.id}
          `);
        }
      }
    }
  }

  // Now drop existing indexes and create unique indexes
  await db.execute(sql`
    DROP INDEX IF EXISTS "icons_slug_idx";
    DROP INDEX IF EXISTS "blogs_slug_idx";
    DROP INDEX IF EXISTS "pages_slug_idx";
    DROP INDEX IF EXISTS "projects_slug_idx";
    DROP INDEX IF EXISTS "skills_slug_idx";
    DROP INDEX IF EXISTS "categories_slug_idx";
  `);

  // Create unique indexes
  await db.execute(sql`
    CREATE UNIQUE INDEX "icons_slug_idx" ON "icons" USING btree ("slug") WHERE "slug" IS NOT NULL;
    CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug") WHERE "slug" IS NOT NULL;
    CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug") WHERE "slug" IS NOT NULL;
    CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug") WHERE "slug" IS NOT NULL;
    CREATE UNIQUE INDEX "skills_slug_idx" ON "skills" USING btree ("slug") WHERE "slug" IS NOT NULL;
    CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug") WHERE "slug" IS NOT NULL;
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "icons_slug_idx";
    DROP INDEX IF EXISTS "blogs_slug_idx";
    DROP INDEX IF EXISTS "pages_slug_idx";
    DROP INDEX IF EXISTS "projects_slug_idx";
    DROP INDEX IF EXISTS "skills_slug_idx";
    DROP INDEX IF EXISTS "categories_slug_idx";
  `);

  await db.execute(sql`
    CREATE INDEX "icons_slug_idx" ON "icons" USING btree ("slug");
    CREATE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
    CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
    CREATE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
    CREATE INDEX "skills_slug_idx" ON "skills" USING btree ("slug");
    CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  `);
}