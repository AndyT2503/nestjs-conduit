import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentConfiguration } from './infrastructure/environment-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvironmentConfiguration>);
  await app.listen(configService.get('listeningPort', { infer: true }));
}
bootstrap();
