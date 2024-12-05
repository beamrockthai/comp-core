import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteColumnRank21733232533916 implements MigrationInterface {
    name = 'DeleteColumnRank21733232533916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranking" DROP COLUMN "rank2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranking" ADD "rank2" character varying`);
    }

}
