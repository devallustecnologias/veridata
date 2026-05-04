import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Minha Empresa LTDA' })
  name!: string;

  @ApiProperty({
    example: 'minhaempresa',
    description: 'Domínio único (usado para identificar a empresa)',
  })
  domain!: string;

  @ApiProperty({
    example: 'https://site.com/logo.png',
    required: false,
  })
  logoUrl?: string;
}