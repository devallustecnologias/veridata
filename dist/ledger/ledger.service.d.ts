import { Ledger } from './ledger.entity';
import { Repository } from 'typeorm';
import { Company } from '../company/company.entity';
import { User } from 'src/entities/user/user.entity';
import { CreateLedgerDto } from './dtos/create-ledger.dto';
export declare class LedgerService {
    private readonly ledgerRepo;
    private readonly companyRepo;
    private readonly userRepo;
    constructor(ledgerRepo: Repository<Ledger>, companyRepo: Repository<Company>, userRepo: Repository<User>);
    findAll(): Promise<Ledger[]>;
    findOne(id: number): Promise<Ledger>;
    create(dto: CreateLedgerDto): Promise<Ledger>;
    remove(id: number): Promise<void>;
}
