import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';
import {
  Repository
} from 'typeorm';
import { BaseRepository } from '../common';

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
