import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  LoginUserDto,
  RegisterUserDto,
  UserService,
} from 'src/application/user';
import { AuthGuard } from 'src/infrastructure/auth';
import { UserDto } from '../../../application/user/dto/user.dto';
@ApiTags('user')
@Controller({
  path: 'user',
})
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({
    type: UserDto,
  })
  @Post()
  async registerUser(@Body() user: RegisterUserDto): Promise<UserDto> {
    return await this.userService.registerUser(user);
  }

  @ApiOkResponse({
    type: LoginUserDto,
  })
  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<UserDto> {
    return await this.userService.login(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getCurrentUserProfile(): Promise<UserDto> {
    return await this.userService.getCurrentUserProfile();
  }
}
