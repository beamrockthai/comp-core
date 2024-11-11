import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTableAndColumn1703330463746 implements MigrationInterface {
  name = 'InitialTableAndColumn1703330463746';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_profiles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "address" character varying, "description" character varying, "tel" character varying, "identity_id" character varying, "photo_url" character varying, "date_of_birth" TIMESTAMP, "start_work" TIMESTAMP, "end_work" TIMESTAMP, CONSTRAINT "PK_1ec6662219f4605723f1e41b6cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "theme_settings" ("id" SERIAL NOT NULL, "screen" jsonb NOT NULL DEFAULT '{"mainColor":"#000000","subColor":"#000000","bgColor":"#000000","title":{"mainColor":"#000000","subColor":"#000000"},"text":{"mainColor":"#000000","subColor":"#000000"}}', "doc" jsonb NOT NULL DEFAULT '{"mainColor":"#000000","subColor":"#000000","text":"#000000","imageUrl":""}', CONSTRAINT "PK_4837c055b288cfab501eac406e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying, "description" character varying NOT NULL, "quantity" integer, "price" numeric(10,2), "vat" numeric(10,2), "sub_total" numeric(10,2), "grand_total" numeric(10,2), "notation_id" integer, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notations" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "type" character varying NOT NULL, "date" character varying NOT NULL, "paper_id" integer, "doc_number" character varying, "total" numeric(10,2), "wht" numeric(10,2), "sub_total" numeric(10,2), "vat" numeric(10,2), "grand_total" numeric(10,2), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "company_name" character varying NOT NULL, "tel" character varying NOT NULL, "address" jsonb NOT NULL DEFAULT '{}', "price_type" character varying NOT NULL, "currency" character varying NOT NULL, "note" jsonb NOT NULL DEFAULT '{}', "refer" character varying NOT NULL, "status" character varying NOT NULL, "settings_id" integer, CONSTRAINT "PK_0bb8ebb7e1d68704dc455b67157" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "settings" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "company_name" character varying NOT NULL, "address" jsonb NOT NULL DEFAULT '{}', "email" character varying NOT NULL, "tel" character varying NOT NULL, "tax_id" character varying NOT NULL, "bank_name" character varying NOT NULL, "bank_account_name" character varying NOT NULL, "bank_account_no" character varying NOT NULL, "bank_branch" character varying NOT NULL, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "organization_id" integer, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "description" character varying NOT NULL, "quantity" integer NOT NULL, "sub_total" numeric(10,2) NOT NULL, "is_vat" boolean NOT NULL DEFAULT false, "price" numeric(10,2) NOT NULL, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "category_id" integer, "organization_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "address" character varying NOT NULL, "country" character varying NOT NULL, "subdistrict" character varying NOT NULL, "district" character varying NOT NULL, "province" character varying NOT NULL, "postal_code" character varying NOT NULL, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "organization_id" integer, "organization_branch_id" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations_branch" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "branch_name" character varying NOT NULL, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "organization_id" integer, CONSTRAINT "PK_e9b88c46a17e550e5c2ef6dabf9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations_access" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "permission" jsonb NOT NULL DEFAULT '{"manageUsers":false,"manageRoles":false,"manageProjects":false,"manageProducts":false,"readAnalytics":false,"manageFinance":false,"manageSettings":false,"manageOrganization":false,"isOwner":false}', "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "organization_id" integer, CONSTRAINT "PK_7d6b9c073b3de2483ffeddabe9b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "company_name" character varying NOT NULL, "business_type" character varying NOT NULL, "tax_id" character varying NOT NULL, "tel" character varying NOT NULL, "email" character varying NOT NULL, "website" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "image_url" character varying, "note" character varying, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "project_name" character varying NOT NULL, "initial_total" numeric(10,2) NOT NULL, "grand_total" numeric(10,2) NOT NULL, "for_each_total" numeric(10,2) NOT NULL, "pure_bonus" numeric(10,2) NOT NULL, "is_percentage" boolean NOT NULL DEFAULT false, "status" character varying NOT NULL, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "organization_id" integer, "calculator_id" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_calculator" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "calculator_name" character varying NOT NULL, "calculating" jsonb NOT NULL DEFAULT '{}', "status" character varying NOT NULL, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_f26cbbc304d64b35e9216f7134d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_expense" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "calculator_name" character varying NOT NULL, "status" character varying NOT NULL, "percentage" numeric(10,2) NOT NULL, "in_total" numeric(10,2) NOT NULL, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "project_id" integer, CONSTRAINT "PK_d0b9b2d2af449b49c8066d6c485" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payroll" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "is_bonus" boolean NOT NULL, "bonus_rate" numeric(10,2) NOT NULL, "team_bonus" numeric(10,2) NOT NULL, "organize_bonus" numeric(10,2) NOT NULL, "initial_total" numeric(10,2) NOT NULL, "grand_total" numeric(10,2) NOT NULL, "for_each_total" numeric(10,2) NOT NULL, "pure_bonus" numeric(10,2) NOT NULL, "project_id" integer, "payroll_schedule_id" integer, CONSTRAINT "PK_7a76b819506029fc535b6e002e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payroll_employee" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "note" character varying NOT NULL, "percentage" numeric(10,2) NOT NULL, "user_id" integer, "payroll_id" integer, CONSTRAINT "PK_877911f59f52f487fb855aa05a2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payroll_schedule" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "start_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_144312e064671b753c60badc0d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "uuid" character varying NOT NULL DEFAULT uuid_generate_v4(), "email" citext NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "active" boolean NOT NULL, "status" character varying, "role" character varying NOT NULL, "profile_id" integer, CONSTRAINT "REL_23371445bd80cb3e413089551b" UNIQUE ("profile_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "activity_logs" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "action" character varying NOT NULL, "message" character varying, "metadata" jsonb NOT NULL DEFAULT '{}', "user_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f25287b6140c5ba18d38776a796" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1a242dcefeb94db399c57e989" ON "activity_logs" ("category", "action", "user_id", "created_at") `,
    );
    await queryRunner.query(
      `CREATE TABLE "admins" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "uuid" character varying NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "active" boolean NOT NULL DEFAULT false, "permission" jsonb DEFAULT '{}', "email" citext, "password" character varying, CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_051db7d37d478a69a7432df147" ON "admins" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "contents" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "sub_title" character varying, "description" character varying NOT NULL, "service" character varying NOT NULL, "image_url" character varying NOT NULL, "image_name" character varying, "user_id" character varying, "username" character varying, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_b7c504072e537532d7080c54fac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "company_name" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "tel" character varying NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "installments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "installment" integer NOT NULL, "service_rate" jsonb NOT NULL DEFAULT '{}', "details_delivery" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "PK_c74e44aa06bdebef2af0a93da1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers_address" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "tax_id" character varying NOT NULL, "address_one" jsonb NOT NULL DEFAULT '{}', "address_two" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "PK_2441e5a7e71f5dc216fa2f96feb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "installment" integer NOT NULL, "details" character varying NOT NULL, "delivery" jsonb NOT NULL DEFAULT '{}', "doc_delivery" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying, "permissions" character varying NOT NULL, "per_descriptions" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_6db542e5b56e2f8130ef0d7424f" FOREIGN KEY ("notation_id") REFERENCES "notations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notations" ADD CONSTRAINT "FK_2ccd8dd0590d2d130850268765f" FOREIGN KEY ("settings_id") REFERENCES "settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" ADD CONSTRAINT "FK_a800d22e3401e4d5085caef7ce7" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_2d404aa7aa4a0404eafd1840915" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_54c170d5fedd92b7265601b1672" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_44ac16d8d6eed5e0d5aa00e6d47" FOREIGN KEY ("organization_branch_id") REFERENCES "organizations_branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_branch" ADD CONSTRAINT "FK_80d0456cd749726e9142a409b30" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_access" ADD CONSTRAINT "FK_a7167c42bbb77f1fa18851ddc93" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_e4616ee32e66481cf9b9f1a6466" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_f26cbbc304d64b35e9216f7134d" FOREIGN KEY ("calculator_id") REFERENCES "project_calculator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_expense" ADD CONSTRAINT "FK_a368cdd9e6bf332e4f3182b229b" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payroll" ADD CONSTRAINT "FK_caf3e74e7bb2eed7b55b879715b" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payroll" ADD CONSTRAINT "FK_84e35e01dcb235622e5e9db208a" FOREIGN KEY ("payroll_schedule_id") REFERENCES "payroll_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payroll_employee" ADD CONSTRAINT "FK_2def821ec0090e16bc61f0256b7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payroll_employee" ADD CONSTRAINT "FK_d4d9230b81f198a3df9c0494232" FOREIGN KEY ("payroll_id") REFERENCES "payroll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity_logs" ADD CONSTRAINT "FK_d54f841fa5478e4734590d44036" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity_logs" DROP CONSTRAINT "FK_d54f841fa5478e4734590d44036"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payroll_employee" DROP CONSTRAINT "FK_d4d9230b81f198a3df9c0494232"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payroll_employee" DROP CONSTRAINT "FK_2def821ec0090e16bc61f0256b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payroll" DROP CONSTRAINT "FK_84e35e01dcb235622e5e9db208a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payroll" DROP CONSTRAINT "FK_caf3e74e7bb2eed7b55b879715b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_expense" DROP CONSTRAINT "FK_a368cdd9e6bf332e4f3182b229b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_f26cbbc304d64b35e9216f7134d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_e4616ee32e66481cf9b9f1a6466"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_access" DROP CONSTRAINT "FK_a7167c42bbb77f1fa18851ddc93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations_branch" DROP CONSTRAINT "FK_80d0456cd749726e9142a409b30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_44ac16d8d6eed5e0d5aa00e6d47"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_54c170d5fedd92b7265601b1672"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_2d404aa7aa4a0404eafd1840915"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_category" DROP CONSTRAINT "FK_a800d22e3401e4d5085caef7ce7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notations" DROP CONSTRAINT "FK_2ccd8dd0590d2d130850268765f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_6db542e5b56e2f8130ef0d7424f"`,
    );
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "customers_address"`);
    await queryRunner.query(`DROP TABLE "installments"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "contents"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_051db7d37d478a69a7432df147"`,
    );
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a1a242dcefeb94db399c57e989"`,
    );
    await queryRunner.query(`DROP TABLE "activity_logs"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "payroll_schedule"`);
    await queryRunner.query(`DROP TABLE "payroll_employee"`);
    await queryRunner.query(`DROP TABLE "payroll"`);
    await queryRunner.query(`DROP TABLE "project_expense"`);
    await queryRunner.query(`DROP TABLE "project_calculator"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(`DROP TABLE "organizations_access"`);
    await queryRunner.query(`DROP TABLE "organizations_branch"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "product_category"`);
    await queryRunner.query(`DROP TABLE "settings"`);
    await queryRunner.query(`DROP TABLE "notations"`);
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`DROP TABLE "theme_settings"`);
    await queryRunner.query(`DROP TABLE "user_profiles"`);
  }
}
