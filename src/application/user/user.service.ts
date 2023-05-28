import {
  BadRequestException,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';
import { AuthService } from 'src/infrastructure/auth';
import { Repository } from 'typeorm';
import { LoginUserDto, RegisterUserDto, UserDto } from './dto';

@Injectable({
  scope: Scope.REQUEST,
})
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async registerUser(request: RegisterUserDto): Promise<UserDto> {
    const userValidate = await this.userRepository.findOne({
      where: [{ username: request.username }, { email: request.email }],
    });
    if (userValidate) {
      throw new BadRequestException(['Username and email must be unique']);
    }
    const newUser = await this.userRepository.save({
      ...new User(),
      ...request,
      password: await this.authService.hashPassword(request.password),
    });

    return {
      bio: newUser.bio,
      email: newUser.email,
      image: newUser.image,
      username: newUser.username,
      token: await this.authService.generateAccessToken(newUser),
    };
  }

  async login(request: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: [
        {
          email: request.email,
        },
      ],
    });
    if (!user) {
      throw new UnauthorizedException(['User email does not exist']);
    }
    const isValidPassword = await this.authService.validatePassword(
      request.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException(['Password is incorrect']);
    }
    const accessToken = await this.authService.generateAccessToken(user);
    return {
      bio: user.bio,
      email: user.email,
      image: user.image,
      username: user.username,
      token: accessToken,
    };
  }

  async getCurrentUserProfile(): Promise<UserDto> {
    const userId = this.authService.getCurrentUser()!.id;
    const user = await this.userRepository.findOne({
      where: [
        {
          id: userId,
        },
      ],
    });
    if (!user) {
      throw new UnauthorizedException(['User email does not exist']);
    }
    const accessToken = await this.authService.generateAccessToken(user);
    return {
      bio: user.bio,
      email: user.email,
      image: user.image,
      username: user.username,
      token: accessToken,
    };
  }
}
