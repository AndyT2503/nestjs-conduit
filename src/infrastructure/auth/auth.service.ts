import { Scope } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/domain/entities';
import { EnvironmentConfiguration } from '../environment-config';
import { TokenPayload } from 'src/application/user';

@Injectable({
  scope: Scope.REQUEST,
})
export class AuthService {
  currentUser: TokenPayload | null;
  newUser: number;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<EnvironmentConfiguration>,
  ) {}

  async generateAccessToken(
    user: Pick<User, 'id' | 'username' | 'email'>,
  ): Promise<string> {
    const accessToken = await this.jwtService.signAsync({
      user: {
        userId: user.id,
        username: user.username,
        email: user.email,
      },
    });
    return accessToken;
  }

  async validateToken(token: string): Promise<boolean> {
    const payload = await this.jwtService.verifyAsync<TokenPayload>(token, {
      secret: this.configService.get('jwtSecret'),
    });
    const isValid = !!payload.userId;
    this.currentUser = isValid ? payload : null;
    return isValid;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async validatePassword(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hashPassword);
    return isMatch;
  }
}
