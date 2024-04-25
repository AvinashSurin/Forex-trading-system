import { Injectable, NotFoundException } from '@nestjs/common';
import { FxRatesService } from '../fx-rates/fx-rates.service';
import { FxConversionDto } from './dto/fx-conversion.dto';
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class FxConversionService {
  constructor(private readonly fxRatesService: FxRatesService) {}

  convertFxRate(data: FxConversionDto): { convertedAmount: number; currency: string } {
    const { quoteId, fromCurrency, toCurrency, amount } = data;
  
    const fxRate = this.fxRatesService.getFxRate(fromCurrency, toCurrency);
  
    if (!fxRate || fxRate.quoteId !== quoteId) {
      throw new BadRequestException('Invalid quoteId or currency pair');
    }
  
    const convertedAmount = amount * fxRate.rate;
  
    return { convertedAmount, currency: toCurrency };
  }
  
}

