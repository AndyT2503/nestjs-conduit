import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/domain/entities';
import { AbstractRepository } from 'src/domain/repository';
import { FavoriteRepository } from './favorite-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  providers: [
    {
      provide: AbstractRepository<Favorite>,
      useClass: FavoriteRepository,
    },
  ],
  exports: [AbstractRepository<Favorite>],
})
export class FavoriteRepositoryModule {}
