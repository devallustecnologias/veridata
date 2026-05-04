import { LedgerService } from './ledger.service';
import { Ledger } from './ledger.entity';
import { CreateLedgerDto } from './dtos/create-ledger.dto';
export declare class LedgerController {
    private readonly ledgerService;
    constructor(ledgerService: LedgerService);
    findAll(): Promise<Ledger[]>;
    findOne(id: number): Promise<Ledger>;
    create(dto: CreateLedgerDto): Promise<Ledger>;
    remove(id: number): Promise<void>;
}
