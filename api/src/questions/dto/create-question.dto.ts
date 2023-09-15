import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alternativeOne: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alternativeTwo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alternativeThree: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alternativeFour: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alternativeFive: string;

  @ApiProperty()
  questionAnswer: number;
}
