
import { Controller, Post, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { FxConversionService } from './fx-conversion.service';
import { FxConversionDto } from './dto/fx-conversion.dto';
import { FxRatesService } from '../fx-rates/fx-rates.service';

@ApiTags('fx-conversion')
@Controller('fx-conversion')
export class FxConversionController {
  constructor(
    private readonly fxConversionService: FxConversionService,
    private readonly fxRatesService: FxRatesService,
  ) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Returns the converted amount and currency' })
  async convertFxRate(@Body() data: FxConversionDto): Promise<{ convertedAmount: number; currency: string }> {
    const { quoteId, fromCurrency, toCurrency } = data;
  
    const rates = this.fxRatesService.getFxRates();
    
    if (!rates) {
      throw new NotFoundException('FX rates not found');
    }
  
    console.log('Available FX Rates:', rates);
  
    const validCurrencyPair = Object.keys(rates).some((key) => key === `${fromCurrency}_${toCurrency}`);
  
    console.log('Valid Currency Pair:', validCurrencyPair);
  
    if (!validCurrencyPair || rates[`${fromCurrency}_${toCurrency}`] === undefined) {
      throw new BadRequestException('Invalid quoteId or currency pair');
    }
  
    const result = await this.fxConversionService.convertFxRate(data);
  
    return result;
  }
  
}




















/*

import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { FxConversionService } from './fx-conversion.service';
import { FxConversionDto } from './dto/fx-conversion.dto';

@ApiTags('fx-conversion')
@Controller('fx-conversion')
export class FxConversionController {
  constructor(private readonly fxConversionService: FxConversionService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Performs FX conversion and returns the converted amount and currency' })
  async performFxConversion(@Body() body: FxConversionDto): Promise<{ convertedAmount: number; currency: string }> {
    const { quoteId, fromCurrency, toCurrency, amount } = body;
    const result = await this.fxConversionService.performFxConversion(quoteId, fromCurrency, toCurrency, amount);
    return result;
  }
}

*/