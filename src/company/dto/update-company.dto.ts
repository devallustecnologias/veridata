import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({ example: 'Empresa Atualizada' })
  name!: string;

  @ApiProperty({ example: 'empresa-nova' })
  domain!: string;

  @ApiProperty({
    example: 'https://site.com/logo.png',
    required: false,
  })
  logoUrl?: string;

  @ApiProperty({
    example: 2,
    required: false,
    description: 'ID do plano da empresa',
  })
  planId?: number;
}