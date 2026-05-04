import { Company } from '../company/company.entity';
import { User } from 'src/entities/user/user.entity';
export declare enum LedgerType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT"
}
export declare enum LedgerOrigin {
    TRANSFER = "TRANSFER",
    CONSUMO = "CONSUMO",
    AJUSTE = "AJUSTE"
}
export declare class Ledger {
    id: number;
    amount: number;
    type: LedgerType;
    description: string;
    origin?: LedgerOrigin;
    referenceId?: string;
    company?: Company | null;
    user?: User | null;
    createdAt: Date;
}
