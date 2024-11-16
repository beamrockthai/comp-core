import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1731748635549 implements MigrationInterface {
  name = 'AddUserTable1731748635549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "uuid" character varying NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL, "email" citext NOT NULL, "status" character varying, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "description" character varying, "tel" character varying, "identity_id" character varying, "photo_url" character varying, "date_of_birth" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "activity_logs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "event" character varying NOT NULL, "event_type" character varying NOT NULL, "action" character varying, "message" character varying, "data" jsonb NOT NULL DEFAULT '{}', "reference" jsonb NOT NULL DEFAULT '{}', "user_id" integer NOT NULL, CONSTRAINT "PK_f25287b6140c5ba18d38776a796" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6736c2ba2845a1150aa94fb693" ON "activity_logs" ("event", "event_type", "user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "contents" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "sub_title" character varying, "description" character varying NOT NULL, "service" character varying NOT NULL, "image_url" character varying NOT NULL, "image_name" character varying, "user_id" character varying, "username" character varying, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_b7c504072e537532d7080c54fac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying, "description" character varying NOT NULL, "quantity" integer, "price" numeric(10,2), "vat" numeric(10,2), "sub_total" numeric(10,2), "grand_total" numeric(10,2), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "permissions" jsonb NOT NULL DEFAULT '{"manageUsers":false,"manageRoles":false,"manageProjects":false,"manageProducts":false,"readAnalytics":false,"manageFinance":false,"manageSettings":false,"manageOrganization":false,"isOwner":false}', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "theme_settings" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "settings_id" integer NOT NULL, "screen" jsonb NOT NULL DEFAULT '{"mainColor":"#000000","subColor":"#000000","bgColor":"#000000","title":{"mainColor":"#000000","subColor":"#000000"},"text":{"mainColor":"#000000","subColor":"#000000"}}', "doc" jsonb NOT NULL DEFAULT '{"mainColor":"#000000","subColor":"#000000","text":"#000000","imageUrl":""}', "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_4837c055b288cfab501eac406e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "settings" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "organization_type" character varying NOT NULL, "image_url" character varying NOT NULL, "billing_email" character varying NOT NULL, "organization_email" character varying NOT NULL, "descriptions" character varying, "note" character varying, "is_vat" boolean, "vat" integer, "tel" character varying, "website" character varying, "tax_id" character varying, "bank_name" character varying, "bank_account_name" character varying, "bank_account_no" character varying, "bank_branch" character varying, CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "description" character varying NOT NULL, "quantity" integer NOT NULL, "sub_total" numeric(10,2) NOT NULL, "is_vat" boolean NOT NULL DEFAULT false, "price" numeric(10,2) NOT NULL, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "category_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity_logs" ADD CONSTRAINT "FK_d54f841fa5478e4734590d44036" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "theme_settings" ADD CONSTRAINT "FK_8c96dcc8f1ec120bacb393b0992" FOREIGN KEY ("settings_id") REFERENCES "settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);

    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`,
    );
    await queryRunner.query(
      `ALTER TABLE "theme_settings" DROP CONSTRAINT "FK_8c96dcc8f1ec120bacb393b0992"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity_logs" DROP CONSTRAINT "FK_d54f841fa5478e4734590d44036"`,
    );
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "settings"`);
    await queryRunner.query(`DROP TABLE "theme_settings"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`DROP TABLE "contents"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6736c2ba2845a1150aa94fb693"`,
    );
    await queryRunner.query(`DROP TABLE "activity_logs"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
