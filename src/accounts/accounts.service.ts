import { Injectable } from '@nestjs/common';
import { TopUpDto } from './dto/top-up.dto';

@Injectable()
export class AccountsService {
  private accounts = {
    USD: 500,
    EUR: 500,
    GBP: 500,
  };

  topUp(topUpDto: TopUpDto): Record<string, number> {
    const { currency, amount } = topUpDto;

    if (!this.accounts[currency]) {
      throw new Error('Invalid currency');
    }

    this.accounts[currency] += amount;

    return this.getBalances();
  }

  getBalances(): Record<string, number> {
    return { ...this.accounts };
  }
}