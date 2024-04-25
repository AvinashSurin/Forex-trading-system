"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FxConversionModule = void 0;
const common_1 = require("@nestjs/common");
const fx_conversion_service_1 = require("./fx-conversion.service");
const fx_rates_module_1 = require("../fx-rates/fx-rates.module");
const accounts_module_1 = require("../accounts/accounts.module");
const fx_conversion_controller_1 = require("./fx-conversion.controller");
const accounts_service_1 = require("../accounts/accounts.service");
let FxConversionModule = class FxConversionModule {
};
exports.FxConversionModule = FxConversionModule;
exports.FxConversionModule = FxConversionModule = __decorate([
    (0, common_1.Module)({
        imports: [fx_rates_module_1.FxRatesModule, accounts_module_1.AccountsModule],
        controllers: [fx_conversion_controller_1.FxConversionController],
        providers: [fx_conversion_service_1.FxConversionService, accounts_service_1.AccountsService],
    })
], FxConversionModule);
//# sourceMappingURL=fx-conversion.module.js.map