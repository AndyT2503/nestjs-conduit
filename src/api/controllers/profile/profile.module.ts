import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from 'src/application/profile';
import { User } from 'src/domain/entities';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
