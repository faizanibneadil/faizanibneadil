import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "icons_slug_idx";
  DROP INDEX "blogs_slug_idx";
  DROP INDEX "pages_slug_idx";
  DROP INDEX "projects_slug_idx";
  DROP INDEX "skills_slug_idx";
  DROP INDEX "categories_slug_idx";
  CREATE INDEX "icons_slug_idx" ON "icons" USING btree ("slug");
  CREATE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "skills_slug_idx" ON "skills" USING btree ("slug");
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "icons_slug_idx";
  DROP INDEX "blogs_slug_idx";
  DROP INDEX "pages_slug_idx";
  DROP INDEX "projects_slug_idx";
  DROP INDEX "skills_slug_idx";
  DROP INDEX "categories_slug_idx";
  CREATE UNIQUE INDEX "icons_slug_idx" ON "icons" USING btree ("slug");
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE UNIQUE INDEX "skills_slug_idx" ON "skills" USING btree ("slug");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");`)
}
