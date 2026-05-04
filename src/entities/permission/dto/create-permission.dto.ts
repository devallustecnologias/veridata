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
}