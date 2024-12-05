import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRank2Column1733232460523 implements MigrationInterface {
    name = 'AddRank2Column1733232460523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranking" ADD "rank2" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranking" DROP COLUMN "rank2"`);
    }

}
