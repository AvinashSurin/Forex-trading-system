
import { IsNotEmpty, IsString } from 'class-validator';

export class FxRateDto {
  @IsNotEmpty()
  @IsString()
  fromCurrency: string;

  @IsNotEmpty()
  @IsString()
  toCurrency: string;
}