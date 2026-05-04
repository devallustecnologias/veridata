"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const permission_service_1 = require("./permission.service");
const swagger_1 = require("@nestjs/swagger");
const create_permission_dto_1 = require("./dto/create-permission.dto");
let PermissionController = class PermissionController {
    permissionService;
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    findAll() {
        return this.permissionService.findAll();
    }
    findOne(id) {
        return this.permissionService.findOne(Number(id));
    }
    create(dto) {
        return this.permissionService.create(dto);
    }
    remove(id) {
        return this.permissionService.remove(Number(id));
    }
};
exports.PermissionController = PermissionController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as permissões' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de permissões',
        schema: {
            example: [
                { id: 1, key: 'dashboard', name: 'Dashboard' },
                { id: 2, key: 'consulta.cpf', name: 'Consulta CPF' },
                { id: 3, key: 'usuarios', name: 'Gerenciar usuários' },
            ],
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar permissão por ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permissão encontrada',
        schema: {
            example: {
                id: 1,
                key: 'dashboard',
                name: 'Dashboard',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova permissão' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Permissão criada com sucesso',
        schema: {
            example: {
                id: 4,
                key: 'usuarios.create',
                name: 'Criar usuário',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover permissão' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permissão removida com sucesso',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "remove", null);
exports.PermissionController = PermissionController = __decorate([
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
//# sourceMappingURL=permission.controller.js.map