import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeConfig1685891564113 implements MigrationInterface {
    name = 'AddCascadeConfig1685891564113';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article"."comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "article"."comment" DROP CONSTRAINT "FK_c20404221e5c125a581a0d90c0e"`);
        await queryRunner.query(`ALTER TABLE "article"."article" DROP CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87"`);
        await queryRunner.query(`ALTER TABLE "article"."comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article"."comment" ADD CONSTRAINT "FK_c20404221e5c125a581a0d90c0e" FOREIGN KEY ("articleId") REFERENCES "article"."article"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article"."article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "user"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article"."article" DROP CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87"`);
        await queryRunner.query(`ALTER TABLE "article"."comment" DROP CONSTRAINT "FK_c20404221e5c125a581a0d90c0e"`);
        await queryRunner.query(`ALTER TABLE "article"."comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "article"."article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article"."comment" ADD CONSTRAINT "FK_c20404221e5c125a581a0d90c0e" FOREIGN KEY ("articleId") REFERENCES "article"."article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article"."comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
