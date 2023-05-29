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

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const request = context.switchToHttp().getRequest();
    const token = Utils.extractTokenFromRequest(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.authService.validateToken(token);
  }
}
