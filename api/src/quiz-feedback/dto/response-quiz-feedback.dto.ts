import { ApiProperty } from '@nestjs/swagger';
import { QuizFeedbackDto } from './quiz-feedback.dto';

export class ResponseQuizFeedbackDto {
  @ApiProperty()
  quizFeedback: QuizFeedbackDto[] = [];

  @ApiProperty()
  totalCorrectAnswer?: number;

  @ApiProperty()
  totalWrongAnswers?: number;
}
