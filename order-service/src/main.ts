import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

const logger = new Logger('Main');
const mircoserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: HOST,
    port: PORT
  }
};
async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    mircoserviceOptions
  );

  await app.listen();
  logger.log(`Microservice is listening on ${PORT}`);
}
bootstrap();
