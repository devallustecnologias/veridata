import { Plan } from './plan.entity';
import { Repository } from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlanService {
    private readonly planRepo;
    private readonly permissionRepo;
    constructor(planRepo: Repository<Plan>, permissionRepo: Repository<Permission>);
    findAll(): Promise<Plan[]>;
    findOne(id: number): Promise<Plan>;
    create(dto: CreatePlanDto): Promise<Plan>;
    update(id: number, dto: UpdatePlanDto): Promise<Plan>;
    remove(id: number): Promise<void>;
}
