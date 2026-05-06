import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

import { Module } from '@nestjs/common';
import { Company } from './company.entity';
import { Plan } from 'src/entities/plan/plan.entity';

@Module({
      imports: [TypeOrmModule.forFeature([Company, Plan]),],
    controllers: [
        CompanyController,],
    providers: [
        CompanyService,],
})
export class CompanyModule { }
