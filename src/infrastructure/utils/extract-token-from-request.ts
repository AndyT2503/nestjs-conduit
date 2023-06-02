import { Request } from 'express';

export function extractTokenFromRequest(request: Request): string {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : '';
}