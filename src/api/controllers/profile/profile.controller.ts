import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  FollowProfileDto,
  ProfileDto,
  ProfileService,
} from 'src/application/profile';
import { AuthGuard } from 'src/infrastructure/auth';

@ApiTags('profile')
@Controller({
  path: 'profile',
})
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiOkResponse({
    type: ProfileDto,
  })
  @Get(':username')
  async getProfile(@Param('username') username: string): Promise<ProfileDto> {
    return await this.profileService.getProfile(username);
  }

  @ApiOkResponse({
    type: ProfileDto,
  })
  @UseGuards(AuthGuard)
  @Post('follow')
  async followUser(@Body() request: FollowProfileDto): Promise<ProfileDto> {
    return await this.profileService.followProfile(request);
  }
}
