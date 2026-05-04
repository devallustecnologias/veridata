import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../company/company.entity';
import { User } from 'src/entities/user/user.entity';
export enum LedgerType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export enum LedgerOrigin {
  TRANSFER = 'TRANSFER',
  CONSUMO = 'CONSUMO',
  AJUSTE = 'AJUSTE',
}

@Entity()
export class Ledger {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column('int')
  amount!: number;

  @ApiProperty({ enum: LedgerType })
  @Column({ type: 'enum', enum: LedgerType })
  type!: LedgerType;

  @ApiProperty()
  @Column()
  description!: string;

  @ApiProperty({ enum: LedgerOrigin, required: false })
  @Column({ type: 'enum', enum: LedgerOrigin, nullable: true })
  origin?: LedgerOrigin;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  referenceId?: string;

@ManyToOne(() => Company, { nullable: true })
company?: Company | null;

@ManyToOne(() => User, { nullable: true })
user?: User | null;

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;
}