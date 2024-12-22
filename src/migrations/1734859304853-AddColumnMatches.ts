import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnMatches1734859304853 implements MigrationInterface {
    name = 'AddColumnMatches1734859304853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "matches" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL, "start_time" TIMESTAMP, "end_time" TIMESTAMP, "status" character varying, "score_team1" integer, "score_team2" integer, CONSTRAINT "PK_8a22c7b2e0828988d51256117f4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "matches"`);
    }

}
