import { Scope } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/domain/entities';
import { Repository } from 'typeorm';
import { BaseRepository } from '../common/base-repository';

@Injectable({
  scope: Scope.REQUEST,
})
export class FavoriteRepository extends BaseRepository<Favorite> {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {
    super(favoriteRepository);
  }
}
