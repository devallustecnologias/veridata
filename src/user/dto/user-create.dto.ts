import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Lucas' })
  username!: string;

  @ApiProperty({ example: 'lucas@email.com' })
  email!: string;

  @ApiProperty({ example: '123456' })
  password!: string;

  @ApiProperty({
    required: false,
    example: 1,
    description: 'ID da empresa',
  })
  companyId?: number;

  @ApiProperty({
  required: false,
  example: [1, 2, 3],
  description: 'IDs das permissões do plano do operador',
})
permissionIds?: number[];
}