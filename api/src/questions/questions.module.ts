import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionMapper } from './question-mapper.service';
import { QuizService } from 'src/quiz/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './entities/question.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizMapper } from 'src/quiz/quiz.mapper.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Questions, Quiz, Room, User]), JwtModule],
  providers: [
    QuestionsService,
    QuestionMapper,
    QuizService,
    QuizMapper,
    RoomsService,
    UsersService,
    AuthService
  ],
  exports: [QuestionMapper]
})
export class QuestionsModule {}
