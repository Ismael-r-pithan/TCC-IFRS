import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateQuizFeedbackDto } from './dto/create-quiz-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizFeedback } from './entities/quiz-feedback.entity';
import { Repository } from 'typeorm';
import { QuizService } from 'src/quiz/quiz.service';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { UsersService } from 'src/users/users.service';
import { nanoid } from 'nanoid';
import { FeedbackQuizMapper } from './quiz-feedback-mapper.service';
import { ResponseQuizFeedbackDto } from './dto/response-quiz-feedback.dto';

@Injectable()
export class QuizFeedbackService {
  constructor(
    @InjectRepository(QuizFeedback)
    private readonly quizFeedbackRepository: Repository<QuizFeedback>,
    @Inject(QuizService) private readonly quizService: QuizService,
    @Inject(UsersService) private readonly userService: UsersService,
    @Inject(FeedbackQuizMapper)
    private readonly feedbackQuizMapper: FeedbackQuizMapper
  ) {}
  async create(
    codigoQuiz: string,
    createQuizFeedbackDto: CreateQuizFeedbackDto,
    payloadToken: PayloadTokenDto
  ) {
    const quiz = await this.quizService.getQuizOrException(codigoQuiz);
    const user = await this.userService.findOne(payloadToken.sub);

    if (createQuizFeedbackDto.quizAnswers.length !== quiz.questions.length) {
      throw new BadRequestException('Faltou responder questões');
    }

    const userHasAlreadyAnsweredQuiz = await this.quizFeedbackRepository
      .createQueryBuilder('feedback')
      .where('feedback.quiz_codigo = :codigo', { codigo: codigoQuiz })
      .andWhere('feedback.student_id = :userId', { userId: user.id })
      .getMany();

    if (userHasAlreadyAnsweredQuiz.length > 0) {
      throw new BadRequestException('Você já respondeu o quiz');
    }

    const questions = quiz.questions;

    const response: ResponseQuizFeedbackDto = {
      quizFeedback: [],
      totalCorrectAnswer: 0,
      totalWrongAnswers: 0
    };

    let totalCorrectAnswer = 0;
    let totalWrongAnswers = 0;

    for (let i = 0; i < questions.length; i++) {
      const answer = this.quizFeedbackRepository.create({
        ...questions[i],
        quiz: {
          codigo: quiz.codigo
        },
        studentAnswer: createQuizFeedbackDto.quizAnswers[i],
        student: {
          id: user.id
        },
        createdAt: new Date(),
        id: nanoid(10)
      });

      await this.quizFeedbackRepository.save(answer);

      if (answer.questionAnswer === answer.studentAnswer) {
        totalCorrectAnswer = totalCorrectAnswer + 1;
      } else {
        totalWrongAnswers = totalWrongAnswers + 1;
      }
      response.quizFeedback.push(this.feedbackQuizMapper.toResponse(answer));
    }

    return {
      ...response,
      totalCorrectAnswer,
      totalWrongAnswers
    };
  }

  feedbackCalc(feedback: QuizFeedback[]) {
    const response: ResponseQuizFeedbackDto = {
      quizFeedback: [],
      totalCorrectAnswer: 0,
      totalWrongAnswers: 0
    };

    const updatedResponse = feedback.reduce((acc, currentFeedback) => {
      acc.quizFeedback.push(
        this.feedbackQuizMapper.toResponse(currentFeedback)
      );

      if (currentFeedback.questionAnswer === currentFeedback.studentAnswer) {
        acc.totalCorrectAnswer++;
      } else {
        acc.totalWrongAnswers++;
      }

      return acc;
    }, response);

    return updatedResponse;
  }

  async feedbackQuizzesUser(id: string) {
    const feedback = await this.quizFeedbackRepository.find({
      where: {
        student: {
          id
        }
      },
      relations: ['quiz']
    });

    return this.filterDeistinctQuizzes(feedback);
  }

  async getStudentsQuiz(roomdId: string, codigoQuiz: string) {
    const allFeedbacksByQuiz = await this.quizFeedbackRepository.find({
      where: {
        quiz: {
          codigo: codigoQuiz,
          room: {
            id: roomdId
          }
        }
      },
      relations: ['student']
    });

    const students = allFeedbacksByQuiz.map((feedback) => feedback.student);
    return this.filterDeistinctStudents(students);
  }

  async feedbackQuizDetails(userId: string, codigoQuiz: string) {
    const quiz = await this.quizFeedbackRepository.find({
      where: {
        student: {
          id: userId
        },
        quiz: {
          codigo: codigoQuiz
        }
      }
    });
    return this.feedbackCalc(quiz);
    // return quiz.map((feedback) => this.feedbackQuizMapper.toResponse(feedback));
  }

  filterDeistinctQuizzes(quizzes: any) {
    const codigoSet = new Set();
    const quizzesUnicos = [];

    for (const feedback of quizzes) {
      if (!codigoSet.has(feedback.quiz.codigo)) {
        codigoSet.add(feedback.quiz.codigo);
        quizzesUnicos.push({
          name: feedback.quiz.name,
          codigo: feedback.quiz.codigo
        });
      }
    }

    return quizzesUnicos;
  }

  filterDeistinctStudents(students: any) {
    const idSet = new Set();
    const distinctStudents = [];

    for (const student of students) {
      if (!idSet.has(student.id)) {
        idSet.add(student.id);
        distinctStudents.push(student);
      }
    }

    return distinctStudents;
  }
}
