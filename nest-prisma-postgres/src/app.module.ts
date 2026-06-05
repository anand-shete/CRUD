import { Module } from "@nestjs/common";
import { SharedModule } from "./shared/shared.module";
import { UserModule } from "./user/user.module";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "./shared/interceptors/response.interceptor";
import { HealthModule } from "./health/health.module";
import { GlobalExceptionFilter } from "./shared/filters/http-exception.filter";

@Module({
  imports: [SharedModule, HealthModule, UserModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
  ],
})
export class AppModule {}
