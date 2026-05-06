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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("./company.entity");
const typeorm_2 = require("typeorm");
const plan_entity_1 = require("../entities/plan/plan.entity");
let CompanyService = class CompanyService {
    companyRepo;
    planRepo;
    constructor(companyRepo, planRepo) {
        this.companyRepo = companyRepo;
        this.planRepo = planRepo;
    }
    async findAll() {
        return this.companyRepo.find({
            relations: ['users', 'plan'],
        });
    }
    async findOne(id) {
        const company = await this.companyRepo.findOne({
            where: { id },
            relations: ['users', 'plan'],
        });
        if (!company) {
            throw new common_1.NotFoundException('Empresa não encontrada');
        }
        return company;
    }
    async create(dto) {
        const exists = await this.companyRepo.findOne({
            where: { domain: dto.domain },
        });
        if (exists) {
            throw new common_1.BadRequestException('Domínio já está em uso');
        }
        const plan = dto.planId
            ? await this.planRepo.findOne({ where: { id: dto.planId } })
            : null;
        const company = this.companyRepo.create({
            ...dto,
            plan,
        });
        return this.companyRepo.save(company);
    }
    async update(id, dto) {
        const company = await this.findOne(id);
        const domainExists = await this.companyRepo.findOne({
            where: { domain: dto.domain },
        });
        if (domainExists && domainExists.id !== id) {
            throw new common_1.BadRequestException('Domínio já está em uso');
        }
        company.name = dto.name;
        company.domain = dto.domain;
        company.logoUrl = dto.logoUrl;
        return this.companyRepo.save(company);
    }
    async remove(id) {
        const company = await this.findOne(id);
        if (company.users?.length) {
            throw new common_1.BadRequestException('Não é possível remover empresa com usuários vinculados');
        }
        await this.companyRepo.remove(company);
    }
    async getPermissions(companyId) {
        const company = await this.companyRepo.findOne({
            where: { id: companyId },
            relations: {
                plan: {
                    permissions: true,
                },
            },
        });
        if (!company) {
            throw new common_1.NotFoundException('Empresa não encontrada');
        }
        return company.plan?.permissions ?? [];
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyService);
//# sourceMappingURL=company.service.js.map