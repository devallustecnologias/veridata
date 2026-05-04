import { ApiProperty } from '@nestjs/swagger';
import { LedgerType, LedgerOrigin } from '../ledger.entity';

export class CreateLedgerDto {
  @ApiProperty({ example: 100 })
  amount!: number;

  @ApiProperty({ enum: LedgerType, example: LedgerType.CREDIT })
  type!: LedgerType;

  @ApiProperty({ example: 'Recarga de créditos' })
  description!: string;

  @ApiProperty({
    enum: LedgerOrigin,
    required: false,
    example: LedgerOrigin.AJUSTE,
  })
  origin?: LedgerOrigin;

  @ApiProperty({
    required: false,
    example: 'pedido-123',
  })
  referenceId?: string;

  @ApiProperty({
    required: false,
    example: 1,
    description: 'ID da empresa',
  })
  companyId?: number;

  @ApiProperty({
    required: false,
    example: 10,
    description: 'ID do usuário',
  })
  userId?: string;
}