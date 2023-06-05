import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentConfiguration } from 'src/infrastructure/environment-config';
import { AuthInjectionToken } from './auth.injection-token';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<EnvironmentConfiguration>) => ({
        global: true,
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: AuthInjectionToken,
      useClass: AuthService
    }
  ],
  exports: [AuthInjectionToken],
})
export class AuthModule {}
