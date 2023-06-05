import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware, AuthModule } from '../infrastructure/auth';
import { environmentConfiguration } from '../infrastructure/environment-config';
import { typeOrmConfigOptions } from '../infrastructure/type-orm-config';
import { ArticleModule } from './controllers/article';
import { ProfileModule } from './controllers/profile';
import { TagModule } from './controllers/tag';
import { UserModule } from './controllers/user';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    ArticleModule,
    TagModule,
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
