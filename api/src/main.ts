import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('QUIZZIFY')
    .setDescription('BACK END Quizify - API DOCUMENT')
    .setVersion('1.0-SNAPSHOT')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt-token'
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/v1/documentation', app, document);

  console.log(`Server Quizify starting at port ${process.env.SERVER_PORT}`);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
