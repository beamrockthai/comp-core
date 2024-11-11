import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDefaultSuperAdminUser1704030474020
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "users" (id, active, email, password, first_name, last_name, status) VALUES (1, true, 'super.admin@utotech.org', '$2b$14$Z6gTbkG1shnSuN/Qi7DrB.7/s4iFp1jDyI6MnOfNUnC3evn0dUJFO', 'utotech', 'admin', 'active')`,
    );
    await queryRunner.query(
      `INSERT INTO "admins" (id, active, email, password, username) VALUES (1, true, 'super.admin@utotech.org', '$2b$14$Z6gTbkG1shnSuN/Qi7DrB.7/s4iFp1jDyI6MnOfNUnC3evn0dUJFO', 'utotech')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "users" WHERE email = 'super.admin@utotech.org'`,
    );
    await queryRunner.query(
      `DELETE FROM "admins" WHERE email = 'super.admin@utotech.org'`,
    );
  }
}
