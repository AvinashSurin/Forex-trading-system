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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FxRatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fx_rates_service_1 = require("./fx-rates.service");
let FxRatesController = class FxRatesController {
    constructor(fxRatesService) {
        this.fxRatesService = fxRatesService;
    }
    getFxRates() {
        const rates = this.fxRatesService.getFxRates();
        if (!rates) {
            throw new common_1.NotFoundException('FX rates not found');
        }
        const quoteId = Math.random().toString(36).substr(2, 9);
        const expiry_at = Date.now() + 30000;
        const formattedRates = Object.keys(rates).map((key) => ({
            currencyPair: key,
            rate: rates[key].rate,
            timestamp: rates[key].timestamp,
        }));
        return { quoteId, expiry_at, rates: formattedRates };
    }
};
exports.FxRatesController = FxRatesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the live FX rates along with quoteId and expiry_at' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], FxRatesController.prototype, "getFxRates", null);
exports.FxRatesController = FxRatesController = __decorate([
    (0, swagger_1.ApiTags)('fx-rates'),
    (0, common_1.Controller)('fx-rates'),
    __metadata("design:paramtypes", [fx_rates_service_1.FxRatesService])
], FxRatesController);
//# sourceMappingURL=fx-rates.controller.js.map