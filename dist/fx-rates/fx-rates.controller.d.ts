import { FxRatesService } from './fx-rates.service';
export declare class FxRatesController {
    private readonly fxRatesService;
    constructor(fxRatesService: FxRatesService);
    getFxRates(): {
        quoteId: string;
        expiry_at: number;
        rates: any[];
    };
}
