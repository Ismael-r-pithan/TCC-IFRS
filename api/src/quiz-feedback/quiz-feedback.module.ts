import { Module } from '@nestjs/common';
import { QuizFeedbackService } from './quiz-feedback.service';
import { QuizFeedback } from './entities/quiz-feedback.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { User } from 'src/users/entities/user.entity';
import { QuizService } from 'src/quiz/quiz.service';
import { QuizMapper } from 'src/quiz/quiz.mapper.service';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { Questions } from 'src/questions/entities/question.entity';
import { FeedbackQuizMapper } from 'src/quiz-feedback/quiz-feedback-mapper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizFeedback, Quiz, User, Questions]),
    RoomsModule,
    JwtModule,
    AuthModule
  ],
  providers: [
    QuizFeedbackService,
    QuizService,
    QuizMapper,
    UsersService,
    FeedbackQuizMapper
  ],
  exports: [FeedbackQuizMapper]
})
export class QuizFeedbackModule {}
