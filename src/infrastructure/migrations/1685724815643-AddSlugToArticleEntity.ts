import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToArticleEntity1685724815643 implements MigrationInterface {
    name = 'AddSlugToArticleEntity1685724815643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article"."article" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article"."article" ADD CONSTRAINT "UQ_0ab85f4be07b22d79906671d72f" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article"."article" DROP CONSTRAINT "UQ_0ab85f4be07b22d79906671d72f"`);
        await queryRunner.query(`ALTER TABLE "article"."article" DROP COLUMN "slug"`);
    }

}
