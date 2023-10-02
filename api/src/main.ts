import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(path.join(__dirname, '../uploads'));

  app.setGlobalPrefix('api');

  app.use(cors());

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

  await app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Quizify starting at port ${process.env.SERVER_PORT}`);
  });
}
bootstrap();
