import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitleToArticleEntity1685722845382 implements MigrationInterface {
    name = 'AddTitleToArticleEntity1685722845382';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article"."article" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article"."article" DROP COLUMN "title"`);
    }

}
