import { MigrationInterface, QueryRunner } from "typeorm";

export class EditColumnStage1734950283368 implements MigrationInterface {
    name = 'EditColumnStage1734950283368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "stage_order"`);
        await queryRunner.query(`ALTER TABLE "stage" ADD "stage_order" integer`);
        await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "elimination"`);
        await queryRunner.query(`ALTER TABLE "stage" ADD "elimination" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "elimination"`);
        await queryRunner.query(`ALTER TABLE "stage" ADD "elimination" character varying`);
        await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "stage_order"`);
        await queryRunner.query(`ALTER TABLE "stage" ADD "stage_order" character varying`);
    }

}
