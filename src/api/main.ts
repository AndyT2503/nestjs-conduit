import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvironmentConfiguration } from '../infrastructure/environment-config';

function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Nestjs Conduit')
    .setDescription('Nestjs Conduit API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

function setupAppConfiguration(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvironmentConfiguration>);
  setupAppConfiguration(app);
  setupSwagger(app);
  await app.listen(configService.get('listeningPort', { infer: true })!);
}
bootstrap().catch((error) => console.error(error));
