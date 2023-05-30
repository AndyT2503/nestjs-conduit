import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Utils } from '../utils';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = Utils.extractTokenFromRequest(request);
    const isValidToken = await this.authService.validateToken(token);
    if (isValidToken) {
      return true;
    }
    throw new UnauthorizedException(['Unauthorized']);
  }
}
