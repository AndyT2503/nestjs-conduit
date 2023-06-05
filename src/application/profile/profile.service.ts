import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope
} from '@nestjs/common';
import { User } from 'src/domain/entities';
import { IRepository, RepositoryInjectionToken } from 'src/domain/repository';
import { AuthInjectionToken, IAuthService } from 'src/infrastructure/auth';
import { ProfileDto } from './dto';

@Injectable({
  scope: Scope.REQUEST,
})
export class ProfileService {
  constructor(
    @Inject(RepositoryInjectionToken.User)
    private userRepository: IRepository<User>,
    @Inject(AuthInjectionToken)
    private authService: IAuthService,
  ) {}

  async getProfile(username: string): Promise<ProfileDto> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: {
        followers: {
          following: true,
        },
      },
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
      relations: {
        followers: true,
      },
    });
    if (!followerUser) {
      throw new NotFoundException([`User ${followerUsername} does not exist`]);
    }
    if (followerUser.id === this.authService.getCurrentUser()!.id) {
      throw new BadRequestException(['Can not follow yourself']);
    }
    await this.userRepository.save({
      ...followerUser,
      followers: [
        ...followerUser.followers,
        {
          following: {
            id: this.authService.getCurrentUser()!.id,
          },
        },
      ],
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
      relations: {
        followers: {
          following: true,
        },
      },
    });
    if (!followerUser) {
      throw new NotFoundException([`User ${followerUsername} does not exist`]);
    }
    followerUser.followers = followerUser.followers.filter(
      (x) => x.following.id !== this.authService.getCurrentUser()!.id,
    );
    await this.userRepository.save(followerUser);
    return {
      bio: followerUser.bio,
      following: false,
      image: followerUser.image,
      username: followerUser.username,
    };
  }
}
