import { Module } from '@nestjs/common';
import { UserRepository } from './user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
