import { ApiProperty } from '@nestjs/swagger';

export class ResponseQuizDto {
  @ApiProperty()
  codigo: string;

  @ApiProperty()
  name: string;
}
