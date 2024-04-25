
import { Injectable } from '@nestjs/common';

@Injectable()
export class BalanceService {
  private accounts: Record<string, number> = {
    USD: 1000,
    EUR: 500,
    GBP: 300,
  };

  getAccountBalances(): Record<string, number> {
    return this.accounts;
  }
}