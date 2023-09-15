import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QuizFeedbackService } from 'src/quiz-feedback/quiz-feedback.service';
import { QuizFeedback } from 'src/quiz-feedback/entities/quiz-feedback.entity';
import { QuizService } from 'src/quiz/quiz.service';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizMapper } from 'src/quiz/quiz.mapper.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { Room } from 'src/rooms/entities/room.entity';
import { FeedbackQuizMapper } from 'src/quiz-feedback/quiz-feedback-mapper.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, QuizFeedback, Quiz, Room]),
    JwtModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    QuizFeedbackService,
    QuizService,
    QuizMapper,
    RoomsService,
    FeedbackQuizMapper,
    AuthService
  ],
  exports: [UsersService]
})
export class UsersModule {}
