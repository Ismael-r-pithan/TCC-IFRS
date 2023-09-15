import { ApiProperty } from '@nestjs/swagger';

export class QuizFeedbackDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  questionAnswer: string;

  @ApiProperty()
  studentAnswer: string;
}
