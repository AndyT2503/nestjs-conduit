import { Module } from '@nestjs/common';
import { UserService } from 'src/application/user';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfiguration } from 'src/infrastructure/environment-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<EnvironmentConfiguration>) => ({
        global: true,
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
