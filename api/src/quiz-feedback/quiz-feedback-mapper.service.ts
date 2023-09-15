import { Injectable } from '@nestjs/common';
import { QuizFeedbackDto } from './dto/quiz-feedback.dto';
import { QuizFeedback } from './entities/quiz-feedback.entity';

@Injectable()
export class FeedbackQuizMapper {
  toResponse(entity: QuizFeedback): QuizFeedbackDto {
    const questionAnswer: string = this.mapQuestionAnswer(
      entity,
      entity.questionAnswer
    );

    const studentAnswer: string = this.mapQuestionAnswer(
      entity,
      entity.studentAnswer
    );

    return {
      description: entity.description,
      questionAnswer,
      studentAnswer
    };
  }

  mapQuestionAnswer(entity: QuizFeedback, answerNumber: number) {
    switch (answerNumber) {
      case 1:
        return entity.alternativeOne;
      case 2:
        return entity.alternativeTwo;
      case 3:
        return entity.alternativeThree;
      case 4:
        return entity.alternativeFour;
      case 5:
        return entity.alternativeFive;
      default:
        return '';
    }
  }
}
