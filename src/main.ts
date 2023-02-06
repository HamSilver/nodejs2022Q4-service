import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = parse(
    (await readFile(join(process.cwd(), 'doc', 'api.yaml'))).toString('utf-8'),
  );
  SwaggerModule.setup('doc', app, document);
  const httpAdapter = app.getHttpAdapter().getInstance();
  httpAdapter.set('strict routing', true);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(+process.env.PORT || 4000);
}
bootstrap();
