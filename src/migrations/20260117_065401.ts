import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "blogs_slug_idx";
  DROP INDEX "pages_slug_idx";
  DROP INDEX "projects_slug_idx";
  DROP INDEX "skills_slug_idx";
  DROP INDEX "industries_slug_idx";
  ALTER TABLE "blogs" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "skills" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "industries" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "blogs" ADD COLUMN "lock_slug" boolean DEFAULT true;
  ALTER TABLE "pages" ADD COLUMN "lock_slug" boolean DEFAULT true;
  ALTER TABLE "projects" ADD COLUMN "lock_slug" boolean DEFAULT true;
  ALTER TABLE "skills" ADD COLUMN "lock_slug" boolean DEFAULT true;
  ALTER TABLE "industries" ADD COLUMN "lock_slug" boolean DEFAULT true;
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE UNIQUE INDEX "skills_slug_idx" ON "skills" USING btree ("slug");
  CREATE UNIQUE INDEX "industries_slug_idx" ON "industries" USING btree ("slug");
  ALTER TABLE "blogs" DROP COLUMN "slug_lock";
  ALTER TABLE "pages" DROP COLUMN "slug_lock";
  ALTER TABLE "projects" DROP COLUMN "slug_lock";
  ALTER TABLE "skills" DROP COLUMN "slug_lock";
  ALTER TABLE "industries" DROP COLUMN "slug_lock";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "blogs_slug_idx";
  DROP INDEX "pages_slug_idx";
  DROP INDEX "projects_slug_idx";
  DROP INDEX "skills_slug_idx";
  DROP INDEX "industries_slug_idx";
  ALTER TABLE "blogs" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "skills" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "industries" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "blogs" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "pages" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "projects" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "skills" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "industries" ADD COLUMN "slug_lock" boolean DEFAULT true;
  CREATE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "skills_slug_idx" ON "skills" USING btree ("slug");
  CREATE INDEX "industries_slug_idx" ON "industries" USING btree ("slug");
  ALTER TABLE "blogs" DROP COLUMN "lock_slug";
  ALTER TABLE "pages" DROP COLUMN "lock_slug";
  ALTER TABLE "projects" DROP COLUMN "lock_slug";
  ALTER TABLE "skills" DROP COLUMN "lock_slug";
  ALTER TABLE "industries" DROP COLUMN "lock_slug";`)
}
