import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({
    example: 'Plano Pro',
  })
  name!: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'IDs das permissões',
  })
  permissionIds!: number[];

  @ApiProperty({
    example: false,
    required: false,
  })
  isSystem?: boolean;
}