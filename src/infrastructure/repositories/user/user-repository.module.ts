import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';
import { RepositoryInjectionToken } from 'src/domain/repository';
import { UserRepository } from './user-repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: RepositoryInjectionToken.User,
      useClass: UserRepository,
    },
  ],
  exports: [RepositoryInjectionToken.User],
})
export class UserRepositoryModule {}
