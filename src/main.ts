import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as ip from 'ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors;
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`Running On : ${ip.address()}:${port}`);
  });
}
bootstrap();
