"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const rate_limiter_middleware_1 = require("./middleware/rate-limiter.middleware");
const fx_rates_module_1 = require("./fx-rates/fx-rates.module");
const fx_conversion_module_1 = require("./fx-conversion/fx-conversion.module");
const accounts_module_1 = require("./accounts/accounts.module");
const auth_module_1 = require("./auth/auth.module");
const fx_rates_controller_1 = require("./fx-rates/fx-rates.controller");
const fx_conversion_controller_1 = require("./fx-conversion/fx-conversion.controller");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/auth.guard");
const fx_conversion_service_1 = require("./fx-conversion/fx-conversion.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(rate_limiter_middleware_1.RateLimiterMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            fx_rates_module_1.FxRatesModule,
            fx_conversion_module_1.FxConversionModule,
            accounts_module_1.AccountsModule,
            auth_module_1.AuthModule,
        ],
        controllers: [fx_rates_controller_1.FxRatesController, fx_conversion_controller_1.FxConversionController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            fx_conversion_service_1.FxConversionService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map