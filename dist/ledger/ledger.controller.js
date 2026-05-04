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
exports.LedgerController = void 0;
const common_1 = require("@nestjs/common");
const ledger_service_1 = require("./ledger.service");
const swagger_1 = require("@nestjs/swagger");
const create_ledger_dto_1 = require("./dtos/create-ledger.dto");
let LedgerController = class LedgerController {
    ledgerService;
    constructor(ledgerService) {
        this.ledgerService = ledgerService;
    }
    findAll() {
        return this.ledgerService.findAll();
    }
    findOne(id) {
        return this.ledgerService.findOne(Number(id));
    }
    create(dto) {
        return this.ledgerService.create(dto);
    }
    remove(id) {
        return this.ledgerService.remove(Number(id));
    }
};
exports.LedgerController = LedgerController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar lançamentos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de registros do ledger',
        schema: {
            example: [
                {
                    id: 1,
                    amount: 100,
                    type: 'CREDIT',
                    description: 'Recarga',
                    origin: 'AJUSTE',
                    referenceId: 'pedido-123',
                    company: { id: 1, name: 'Empresa X' },
                    user: { id: 10, name: 'Lucas' },
                    createdAt: '2026-05-03T20:00:00Z',
                },
            ],
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar lançamento por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar lançamento' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Lançamento criado',
        schema: {
            example: {
                id: 1,
                amount: 100,
                type: 'CREDIT',
                description: 'Recarga',
                origin: 'AJUSTE',
                referenceId: 'pedido-123',
                createdAt: '2026-05-03T20:00:00Z',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ledger_dto_1.CreateLedgerDto]),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover lançamento (não recomendado)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LedgerController.prototype, "remove", null);
exports.LedgerController = LedgerController = __decorate([
    (0, swagger_1.ApiTags)('Ledger'),
    (0, common_1.Controller)('ledger'),
    __metadata("design:paramtypes", [ledger_service_1.LedgerService])
], LedgerController);
//# sourceMappingURL=ledger.controller.js.map