import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ledger } from './ledger.entity';
import { Repository } from 'typeorm';
import { Company } from '../company/company.entity';
import { User } from 'src/entities/user/user.entity';
import { CreateLedgerDto } from './dtos/create-ledger.dto';

@Injectable()
export class LedgerService {
    constructor(
        @InjectRepository(Ledger)
        private readonly ledgerRepo: Repository<Ledger>,

        @InjectRepository(Company)
        private readonly companyRepo: Repository<Company>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async findAll(): Promise<Ledger[]> {
        return this.ledgerRepo.find({
            relations: ['company', 'user'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Ledger> {
        const ledger = await this.ledgerRepo.findOne({
            where: { id },
            relations: ['company', 'user'],
        });

        if (!ledger) {
            throw new NotFoundException('Registro não encontrado');
        }

        return ledger;
    }

    async create(dto: CreateLedgerDto): Promise<Ledger> {
        if (dto.amount <= 0) {
            throw new BadRequestException('Valor deve ser maior que zero');
        }

        let company: Company | null = null;
        let user: User | null = null;

        if (dto.companyId) {
            company = await this.companyRepo.findOne({
                where: { id: dto.companyId },
            });

            if (!company) {
                throw new NotFoundException('Empresa não encontrada');
            }
        }

        if (dto.userId) {
            user = await this.userRepo.findOne({
                where: { uid: dto.userId },
            });

            if (!user) {
                throw new NotFoundException('Usuário não encontrado');
            }
        }

        const ledger = this.ledgerRepo.create({
            amount: dto.amount,
            type: dto.type,
            description: dto.description,
            origin: dto.origin,
            referenceId: dto.referenceId,
            company,
            user,
        });

        return this.ledgerRepo.save(ledger);
    }

    async remove(id: number): Promise<void> {
        const ledger = await this.findOne(id);

        // 💡 geralmente NÃO se deleta histórico financeiro
        throw new BadRequestException(
            'Não é permitido remover registros do ledger',
        );

        // se quiser permitir:
        // await this.ledgerRepo.remove(ledger);
    }
}