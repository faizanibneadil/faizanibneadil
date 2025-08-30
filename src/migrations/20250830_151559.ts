import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // List of all tables that need meta columns
  const tables = [
    'notes', 'blogs', 'pages', 'educations', 'projects', 'hackathons', 
    'researches', 'achievements', 'certifications', 'publications', 
    'licenses', 'categories'
  ];

  // Add meta columns to each table if they don't exist
  for (const table of tables) {
    // Check if meta_title column exists
    const metaTitleExists = await db.execute(sql`
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = ${table} AND column_name = 'meta_title'
    `);

    if (metaTitleExists.rows.length === 0) {
      await db.execute(sql`ALTER TABLE ${sql.identifier(table)} ADD COLUMN "meta_title" varchar;`);
    }

    // Check if meta_description column exists
    const metaDescriptionExists = await db.execute(sql`
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = ${table} AND column_name = 'meta_description'
    `);

    if (metaDescriptionExists.rows.length === 0) {
      await db.execute(sql`ALTER TABLE ${sql.identifier(table)} ADD COLUMN "meta_description" varchar;`);
    }

    // Check if meta_image_id column exists
    const metaImageIdExists = await db.execute(sql`
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = ${table} AND column_name = 'meta_image_id'
    `);

    if (metaImageIdExists.rows.length === 0) {
      await db.execute(sql`ALTER TABLE ${sql.identifier(table)} ADD COLUMN "meta_image_id" integer;`);
    }
  }

  // Add foreign key constraints if they don't exist
  for (const table of tables) {
    const fkExists = await db.execute(sql`
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = ${`${table}_meta_image_id_media_id_fk`} 
      AND table_name = ${table}
    `);

    if (fkExists.rows.length === 0) {
      await db.execute(sql`
        ALTER TABLE ${sql.identifier(table)} 
        ADD CONSTRAINT ${sql.identifier(`${table}_meta_image_id_media_id_fk`)} 
        FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") 
        ON DELETE set null ON UPDATE no action;
      `);
    }
  }

  // Create indexes if they don't exist
  for (const table of tables) {
    const indexExists = await db.execute(sql`
      SELECT 1 FROM pg_indexes WHERE indexname = ${`${table}_meta_meta_image_idx`}
    `);

    if (indexExists.rows.length === 0) {
      await db.execute(sql`
        CREATE INDEX ${sql.identifier(`${table}_meta_meta_image_idx`)} 
        ON ${sql.identifier(table)} USING btree ("meta_image_id");
      `);
    }
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  const tables = [
    'notes', 'blogs', 'pages', 'educations', 'projects', 'hackathons', 
    'researches', 'achievements', 'certifications', 'publications', 
    'licenses', 'categories'
  ];

  // Drop constraints
  for (const table of tables) {
    await db.execute(sql`
      ALTER TABLE ${sql.identifier(table)} 
      DROP CONSTRAINT IF EXISTS ${sql.identifier(`${table}_meta_image_id_media_id_fk`)};
    `);
  }

  // Drop indexes
  for (const table of tables) {
    await db.execute(sql`
      DROP INDEX IF EXISTS ${sql.identifier(`${table}_meta_meta_image_idx`)};
    `);
  }

  // Drop columns
  for (const table of tables) {
    await db.execute(sql`
      ALTER TABLE ${sql.identifier(table)} DROP COLUMN IF EXISTS "meta_title";
      ALTER TABLE ${sql.identifier(table)} DROP COLUMN IF EXISTS "meta_description";
      ALTER TABLE ${sql.identifier(table)} DROP COLUMN IF EXISTS "meta_image_id";
    `);
  }
}