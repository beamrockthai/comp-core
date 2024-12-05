import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnCreateAt1733406430483 implements MigrationInterface {
    name = 'AddColumnCreateAt1733406430483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "evaluation" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL, "score" integer, "comments" character varying, CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ranking" DROP COLUMN "comments"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranking" ADD "comments" character varying`);
        await queryRunner.query(`DROP TABLE "evaluation"`);
    }

}
