import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/configs/database.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { QuizModule } from './quiz/quiz.module';
import { QuizFeedbackModule } from './quiz-feedback/quiz-feedback.module';
import { QuestionsModule } from './questions/questions.module';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.dev' }),
    RateLimiterModule.register({ points: 10, duration: 30 }),
    UsersModule,
    RoomsModule,
    QuizModule,
    QuizFeedbackModule,
    QuestionsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard
    }
  ]
})
export class AppModule {}
