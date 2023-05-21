import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateUserTable1684685527254 implements MigrationInterface {
    name = 'GenerateUserTable1684685527254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema('user', true);
        await queryRunner.query(`CREATE TABLE "user"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "bio" character varying NOT NULL, "image" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"."user"`);
    }

}
