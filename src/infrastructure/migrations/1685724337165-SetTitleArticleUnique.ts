import { MigrationInterface, QueryRunner } from "typeorm";

export class SetTitleArticleUnique1685724337165 implements MigrationInterface {
    name = 'SetTitleArticleUnique1685724337165';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article"."article" ADD CONSTRAINT "UQ_fca3cb9ba4963678f564f22e7a8" UNIQUE ("title")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article"."article" DROP CONSTRAINT "UQ_fca3cb9ba4963678f564f22e7a8"`);
    }

}
