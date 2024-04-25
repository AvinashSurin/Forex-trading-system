import { FxRatesService } from '../fx-rates/fx-rates.service';
import { FxConversionDto } from './dto/fx-conversion.dto';
export declare class FxConversionService {
    private readonly fxRatesService;
    constructor(fxRatesService: FxRatesService);
    convertFxRate(data: FxConversionDto): {
        convertedAmount: number;
        currency: string;
    };
}
