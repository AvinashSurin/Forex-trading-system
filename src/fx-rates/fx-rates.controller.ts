
import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { FxRatesService } from './fx-rates.service';

@ApiTags('fx-rates')
@Controller('fx-rates')
export class FxRatesController {
  constructor(private readonly fxRatesService: FxRatesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns the live FX rates along with quoteId and expiry_at' })
  getFxRates(): { quoteId: string; expiry_at: number; rates: any[] } {
    const rates = this.fxRatesService.getFxRates();
    
    if (!rates) {
      throw new NotFoundException('FX rates not found');
    }

    const quoteId = Math.random().toString(36).substr(2, 9);
    const expiry_at = Date.now() + 30000; 


    const formattedRates = Object.keys(rates).map((key) => ({
      currencyPair: key,
      rate: rates[key].rate,
      timestamp: rates[key].timestamp,
    }));

    return { quoteId, expiry_at, rates: formattedRates };
  }
}