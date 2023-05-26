import { User } from 'src/domain/entities';

export interface TokenPayloadDto {
  user: Pick<User, 'id' | 'username' | 'email'>;
}
