import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "notes" DROP CONSTRAINT "notes_seo_image_id_media_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_seo_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_seo_image_id_media_id_fk";
  
  ALTER TABLE "educations" DROP CONSTRAINT "educations_seo_image_id_media_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_seo_image_id_media_id_fk";
  
  ALTER TABLE "hackathons" DROP CONSTRAINT "hackathons_seo_image_id_media_id_fk";
  
  ALTER TABLE "researches" DROP CONSTRAINT "researches_seo_image_id_media_id_fk";
  
  ALTER TABLE "achievements" DROP CONSTRAINT "achievements_seo_image_id_media_id_fk";
  
  ALTER TABLE "certifications" DROP CONSTRAINT "certifications_seo_image_id_media_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_seo_image_id_media_id_fk";
  
  ALTER TABLE "licenses" DROP CONSTRAINT "licenses_seo_image_id_media_id_fk";
  
  DROP INDEX "notes_seo_seo_image_idx";
  DROP INDEX "blogs_seo_seo_image_idx";
  DROP INDEX "pages_seo_seo_image_idx";
  DROP INDEX "educations_seo_seo_image_idx";
  DROP INDEX "projects_seo_seo_image_idx";
  DROP INDEX "hackathons_seo_seo_image_idx";
  DROP INDEX "researches_seo_seo_image_idx";
  DROP INDEX "achievements_seo_seo_image_idx";
  DROP INDEX "certifications_seo_seo_image_idx";
  DROP INDEX "publications_seo_seo_image_idx";
  DROP INDEX "licenses_seo_seo_image_idx";
  ALTER TABLE "notes" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "notes" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "notes" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "educations" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "educations" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "educations" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "projects" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "projects" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "projects" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "hackathons" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "hackathons" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "hackathons" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "researches" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "researches" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "researches" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "achievements" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "achievements" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "achievements" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "certifications" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "certifications" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "certifications" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "publications" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "publications" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "publications" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "licenses" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "licenses" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "licenses" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "notes_meta_meta_image_idx" ON "notes" USING btree ("meta_image_id");
  CREATE INDEX "blogs_meta_meta_image_idx" ON "blogs" USING btree ("meta_image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "educations_meta_meta_image_idx" ON "educations" USING btree ("meta_image_id");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");
  CREATE INDEX "hackathons_meta_meta_image_idx" ON "hackathons" USING btree ("meta_image_id");
  CREATE INDEX "researches_meta_meta_image_idx" ON "researches" USING btree ("meta_image_id");
  CREATE INDEX "achievements_meta_meta_image_idx" ON "achievements" USING btree ("meta_image_id");
  CREATE INDEX "certifications_meta_meta_image_idx" ON "certifications" USING btree ("meta_image_id");
  CREATE INDEX "publications_meta_meta_image_idx" ON "publications" USING btree ("meta_image_id");
  CREATE INDEX "licenses_meta_meta_image_idx" ON "licenses" USING btree ("meta_image_id");
  ALTER TABLE "notes" DROP COLUMN "seo_title";
  ALTER TABLE "notes" DROP COLUMN "seo_description";
  ALTER TABLE "notes" DROP COLUMN "seo_image_id";
  ALTER TABLE "blogs" DROP COLUMN "seo_title";
  ALTER TABLE "blogs" DROP COLUMN "seo_description";
  ALTER TABLE "blogs" DROP COLUMN "seo_image_id";
  ALTER TABLE "pages" DROP COLUMN "seo_title";
  ALTER TABLE "pages" DROP COLUMN "seo_description";
  ALTER TABLE "pages" DROP COLUMN "seo_image_id";
  ALTER TABLE "educations" DROP COLUMN "seo_title";
  ALTER TABLE "educations" DROP COLUMN "seo_description";
  ALTER TABLE "educations" DROP COLUMN "seo_image_id";
  ALTER TABLE "projects" DROP COLUMN "seo_title";
  ALTER TABLE "projects" DROP COLUMN "seo_description";
  ALTER TABLE "projects" DROP COLUMN "seo_image_id";
  ALTER TABLE "hackathons" DROP COLUMN "seo_title";
  ALTER TABLE "hackathons" DROP COLUMN "seo_description";
  ALTER TABLE "hackathons" DROP COLUMN "seo_image_id";
  ALTER TABLE "researches" DROP COLUMN "seo_title";
  ALTER TABLE "researches" DROP COLUMN "seo_description";
  ALTER TABLE "researches" DROP COLUMN "seo_image_id";
  ALTER TABLE "achievements" DROP COLUMN "seo_title";
  ALTER TABLE "achievements" DROP COLUMN "seo_description";
  ALTER TABLE "achievements" DROP COLUMN "seo_image_id";
  ALTER TABLE "certifications" DROP COLUMN "seo_title";
  ALTER TABLE "certifications" DROP COLUMN "seo_description";
  ALTER TABLE "certifications" DROP COLUMN "seo_image_id";
  ALTER TABLE "publications" DROP COLUMN "seo_title";
  ALTER TABLE "publications" DROP COLUMN "seo_description";
  ALTER TABLE "publications" DROP COLUMN "seo_image_id";
  ALTER TABLE "licenses" DROP COLUMN "seo_title";
  ALTER TABLE "licenses" DROP COLUMN "seo_description";
  ALTER TABLE "licenses" DROP COLUMN "seo_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "notes" DROP CONSTRAINT "notes_meta_image_id_media_id_fk";
  
  ALTER TABLE "blogs" DROP CONSTRAINT "blogs_meta_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "educations" DROP CONSTRAINT "educations_meta_image_id_media_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_meta_image_id_media_id_fk";
  
  ALTER TABLE "hackathons" DROP CONSTRAINT "hackathons_meta_image_id_media_id_fk";
  
  ALTER TABLE "researches" DROP CONSTRAINT "researches_meta_image_id_media_id_fk";
  
  ALTER TABLE "achievements" DROP CONSTRAINT "achievements_meta_image_id_media_id_fk";
  
  ALTER TABLE "certifications" DROP CONSTRAINT "certifications_meta_image_id_media_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_meta_image_id_media_id_fk";
  
  ALTER TABLE "licenses" DROP CONSTRAINT "licenses_meta_image_id_media_id_fk";
  
  DROP INDEX "notes_meta_meta_image_idx";
  DROP INDEX "blogs_meta_meta_image_idx";
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "educations_meta_meta_image_idx";
  DROP INDEX "projects_meta_meta_image_idx";
  DROP INDEX "hackathons_meta_meta_image_idx";
  DROP INDEX "researches_meta_meta_image_idx";
  DROP INDEX "achievements_meta_meta_image_idx";
  DROP INDEX "certifications_meta_meta_image_idx";
  DROP INDEX "publications_meta_meta_image_idx";
  DROP INDEX "licenses_meta_meta_image_idx";
  ALTER TABLE "notes" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "notes" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "notes" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "blogs" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "blogs" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "educations" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "educations" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "educations" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "projects" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "hackathons" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "hackathons" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "hackathons" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "researches" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "researches" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "researches" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "achievements" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "achievements" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "achievements" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "certifications" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "certifications" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "certifications" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "publications" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "publications" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "publications" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "licenses" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "licenses" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "licenses" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educations" ADD CONSTRAINT "educations_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "researches" ADD CONSTRAINT "researches_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "achievements" ADD CONSTRAINT "achievements_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "licenses" ADD CONSTRAINT "licenses_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "notes_seo_seo_image_idx" ON "notes" USING btree ("seo_image_id");
  CREATE INDEX "blogs_seo_seo_image_idx" ON "blogs" USING btree ("seo_image_id");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "educations_seo_seo_image_idx" ON "educations" USING btree ("seo_image_id");
  CREATE INDEX "projects_seo_seo_image_idx" ON "projects" USING btree ("seo_image_id");
  CREATE INDEX "hackathons_seo_seo_image_idx" ON "hackathons" USING btree ("seo_image_id");
  CREATE INDEX "researches_seo_seo_image_idx" ON "researches" USING btree ("seo_image_id");
  CREATE INDEX "achievements_seo_seo_image_idx" ON "achievements" USING btree ("seo_image_id");
  CREATE INDEX "certifications_seo_seo_image_idx" ON "certifications" USING btree ("seo_image_id");
  CREATE INDEX "publications_seo_seo_image_idx" ON "publications" USING btree ("seo_image_id");
  CREATE INDEX "licenses_seo_seo_image_idx" ON "licenses" USING btree ("seo_image_id");
  ALTER TABLE "notes" DROP COLUMN "meta_title";
  ALTER TABLE "notes" DROP COLUMN "meta_description";
  ALTER TABLE "notes" DROP COLUMN "meta_image_id";
  ALTER TABLE "blogs" DROP COLUMN "meta_title";
  ALTER TABLE "blogs" DROP COLUMN "meta_description";
  ALTER TABLE "blogs" DROP COLUMN "meta_image_id";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "pages" DROP COLUMN "meta_image_id";
  ALTER TABLE "educations" DROP COLUMN "meta_title";
  ALTER TABLE "educations" DROP COLUMN "meta_description";
  ALTER TABLE "educations" DROP COLUMN "meta_image_id";
  ALTER TABLE "projects" DROP COLUMN "meta_title";
  ALTER TABLE "projects" DROP COLUMN "meta_description";
  ALTER TABLE "projects" DROP COLUMN "meta_image_id";
  ALTER TABLE "hackathons" DROP COLUMN "meta_title";
  ALTER TABLE "hackathons" DROP COLUMN "meta_description";
  ALTER TABLE "hackathons" DROP COLUMN "meta_image_id";
  ALTER TABLE "researches" DROP COLUMN "meta_title";
  ALTER TABLE "researches" DROP COLUMN "meta_description";
  ALTER TABLE "researches" DROP COLUMN "meta_image_id";
  ALTER TABLE "achievements" DROP COLUMN "meta_title";
  ALTER TABLE "achievements" DROP COLUMN "meta_description";
  ALTER TABLE "achievements" DROP COLUMN "meta_image_id";
  ALTER TABLE "certifications" DROP COLUMN "meta_title";
  ALTER TABLE "certifications" DROP COLUMN "meta_description";
  ALTER TABLE "certifications" DROP COLUMN "meta_image_id";
  ALTER TABLE "publications" DROP COLUMN "meta_title";
  ALTER TABLE "publications" DROP COLUMN "meta_description";
  ALTER TABLE "publications" DROP COLUMN "meta_image_id";
  ALTER TABLE "licenses" DROP COLUMN "meta_title";
  ALTER TABLE "licenses" DROP COLUMN "meta_description";
  ALTER TABLE "licenses" DROP COLUMN "meta_image_id";`)
}
