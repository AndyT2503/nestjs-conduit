import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { extractTokenFromRequest } from '../utils';
import { AuthInjectionToken } from './auth.injection-token';
import { IAuthService } from './auth.service.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(AuthInjectionToken)
    private authService: IAuthService,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = extractTokenFromRequest(req);
    this.authService.getCurrentUserInfo(token);
    next();
  }
}
