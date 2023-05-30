import { Request } from 'express';

export class Utils {
  static extractTokenFromRequest(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : '';
  }
}
