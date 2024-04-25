
import { Controller, Post, Get, Body, UsePipes, UseFilters, Inject } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CustomExceptionFilter } from '../filters/exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { TopUpDto } from './dto/top-up.dto';
import { AccountsService } from './accounts.service';

@ApiTags('accounts') 
@Controller('accounts')
@UseFilters(new CustomExceptionFilter())
export class AccountsController {
  constructor(
    @Inject(AccountsService)
    private readonly accountsService: AccountsService,
  ) {}

  @Post('topup')
  @UsePipes(new ValidationPipe())
  topUpAccount(@Body() topUpDto: TopUpDto) {
    try {
      const updatedAccount = this.accountsService.topUp(topUpDto);
      
      return {
        statusCode: 200,
        message: 'Account topped up successfully',
        data: updatedAccount,
      };
    } catch (error) {
      throw new Error('Failed to top up account');
    }
  }

  @Get('balance')
  @ApiResponse({ status: 200, description: 'Returns the account balances' })
  getAccountBalances(): Record<string, number> {
    return this.accountsService.getBalances();
  }
}