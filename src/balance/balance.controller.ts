
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiProduces } from '@nestjs/swagger'; 
import { BalanceService } from './balance.service';

@ApiTags('accounts')
@Controller('accounts')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('balance')
  @ApiProduces('application/json') 
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the account balances',
    schema: {
      type: 'object',
      properties: {
        USD: { type: 'number' },
        EUR: { type: 'number' },
        GBP: { type: 'number' },
      },
    },
  })
  getAccountBalances() {
    return this.balanceService.getAccountBalances();
  }
}
