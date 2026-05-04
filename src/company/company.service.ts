import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyRepo.find({
      relations: ['users'], // opcional
    });
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return company;
  }

  async create(dto: CreateCompanyDto): Promise<Company> {
    const exists = await this.companyRepo.findOne({
      where: { domain: dto.domain },
    });

    if (exists) {
      throw new BadRequestException('Domínio já está em uso');
    }

    const company = this.companyRepo.create(dto);
    return this.companyRepo.save(company);
  }

  async update(id: number, dto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);

    const domainExists = await this.companyRepo.findOne({
      where: { domain: dto.domain },
    });

    if (domainExists && domainExists.id !== id) {
      throw new BadRequestException('Domínio já está em uso');
    }

    company.name = dto.name;
    company.domain = dto.domain;
    company.logoUrl = dto.logoUrl;

    return this.companyRepo.save(company);
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);

    if (company.users?.length) {
      throw new BadRequestException(
        'Não é possível remover empresa com usuários vinculados',
      );
    }

    await this.companyRepo.remove(company);
  }
}