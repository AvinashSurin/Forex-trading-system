

import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class FxRatesService {
  private readonly logger = new Logger(FxRatesService.name);

  private fxRates: Record<string, { rate: number; timestamp: number; quoteId: string }> = {};
  private quoteId: string = ''; 

  @Interval(30000) 
  async handleInterval() {
    this.logger.debug('Fetching FX rates...');
    await this.fetchFxRates();
  }

  async fetchFxRates(): Promise<void> {
    try {
      const response = await axios.get(
        'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=NBCCE0MBRG7J0BIK'
        //'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo'
        //'httpswww.alphavantage.co//query?function=CURRENCY_EXCHANGE_RATE&from_currency=<string>&to_currency=<string>'
      );
  
      console.log(response.data);
  
      const exchangeRateData = response.data['Realtime Currency Exchange Rate'];
  
      if (exchangeRateData && exchangeRateData['5. Exchange Rate']) {
        const rate = parseFloat(exchangeRateData['5. Exchange Rate']); 
        const timestamp = Date.now();
        this.quoteId = Math.random().toString(36).substr(2, 9); 
  
        this.fxRates['USD_EUR'] = { rate, timestamp, quoteId: this.quoteId };
      } else {
        throw new Error('Exchange rate data not found or invalid response structure');
      }
    } catch (error) {
      this.logger.error('Error fetching FX rates:', error);
    }
  }
  

  getFxRate(fromCurrency: string, toCurrency: string): { rate: number; timestamp: number; quoteId: string } | null {
    const key = `${fromCurrency}_${toCurrency}`;
    const fxRate = this.fxRates[key];

    if (fxRate && Date.now() - fxRate.timestamp <= 30000) {
      return fxRate;
    }

    return null;
  }

  getFxRates(): Record<string, { rate: number; timestamp: number; quoteId: string }> {
    return this.fxRates;
  }


  getStoredQuoteId(): string {
    return this.quoteId;
  }
  
}