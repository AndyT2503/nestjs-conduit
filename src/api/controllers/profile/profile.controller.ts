import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ProfileDto, ProfileService } from 'src/application/profile';

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
}
