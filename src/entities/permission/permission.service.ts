import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepo: Repository<Permission>,
    ) { }

    async findAll(): Promise<Permission[]> {
        return this.permissionRepo.find();
    }

    async findOne(id: number): Promise<Permission> {
        const permission = await this.permissionRepo.findOne({ where: { id } });

        if (!permission) {
            throw new NotFoundException('Permissão não encontrada');
        }

        return permission;
    }
    async create(dto: CreatePermissionDto): Promise<Permission> {
        const exists = await this.permissionRepo.findOne({
            where: { key: dto.key },
        });

        if (exists) {
            throw new BadRequestException('Permissão já existe');
        }

        const permission = this.permissionRepo.create(dto);
        return this.permissionRepo.save(permission);
    }

    async remove(id: number): Promise<void> {
        const permission = await this.findOne(id);
        await this.permissionRepo.remove(permission);
    }
}
