import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvService } from "./services/env.service";
import { validate } from "./dto/env.dto";
import { PrismaService } from "./services/db.service";

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate, cache: true })],
  providers: [EnvService, PrismaService],
  exports: [EnvService, PrismaService],
})
export class SharedModule {}
