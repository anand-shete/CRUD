import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
  getStatus() {
    return { message: "Nest server healthcheck passed" };
  }
}
