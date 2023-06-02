import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Follow, User } from 'src/domain/entities';
import { AuthService } from 'src/infrastructure/auth';
import { AbstractRepository } from 'src/infrastructure/repositories/common';
import { ProfileDto } from './dto';

@Injectable({
  scope: Scope.REQUEST,
})
export class ProfileService {
  constructor(
    private userRepository: AbstractRepository<User>,
    private followRepository: AbstractRepository<Follow>,
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

  async followProfile(followerUsername: string): Promise<ProfileDto> {
    const followerUser = await this.userRepository.findOne({
      where: { username: followerUsername },
    });
    if (!followerUser) {
      throw new NotFoundException([`User ${followerUsername} does not exist`]);
    }

    await this.followRepository.save({
      follower: followerUser,
      following: {
        id: this.authService.getCurrentUser()!.id,
      },
    });
    return {
      bio: followerUser.bio,
      following: true,
      image: followerUser.image,
      username: followerUser.username,
    };
  }

  async unFollowProfile(followerUsername: string): Promise<ProfileDto> {
    const followerUser = await this.userRepository.findOne({
      where: { username: followerUsername },
    });
    if (!followerUser) {
      throw new NotFoundException([`User ${followerUsername} does not exist`]);
    }

    await this.followRepository.delete({
      follower: {
        id: followerUser.id,
      },
      following: {
        id: this.authService.getCurrentUser()!.id,
      },
    });
    return {
      bio: followerUser.bio,
      following: false,
      image: followerUser.image,
      username: followerUser.username,
    };
  }
}
