import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/domain/entities';
import { RepositoryInjectionToken } from 'src/domain/repository';
import { FollowRepository } from './follow-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [
    {
      provide: RepositoryInjectionToken.Follow,
      useClass: FollowRepository,
    },
  ],
  exports: [RepositoryInjectionToken.Follow],
})
export class FollowRepositoryModule {}
