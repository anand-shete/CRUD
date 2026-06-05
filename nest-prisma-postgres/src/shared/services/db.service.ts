import pg from "pg";
import { EnvService } from "./env.service";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private envService: EnvService) {
    const pool = new pg.Pool({ connectionString: envService.databaseUri });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$queryRaw`SELECT 1`;
      this.logger.log("\x1b[34mPostgreSQL database connected!\x1b[0m");
    } catch (error) {
      this.logger.error("Failed to connect PostgreSQL");
      process.exit(1);
    }
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
