import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  name: string;
}

@Injectable()
export class AppService {
  getHello(): User {
    const user: User = {
      id: 'asdasd',
      name: 'Tu Hoang',
    };
    return user;
  }
}
