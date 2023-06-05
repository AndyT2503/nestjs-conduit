import { User } from 'src/domain/entities';

export interface IAuthService {
  getCurrentUser(): Pick<User, 'id' | 'username' | 'email'> | null;
  getCurrentToken(): string | null;
  generateAccessToken(user: User): Promise<string>;
  validateToken(token: string): Promise<boolean>;
  getCurrentUserInfo(token: string | undefined): Promise<void>;
  hashPassword(password: string): Promise<string>;
  validatePassword(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
