import { Module } from '@nestjs/common';
import { ProfileService } from 'src/application/profile';
import { FollowRepositoryModule } from 'src/infrastructure/repositories/follow';
import { UserRepositoryModule } from 'src/infrastructure/repositories/user';
import { ProfileController } from './profile.controller';

@Module({
  imports: [UserRepositoryModule, FollowRepositoryModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
