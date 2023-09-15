import { Injectable } from '@nestjs/common';
import { ResponseQuizDto } from './dto/response-quiz.dto';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizMapper {
  toResponse(entity: Quiz): ResponseQuizDto {
    return {
      codigo: entity.codigo,
      name: entity.name
    };
  }
}
