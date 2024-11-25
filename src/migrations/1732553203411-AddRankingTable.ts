import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRankingTable1732553203411 implements MigrationInterface {
    name = 'AddRankingTable1732553203411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ranking" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL, "score" integer, "rank" integer, "description" character varying, CONSTRAINT "PK_bf82b8f271e50232e6a3fcb09a9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ranking"`);
    }

}
