import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from './entities/question.entity';
import { Repository } from 'typeorm';
import { QuestionMapper } from './question-mapper.service';
import * as uuid from 'uuid';
import { QuizService } from 'src/quiz/quiz.service';
import { ResponseQuestionDto } from './dto/response-question.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { ResponseQuestionListDto } from './dto/response-question-list.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
    @Inject(QuestionMapper) private readonly questionMapper: QuestionMapper,
    @Inject(QuizService) private readonly quizService: QuizService
  ) {}
  async create(
    createQuestionDto: CreateQuestionDto,
    quizCodigo: string
  ): Promise<ResponseQuestionDto> {
    const quiz = await this.quizService.getQuizOrException(quizCodigo);
    const question = this.questionsRepository.create({
      id: uuid.v4(),
      ...createQuestionDto,
      questionAnswer: +createQuestionDto.questionAnswer,
      quiz
    });

    const response = await this.questionsRepository.save(question);

    return this.questionMapper.toResponse(response);
  }

  async getQuiz(
    codigoQuiz: string,
    paginationDto: PaginationDto
  ): Promise<ResponseQuestionListDto> {
    const pagination: PaginationDto = {
      limit: paginationDto?.limit || 1,
      page: paginationDto?.page || 1
    };

    const take = pagination.limit;
    const skip = (pagination.page - 1) * take;

    await this.quizService.getQuizOrException(codigoQuiz);

    const result = await this.questionsRepository
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.quiz', 'quiz')
      .where('questions.quiz_codigo = :codigo', { codigo: codigoQuiz })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const questions: Questions[] = result[0];
    const total: number = result[1];

    const response: ResponseQuestionDto[] = questions.map((question) => {
      return this.questionMapper.toResponse(question);
    });

    return {
      questions: response,
      total
    };
  }
}
