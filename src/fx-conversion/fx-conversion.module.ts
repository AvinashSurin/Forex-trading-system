import { Module } from '@nestjs/common';
import { FxConversionService } from './fx-conversion.service';
import { FxRatesModule } from '../fx-rates/fx-rates.module';
import { AccountsModule } from '../accounts/accounts.module'; 
import { FxConversionController } from './fx-conversion.controller';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
  imports: [FxRatesModule, AccountsModule], 
  controllers: [FxConversionController],
  providers: [FxConversionService, AccountsService],
})
export class FxConversionModule {}
