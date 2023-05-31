import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/domain/entities';
import { Repository } from 'typeorm';
import { BaseRepository } from '../common/base-repository';

@Injectable({
  scope: Scope.REQUEST,
})
export class FollowRepository extends BaseRepository<Follow> {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
  ) {
    super(followRepository);
  }
}
