import { ApiProperty } from '@nestjs/swagger';

export class ResponseQuestionDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  alternativeOne: string;

  @ApiProperty()
  alternativeTwo: string;

  @ApiProperty()
  alternativeThree: string;

  @ApiProperty()
  alternativeFour: string;

  @ApiProperty()
  alternativeFive: string;
}
