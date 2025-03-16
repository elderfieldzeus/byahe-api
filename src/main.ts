import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Byahe')
    .setDescription('A Smart Travel Planner that helps users Organize Itineraries, Manage Flights, Store Travel Documents, and Book Accommodations—all in one place.')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
