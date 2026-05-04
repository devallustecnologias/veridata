import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { Repository } from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,

    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async findAll(): Promise<Plan[]> {
    return this.planRepo.find();
  }

  async findOne(id: number): Promise<Plan> {
    const plan = await this.planRepo.findOne({ where: { id } });

    if (!plan) {
      throw new NotFoundException('Plano não encontrado');
    }

    return plan;
  }

  async create(dto: CreatePlanDto): Promise<Plan> {
    const permissions = await this.permissionRepo.find({
      where: dto.permissionIds.map((id) => ({ id })),
    });

    if (permissions.length !== dto.permissionIds.length) {
      throw new BadRequestException('Permissões inválidas');
    }

    const plan = this.planRepo.create({
      name: dto.name,
      isSystem: dto.isSystem ?? false,
      permissions,
    });

    return this.planRepo.save(plan);
  }

  async update(id: number, dto: UpdatePlanDto): Promise<Plan> {
    const plan = await this.findOne(id);

    if (plan.isSystem) {
      throw new BadRequestException('Plano do sistema não pode ser editado');
    }

    const permissions = await this.permissionRepo.find({
      where: dto.permissionIds.map((id) => ({ id })),
    });

    if (permissions.length !== dto.permissionIds.length) {
      throw new BadRequestException('Permissões inválidas');
    }

    plan.name = dto.name;
    plan.permissions = permissions;

    return this.planRepo.save(plan);
  }

  async remove(id: number): Promise<void> {
    const plan = await this.findOne(id);

    if (plan.isSystem) {
      throw new BadRequestException('Plano do sistema não pode ser removido');
    }

    await this.planRepo.remove(plan);
  }
}
