import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Quiz } from './entities/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizMapper } from './quiz.mapper.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { QuizFeedback } from 'src/quiz-feedback/entities/quiz-feedback.entity';
import { QuizFeedbackService } from 'src/quiz-feedback/quiz-feedback.service';
import { Questions } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { QuestionsModule } from 'src/questions/questions.module';
import { FeedbackQuizMapper } from 'src/quiz-feedback/quiz-feedback-mapper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Room, User, QuizFeedback, Questions]),
    JwtModule,
    AuthModule,
    QuestionsModule,
    QuizFeedback
  ],
  controllers: [QuizController],
  providers: [
    QuizService,
    QuizMapper,
    RoomsService,
    UsersService,
    QuizFeedbackService,
    QuestionsService,
    FeedbackQuizMapper
  ],
  exports: [QuizService, QuizMapper]
})
export class QuizModule {}
