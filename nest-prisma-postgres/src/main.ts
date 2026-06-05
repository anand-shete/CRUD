import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EnvService } from "./shared/services/env.service";
import { Logger } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const PORT = app.get(EnvService).port;

  app.setGlobalPrefix("/api/v1");

  await app.listen(PORT, () => Logger.log(`\x1b[34m Nest server started on http://localhost:${PORT}\x1b[0m`));
}
bootstrap();
