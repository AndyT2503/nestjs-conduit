import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentConfiguration } from './infrastructure/environment-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Nestjs Conduit')
    .setDescription('Nestjs Conduit API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  const configService = app.get(ConfigService<EnvironmentConfiguration>);
  await app.listen(configService.get('listeningPort', { infer: true }));
}
bootstrap().catch((error) => console.error(error));
