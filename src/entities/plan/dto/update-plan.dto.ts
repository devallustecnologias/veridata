import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlanDto {
  @ApiProperty({ example: 'Plano Atualizado' })
  name!: string;

  @ApiProperty({
    example: [1, 2],
  })
  permissionIds!: number[];
}