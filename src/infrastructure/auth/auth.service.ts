import { Scope } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/entities';
import { EnvironmentConfiguration } from '../environment-config';

@Injectable({
  scope: Scope.REQUEST,
})
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<EnvironmentConfiguration>,
  ) {}

  async generateAccessToken(
    user: Pick<User, 'id' | 'username' | 'email'>,
  ): Promise<string> {
    const accessToken = await this.jwtService.signAsync({
      userId: user.id,
      username: user.username,
      email: user.email,
    });
    return accessToken;
  }

  async validateToken(token: string): Promise<boolean> {
    const isValid = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('jwtSecret'),
    });
    return isValid;
  }
}
