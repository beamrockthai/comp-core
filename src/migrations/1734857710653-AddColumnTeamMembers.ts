import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnTeamMembers1734857710653 implements MigrationInterface {
    name = 'AddColumnTeamMembers1734857710653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teamsmembers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "slug" character varying NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL, "member_name" character varying, CONSTRAINT "PK_9e6b50d5f9aaaa73fe74ad1634a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "teamsmembers"`);
    }

}
