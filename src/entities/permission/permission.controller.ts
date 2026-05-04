import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todas as permissões' })
    @ApiResponse({
        status: 200,
        description: 'Lista de permissões',
        schema: {
            example: [
                { id: 1, key: 'dashboard', name: 'Dashboard' },
                { id: 2, key: 'consulta.cpf', name: 'Consulta CPF' },
                { id: 3, key: 'usuarios', name: 'Gerenciar usuários' },
            ],
        },
    })
    findAll(): Promise<Permission[]> {
        return this.permissionService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar permissão por ID' })
    @ApiResponse({
        status: 200,
        description: 'Permissão encontrada',
        schema: {
            example: {
                id: 1,
                key: 'dashboard',
                name: 'Dashboard',
            },
        },
    })
    findOne(@Param('id') id: number): Promise<Permission> {
        return this.permissionService.findOne(Number(id));
    }
    
    @Post()
    @ApiOperation({ summary: 'Criar nova permissão' })
    @ApiResponse({
        status: 201,
        description: 'Permissão criada com sucesso',
        schema: {
            example: {
                id: 4,
                key: 'usuarios.create',
                name: 'Criar usuário',
            },
        },
    })
    create(@Body() dto: CreatePermissionDto): Promise<Permission> {
        return this.permissionService.create(dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover permissão' })
    @ApiResponse({
        status: 200,
        description: 'Permissão removida com sucesso',
    })
    remove(@Param('id') id: number) {
        return this.permissionService.remove(Number(id));
    }
}
