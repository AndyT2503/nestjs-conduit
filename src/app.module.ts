import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environmentConfiguration } from './infrastructure/environment-config/configuration';
import { typeOrmConfigOptions } from './infrastructure/type-orm-config/type-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentConfiguration],
    }),
    TypeOrmModule.forRoot(typeOrmConfigOptions),
  ],
})
export class AppModule {}
