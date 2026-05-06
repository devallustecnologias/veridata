import { Company } from 'src/company/company.entity';
import { Plan } from '../plan/plan.entity';
export declare enum UserRole {
    MASTER = "master",
    EMPRESA = "empresa",
    OPERADOR = "operador"
}
export declare class User {
    uid: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    company?: Company | null;
    plan?: Plan | null;
    createdAt: Date;
}
