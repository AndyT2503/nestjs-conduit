import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateArticleFollowCommentFavoriteTable1684932601532
  implements MigrationInterface
{
  name = 'GenerateArticleFollowCommentFavoriteTable1684932601532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('article', true);
    await queryRunner.query(
      `CREATE TABLE "article"."comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "authorId" uuid, "articleId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user"."follow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "followerId" uuid, "followingId" uuid, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "article"."favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "articleId" uuid, "authorId" uuid, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "article"."article" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "body" character varying NOT NULL, "tags" text array NOT NULL, "authorId" uuid, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`,
    );
    await queryRunner.query(
      `ALTER TABLE "article"."comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "article"."comment" ADD CONSTRAINT "FK_c20404221e5c125a581a0d90c0e" FOREIGN KEY ("articleId") REFERENCES "article"."article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."follow" ADD CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."follow" ADD CONSTRAINT "FK_e9f68503556c5d72a161ce38513" FOREIGN KEY ("followingId") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "article"."favorite" ADD CONSTRAINT "FK_c0d2a3aa86fa8415db7349ede26" FOREIGN KEY ("articleId") REFERENCES "article"."article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "article"."favorite" ADD CONSTRAINT "FK_f3eb8169ad714a9a24670daec95" FOREIGN KEY ("authorId") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "article"."article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('article', true);
    await queryRunner.query(
      `ALTER TABLE "article"."article" DROP CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article"."favorite" DROP CONSTRAINT "FK_f3eb8169ad714a9a24670daec95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article"."favorite" DROP CONSTRAINT "FK_c0d2a3aa86fa8415db7349ede26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."follow" DROP CONSTRAINT "FK_e9f68503556c5d72a161ce38513"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."follow" DROP CONSTRAINT "FK_550dce89df9570f251b6af2665a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article"."comment" DROP CONSTRAINT "FK_c20404221e5c125a581a0d90c0e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article"."comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."user" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."user" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(`DROP TABLE "article"."article"`);
    await queryRunner.query(`DROP TABLE "article"."favorite"`);
    await queryRunner.query(`DROP TABLE "user"."follow"`);
    await queryRunner.query(`DROP TABLE "article"."comment"`);
  }
}
