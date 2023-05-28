import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';
import { AuthService } from 'src/infrastructure/auth';
import { Repository } from 'typeorm';

@Injectable({
  scope: Scope.REQUEST,
})
export class ProfileService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async getProfile(username: string): Promise<ProfileDto> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: ['followers.following'],
    });
    if (!user) {
      throw new NotFoundException(['User does not exist']);
    }
    let isFollow = false;
    if (this.authService.getCurrentUser()) {
      isFollow = user.followers.some(
        (x) => x.following.id === this.authService.getCurrentUser()?.id,
      );
    }

    return {
      bio: user.bio,
      following: isFollow,
      image: user.image,
      username: user.username,
    };
  }
}
