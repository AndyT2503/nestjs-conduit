import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(request: RegisterUserDto): Promise<UserDto> {
    const userValidate = await this.userRepository.findOne({
      where: [{ username: request.username }, { email: request.email }],
    });
    if (userValidate) {
      throw new HttpException(
        'Username and email must be unique',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = await this.userRepository.save({
      ...new User(),
      ...request,
    });

    const accessToken = await this.jwtService.signAsync({
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
    return {
      bio: newUser.bio,
      email: newUser.email,
      image: newUser.image,
      username: newUser.username,
      token: accessToken,
    };
  }
}
