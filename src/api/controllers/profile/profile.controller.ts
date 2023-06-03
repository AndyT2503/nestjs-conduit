import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfileDto, ProfileService } from 'src/application/profile';
import { AuthGuard } from 'src/infrastructure/auth';

@ApiBearerAuth()
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
  @Post(':username/follow')
  async followUser(@Param('username') username: string): Promise<ProfileDto> {
    return await this.profileService.followProfile(username);
  }

  @ApiOkResponse({
    type: ProfileDto,
  })
  @UseGuards(AuthGuard)
  @Delete(':username/follow')
  async unFollowUser(@Param('username') username: string): Promise<ProfileDto> {
    return await this.profileService.unFollowProfile(username);
  }
}
