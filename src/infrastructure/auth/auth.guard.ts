import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { extractTokenFromRequest } from '../utils';
import { AuthInjectionToken } from './auth.injection-token';
import { IAuthService } from './auth.service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthInjectionToken)
    private authService: IAuthService,
  ) {}

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
