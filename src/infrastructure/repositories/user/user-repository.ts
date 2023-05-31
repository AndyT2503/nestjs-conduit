import { Injectable, Scope } from '@nestjs/common';
import { IRepository } from '../common/repository.interface';
import { User } from 'src/domain/entities';
import {
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
  SaveOptions,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../common/base-repository';

@Injectable({
  scope: Scope.REQUEST,
})
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
