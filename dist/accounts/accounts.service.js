"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
let AccountsService = class AccountsService {
    constructor() {
        this.accounts = {
            USD: 500,
            EUR: 500,
            GBP: 500,
        };
    }
    topUp(topUpDto) {
        const { currency, amount } = topUpDto;
        if (!this.accounts[currency]) {
            throw new Error('Invalid currency');
        }
        this.accounts[currency] += amount;
        return this.getBalances();
    }
    getBalances() {
        return { ...this.accounts };
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)()
], AccountsService);
//# sourceMappingURL=accounts.service.js.map