import { Controller, Get, HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { HealthService } from "./health.service";

@Injectable()
@Controller("health")
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return this.healthService.getStatus();
  }
}
