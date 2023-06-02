import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/domain/entities';
import { AbstractRepository } from '../common';
import { FollowRepository } from './follow-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [
    {
      provide: AbstractRepository<Follow>,
      useClass: FollowRepository,
    },
  ],
  exports: [AbstractRepository<Follow>],
})
export class FollowRepositoryModule {}
