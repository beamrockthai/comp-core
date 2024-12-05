import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableEvaluation1733404415595 implements MigrationInterface {
    name = 'AddTableEvaluation1733404415595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranking" DROP COLUMN "rank"`);
        await queryRunner.query(`ALTER TABLE "ranking" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "ranking" ADD "comments" character varying`);
        await queryRunner.query(`ALTER TABLE "ranking" ADD "rank" integer`);
        await queryRunner.query(`ALTER TABLE "ranking" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranking" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "ranking" DROP COLUMN "rank"`);
        await queryRunner.query(`ALTER TABLE "ranking" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "ranking" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "ranking" ADD "rank" integer`);
    }

}
