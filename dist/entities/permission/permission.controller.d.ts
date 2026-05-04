import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    findAll(): Promise<Permission[]>;
    findOne(id: number): Promise<Permission>;
    create(dto: CreatePermissionDto): Promise<Permission>;
    remove(id: number): Promise<void>;
}
