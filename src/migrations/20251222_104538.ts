import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "skills_rels" DROP CONSTRAINT "skills_rels_experiences_fk";
  
  DROP INDEX "skills_rels_experiences_id_idx";
  ALTER TABLE "skills_rels" DROP COLUMN "experiences_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "skills_rels" ADD COLUMN "experiences_id" integer;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "skills_rels_experiences_id_idx" ON "skills_rels" USING btree ("experiences_id");`)
}
