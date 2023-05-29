import {
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow, User } from 'src/domain/entities';
import { AuthService } from 'src/infrastructure/auth';
import { Repository } from 'typeorm';
import { FollowProfileDto } from './dto';
import { ProfileDto } from './dto/profile.dto';

@Injectable({
  scope: Scope.REQUEST,
})
export class ProfileService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
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

  async followProfile(request: FollowProfileDto): Promise<ProfileDto> {
    const followingUsername = this.authService.getCurrentUser()?.username;
    const followingUser = await this.userRepository.findOne({
      where: { username: followingUsername },
    });
    if (!followingUser) {
      throw new UnauthorizedException(['Unauthenticated user']);
    }
    const followerUser = await this.userRepository.findOne({
      where: { username: request.username },
    });
    if (!followerUser) {
      throw new NotFoundException([`User ${request.username} does not exist`]);
    }

    await this.followRepository.save({
      follower: followerUser,
      following: followingUser,
    });
    return {
      bio: followerUser.bio,
      following: true,
      image: followerUser.image,
      username: followerUser.username,
    };
  }
}
