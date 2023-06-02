import { Module } from '@nestjs/common';
import { UserRepository } from './user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';
import { AbstractRepository } from '../common';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: AbstractRepository<User>,
      useClass: UserRepository,
    },
  ],
  exports: [AbstractRepository<User>],
})
export class UserRepositoryModule {}
