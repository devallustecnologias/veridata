import { TypeOrmModule } from '@nestjs/typeorm';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';

import { Module } from '@nestjs/common';
import { Ledger } from './ledger.entity';
import { Company } from 'src/company/company.entity';
import { User } from 'src/entities/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ledger, Company, User]),],
    controllers: [
        LedgerController,],
    providers: [
        LedgerService,],
})
export class LedgerModule { }
