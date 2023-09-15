import { Injectable } from '@nestjs/common';
import { ResponseQuestionDto } from './dto/response-question.dto';
import { Questions } from './entities/question.entity';

@Injectable()
export class QuestionMapper {
  toResponse(entity: Questions): ResponseQuestionDto {
    return {
      alternativeOne: entity.alternativeOne,
      alternativeTwo: entity.alternativeTwo,
      alternativeThree: entity.alternativeThree,
      alternativeFour: entity.alternativeFour,
      alternativeFive: entity.alternativeFive,
      description: entity.description
    };
  }
}
