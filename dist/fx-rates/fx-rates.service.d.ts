export declare class FxRatesService {
    private readonly logger;
    private fxRates;
    private quoteId;
    handleInterval(): Promise<void>;
    fetchFxRates(): Promise<void>;
    getFxRate(fromCurrency: string, toCurrency: string): {
        rate: number;
        timestamp: number;
        quoteId: string;
    } | null;
    getFxRates(): Record<string, {
        rate: number;
        timestamp: number;
        quoteId: string;
    }>;
    getStoredQuoteId(): string;
}
