import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizFeedbackDto {
  @ApiProperty()
  quizAnswers: number[];
}
