import { TopUpDto } from './dto/top-up.dto';
export declare class AccountsService {
    private accounts;
    topUp(topUpDto: TopUpDto): Record<string, number>;
    getBalances(): Record<string, number>;
}
