import { Logger, Scope } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/domain/entities';
import { EnvironmentConfiguration } from '../environment-config';
import { TokenPayloadDto } from 'src/application/user';

@Injectable({
  scope: Scope.REQUEST,
})
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private currentUser: Pick<User, 'id' | 'username' | 'email'>;
  private currentToken: string;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<EnvironmentConfiguration>,
  ) {}

  getCurrentUser(): Pick<User, 'id' | 'username' | 'email'> {
    return this.currentUser;
  }

  getCurrentToken(): string {
    return this.currentToken;
  }

  async generateAccessToken(
    user: User,
  ): Promise<string> {
    const accessToken = await this.jwtService.signAsync({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
    return accessToken;
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayloadDto>(
        token,
        {
          secret: this.configService.get('jwtSecret'),
        },
      );
      this.updateCurrentUserInfo(payload.user, token);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  private updateCurrentUserInfo(
    user: Pick<User, 'id' | 'username' | 'email'>,
    token: string,
  ): void {
    this.currentUser = user;
    this.currentToken = token;
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
