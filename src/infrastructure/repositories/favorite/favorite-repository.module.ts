import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/domain/entities';
import { RepositoryInjectionToken } from 'src/domain/repository';
import { FavoriteRepository } from './favorite-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  providers: [
    {
      provide: RepositoryInjectionToken.Favorite,
      useClass: FavoriteRepository,
    },
  ],
  exports: [RepositoryInjectionToken.Favorite],
})
export class FavoriteRepositoryModule {}
