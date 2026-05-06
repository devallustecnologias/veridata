import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'consulta.cpf',
    description: 'Chave única da permissão',
  })
  key!: string;

  @ApiProperty({
    example: 'Consulta CPF',
  })
  name!: string;

   @ApiProperty({
    example: 5,
    description: 'Quantidade de créditos consumidos ao usar essa permissão',
    required: false,
    default: 0,
  })
  creditCost?: number;
}