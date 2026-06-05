import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}
  get port(): number {
    return this.configService.get<number>('PORT', { infer: true });
  }

  get databaseUri() {
    return this.configService.get('DATABASE_URI', { infer: true });
  }
}
