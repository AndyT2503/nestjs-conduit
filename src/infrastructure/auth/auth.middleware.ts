import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Utils } from '../utils';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService
  ){}
  use(req: Request, res: Response, next: NextFunction) {
    const token = Utils.extractTokenFromRequest(req);
    this.authService.getCurrentUserInfo(token);
    next();
  }
}