import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RateLimiterMiddleware } from './middleware/rate-limiter.middleware';
import { FxRatesModule } from './fx-rates/fx-rates.module'; 
import { FxConversionModule } from './fx-conversion/fx-conversion.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { FxRatesController } from './fx-rates/fx-rates.controller';
import { FxConversionController } from './fx-conversion/fx-conversion.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { FxConversionService } from './fx-conversion/fx-conversion.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    FxRatesModule, 
    FxConversionModule,
    AccountsModule,
    AuthModule,
  ],
  controllers: [FxRatesController, FxConversionController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    FxConversionService, 
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimiterMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}