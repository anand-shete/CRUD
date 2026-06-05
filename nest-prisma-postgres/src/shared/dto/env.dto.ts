import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

export class ValidateEnvDto {
  @IsString()
  @IsNotEmpty()
  DATABASE_URI!: string;

  @IsNumber()
  @IsNotEmpty()
  PORT!: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(ValidateEnvDto, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
