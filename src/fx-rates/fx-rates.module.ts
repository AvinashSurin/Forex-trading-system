
import { Module } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';

@Module({
  providers: [FxRatesService],
  exports: [FxRatesService],
})
export class FxRatesModule {}
