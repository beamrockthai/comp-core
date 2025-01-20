import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationShipEntityUserAndEntityTournaments1736415137578 implements MigrationInterface {
    name = 'RelationShipEntityUserAndEntityTournaments1736415137578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournaments" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "name_team"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "name_team" character varying`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_670ed1781be34ec30d0b6c73c29" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_670ed1781be34ec30d0b6c73c29"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "name_team"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "name_team" integer`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP COLUMN "user_id"`);
    }

}
