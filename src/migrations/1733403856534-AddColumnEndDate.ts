import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnEndDate1733403856534 implements MigrationInterface {
    name = 'AddColumnEndDate1733403856534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournaments" ADD "end_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournaments" DROP COLUMN "end_date"`);
    }

}
