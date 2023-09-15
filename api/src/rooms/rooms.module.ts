import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { QuizMapper } from 'src/quiz/quiz.mapper.service';
import { QuizService } from 'src/quiz/quiz.service';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizFeedbackService } from 'src/quiz-feedback/quiz-feedback.service';
import { QuizFeedback } from 'src/quiz-feedback/entities/quiz-feedback.entity';
import { FeedbackQuizMapper } from 'src/quiz-feedback/quiz-feedback-mapper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Quiz, QuizFeedback]),
    JwtModule,
    AuthModule,
    UsersModule
  ],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    QuizMapper,
    QuizService,
    QuizFeedbackService,
    FeedbackQuizMapper
  ],
  exports: [RoomsService]
})
export class RoomsModule {}
