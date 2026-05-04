import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
export declare class PermissionService {
    private readonly permissionRepo;
    constructor(permissionRepo: Repository<Permission>);
    findAll(): Promise<Permission[]>;
    findOne(id: number): Promise<Permission>;
    create(dto: CreatePermissionDto): Promise<Permission>;
    remove(id: number): Promise<void>;
}
