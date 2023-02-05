import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = parse(
    (await readFile(join(process.cwd(), 'doc', 'api.yaml'))).toString('utf-8'),
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
