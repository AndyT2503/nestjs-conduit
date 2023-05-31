import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/domain/entities';
import { FollowRepository } from './follow-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [FollowRepository],
  exports: [FollowRepository],
})
export class FollowRepositoryModule {}
