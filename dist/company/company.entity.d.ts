import { User } from 'src/entities/user/user.entity';
export declare class Company {
    id: number;
    name: string;
    domain: string;
    logoUrl?: string;
    users: User[];
}
