import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTeamsNew1733463419718 implements MigrationInterface {
    name = 'EditTeamsNew1733463419718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "status" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "status" integer`);
    }

}
