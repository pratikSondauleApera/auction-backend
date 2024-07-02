import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Auction API's")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())

  const port = process.env.PORT

  await app.listen(port);
}
bootstrap();
