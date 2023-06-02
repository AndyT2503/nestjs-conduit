import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { extractTokenFromRequest } from '../utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromRequest(request);
    const isValidToken = await this.authService.validateToken(token);
    if (isValidToken) {
      return true;
    }
    throw new UnauthorizedException(['Unauthorized']);
  }
}
