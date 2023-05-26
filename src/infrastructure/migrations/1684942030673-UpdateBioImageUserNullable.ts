import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBioImageUserNullable1684942030673
  implements MigrationInterface
{
  name = 'UpdateBioImageUserNullable1684942030673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user"."user" ALTER COLUMN "bio" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."user" ALTER COLUMN "image" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user"."user" ALTER COLUMN "image" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user"."user" ALTER COLUMN "bio" SET NOT NULL`,
    );
  }
}
