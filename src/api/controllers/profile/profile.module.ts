import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from 'src/application/profile';
import { Follow, User } from 'src/domain/entities';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Follow])],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
