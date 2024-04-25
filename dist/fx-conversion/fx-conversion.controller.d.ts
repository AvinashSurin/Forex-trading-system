import { FxConversionService } from './fx-conversion.service';
import { FxConversionDto } from './dto/fx-conversion.dto';
import { FxRatesService } from '../fx-rates/fx-rates.service';
export declare class FxConversionController {
    private readonly fxConversionService;
    private readonly fxRatesService;
    constructor(fxConversionService: FxConversionService, fxRatesService: FxRatesService);
    convertFxRate(data: FxConversionDto): Promise<{
        convertedAmount: number;
        currency: string;
    }>;
}
