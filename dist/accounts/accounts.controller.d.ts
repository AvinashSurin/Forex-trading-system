import { TopUpDto } from './dto/top-up.dto';
import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    topUpAccount(topUpDto: TopUpDto): {
        statusCode: number;
        message: string;
        data: Record<string, number>;
    };
    getAccountBalances(): Record<string, number>;
}
