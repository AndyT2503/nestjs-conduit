import { UserDto } from './../../../application/user/dto/user-dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto, UserService } from 'src/application/user';

@ApiTags('user')
@Controller({
  path: 'user',
})
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({
    description: 'The user records',
    type: UserDto,
  })
  @Post()
  async registerUser(@Body() user: RegisterUserDto) {
    return await this.userService.registerUser(user);
  }
}
