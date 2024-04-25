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
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exception_filter_1 = require("../filters/exception.filter");
const validation_pipe_1 = require("../pipes/validation.pipe");
const top_up_dto_1 = require("./dto/top-up.dto");
const accounts_service_1 = require("./accounts.service");
let AccountsController = class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    topUpAccount(topUpDto) {
        try {
            const updatedAccount = this.accountsService.topUp(topUpDto);
            return {
                statusCode: 200,
                message: 'Account topped up successfully',
                data: updatedAccount,
            };
        }
        catch (error) {
            throw new Error('Failed to top up account');
        }
    }
    getAccountBalances() {
        return this.accountsService.getBalances();
    }
};
exports.AccountsController = AccountsController;
__decorate([
    (0, common_1.Post)('topup'),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [top_up_dto_1.TopUpDto]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "topUpAccount", null);
__decorate([
    (0, common_1.Get)('balance'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the account balances' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AccountsController.prototype, "getAccountBalances", null);
exports.AccountsController = AccountsController = __decorate([
    (0, swagger_1.ApiTags)('accounts'),
    (0, common_1.Controller)('accounts'),
    (0, common_1.UseFilters)(new exception_filter_1.CustomExceptionFilter()),
    __param(0, (0, common_1.Inject)(accounts_service_1.AccountsService)),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map