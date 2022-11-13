import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { SuccessInterceptor } from './common/interceptor/success.interceptor';
import * as expressBasicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookireParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.use(cookireParser());
  app.use(
    ['/docs/', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  app.useStaticAssets(path.join(__dirname, '/common', '/uploads'), {
    prefix: '/media',
  });

  const PORT = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('Nepp Blog')
    .setDescription('Nepp Blog API description')
    .setVersion('1.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(PORT);
}
bootstrap();
