import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/domain/entities';
import { FavoriteRepository } from './favorite-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  providers: [FavoriteRepository],
  exports: [FavoriteRepository],
})
export class FavoriteRepositoryModule {}
