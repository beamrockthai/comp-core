import { MigrationInterface, QueryRunner } from "typeorm";

export class EditEntityUserChangeSlug1736420817765 implements MigrationInterface {
    name = 'EditEntityUserChangeSlug1736420817765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "uuid" TO "slug"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "slug" TO "uuid"`);
    }

}
