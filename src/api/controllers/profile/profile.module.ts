import { Module } from '@nestjs/common';
import { ProfileService } from 'src/application/profile';
import { UserRepositoryModule } from 'src/infrastructure/repositories/user';
import { ProfileController } from './profile.controller';

@Module({
  imports: [UserRepositoryModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
