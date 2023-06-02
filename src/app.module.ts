import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './api/controllers/article';
import { ProfileModule } from './api/controllers/profile';
import { UserModule } from './api/controllers/user';
import { AuthMiddleware, AuthModule } from './infrastructure/auth';
import { environmentConfiguration } from './infrastructure/environment-config';
import { typeOrmConfigOptions } from './infrastructure/type-orm-config';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    ArticleModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentConfiguration],
    }),
    TypeOrmModule.forRoot(typeOrmConfigOptions),
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
