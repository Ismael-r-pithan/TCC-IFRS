import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { ResponseQuizDto } from './dto/response-quiz.dto';
import { QuizFeedbackService } from 'src/quiz-feedback/quiz-feedback.service';
import { CreateQuizFeedbackDto } from 'src/quiz-feedback/dto/create-quiz-feedback.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { ResponseQuestionListDto } from 'src/questions/dto/response-question-list.dto';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { ResponseQuestionDto } from 'src/questions/dto/response-question.dto';
import { QuestionsService } from 'src/questions/questions.service';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'quizzes', version: '1' })
@ApiTags('Quizzes')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly quizFeedbackService: QuizFeedbackService,
    private readonly questionsService: QuestionsService,
    private readonly authService: AuthService
  ) {}

  @Post(':codigo_quiz/answer_quiz')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('codigo_quiz') codigoQuiz: string,
    @Body() createQuizFeedbackDto: CreateQuizFeedbackDto,
    @Request() req: any
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    const payloadToken = await this.authService.getUserFromToken(token);

    return this.quizFeedbackService.create(
      codigoQuiz,
      createQuizFeedbackDto,
      payloadToken
    );
  }

  @Post(':codigo_quiz/questions')
  createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Param('codigo_quiz') codigoQuiz: string
  ): Promise<ResponseQuestionDto> {
    return this.questionsService.create(createQuestionDto, codigoQuiz);
  }

  @Get(':codigo_quiz/questions')
  getQuestions(
    @Param('codigo_quiz') codigoQuiz: string,
    @Query() pagination: PaginationDto
  ): Promise<ResponseQuestionListDto> {
    return this.questionsService.getQuiz(codigoQuiz, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseQuizDto> {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto
  ): Promise<ResponseQuizDto> {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }
}
