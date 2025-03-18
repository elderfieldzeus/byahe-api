import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SEQUELIZE_USERNAME } from './lib/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(SEQUELIZE_USERNAME);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Byahe')
    .setDescription(
      'A Smart Travel Planner that helps users Organize Itineraries, Manage Flights, Store Travel Documents, and Book Accommodations—all in one place.',
    )
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
