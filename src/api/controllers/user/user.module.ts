import { Module } from '@nestjs/common';
import { UserService } from 'src/application/user';
import { UserRepositoryModule } from 'src/infrastructure/repositories/user';
import { UserController } from './user.controller';

@Module({
  imports: [UserRepositoryModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
