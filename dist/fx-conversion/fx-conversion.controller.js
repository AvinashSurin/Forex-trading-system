"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FxConversionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fx_conversion_service_1 = require("./fx-conversion.service");
const fx_conversion_dto_1 = require("./dto/fx-conversion.dto");
const fx_rates_service_1 = require("../fx-rates/fx-rates.service");
let FxConversionController = class FxConversionController {
    constructor(fxConversionService, fxRatesService) {
        this.fxConversionService = fxConversionService;
        this.fxRatesService = fxRatesService;
    }
    async convertFxRate(data) {
        const { quoteId, fromCurrency, toCurrency } = data;
        const rates = this.fxRatesService.getFxRates();
        if (!rates) {
            throw new common_1.NotFoundException('FX rates not found');
        }
        console.log('Available FX Rates:', rates);
        const validCurrencyPair = Object.keys(rates).some((key) => key === `${fromCurrency}_${toCurrency}`);
        console.log('Valid Currency Pair:', validCurrencyPair);
        if (!validCurrencyPair || rates[`${fromCurrency}_${toCurrency}`] === undefined) {
            throw new common_1.BadRequestException('Invalid quoteId or currency pair');
        }
        const result = await this.fxConversionService.convertFxRate(data);
        return result;
    }
};
exports.FxConversionController = FxConversionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the converted amount and currency' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fx_conversion_dto_1.FxConversionDto]),
    __metadata("design:returntype", Promise)
], FxConversionController.prototype, "convertFxRate", null);
exports.FxConversionController = FxConversionController = __decorate([
    (0, swagger_1.ApiTags)('fx-conversion'),
    (0, common_1.Controller)('fx-conversion'),
    __metadata("design:paramtypes", [fx_conversion_service_1.FxConversionService,
        fx_rates_service_1.FxRatesService])
], FxConversionController);
//# sourceMappingURL=fx-conversion.controller.js.map