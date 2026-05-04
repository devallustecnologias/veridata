import { Permission } from '../permission/permission.entity';
export declare class Plan {
    id: number;
    name: string;
    permissions: Permission[];
    isSystem: boolean;
}
