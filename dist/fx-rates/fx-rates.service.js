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
var FxRatesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FxRatesService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = require("axios");
let FxRatesService = FxRatesService_1 = class FxRatesService {
    constructor() {
        this.logger = new common_1.Logger(FxRatesService_1.name);
        this.fxRates = {};
        this.quoteId = '';
    }
    async handleInterval() {
        this.logger.debug('Fetching FX rates...');
        await this.fetchFxRates();
    }
    async fetchFxRates() {
        try {
            const response = await axios_1.default.get('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=NBCCE0MBRG7J0BIK');
            console.log(response.data);
            const exchangeRateData = response.data['Realtime Currency Exchange Rate'];
            if (exchangeRateData && exchangeRateData['5. Exchange Rate']) {
                const rate = parseFloat(exchangeRateData['5. Exchange Rate']);
                const timestamp = Date.now();
                this.quoteId = Math.random().toString(36).substr(2, 9);
                this.fxRates['USD_EUR'] = { rate, timestamp, quoteId: this.quoteId };
            }
            else {
                throw new Error('Exchange rate data not found or invalid response structure');
            }
        }
        catch (error) {
            this.logger.error('Error fetching FX rates:', error);
        }
    }
    getFxRate(fromCurrency, toCurrency) {
        const key = `${fromCurrency}_${toCurrency}`;
        const fxRate = this.fxRates[key];
        if (fxRate && Date.now() - fxRate.timestamp <= 30000) {
            return fxRate;
        }
        return null;
    }
    getFxRates() {
        return this.fxRates;
    }
    getStoredQuoteId() {
        return this.quoteId;
    }
};
exports.FxRatesService = FxRatesService;
__decorate([
    (0, schedule_1.Interval)(30000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FxRatesService.prototype, "handleInterval", null);
exports.FxRatesService = FxRatesService = FxRatesService_1 = __decorate([
    (0, common_1.Injectable)()
], FxRatesService);
//# sourceMappingURL=fx-rates.service.js.map