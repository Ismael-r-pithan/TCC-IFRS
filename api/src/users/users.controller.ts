import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QuizFeedbackService } from 'src/quiz-feedback/quiz-feedback.service';
import { AuthService } from 'src/auth/auth.service';

@Controller({ path: 'users', version: '1' })
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly quizFeedbackyService: QuizFeedbackService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id/quizzes')
  findFeedback(@Param('id') id: string) {
    return this.quizFeedbackyService.feedbackQuizzesUser(id);
  }

  @Get(':id/quizzes/:codigo_quiz')
  feedbackQuizDetails(
    @Param('id') id: string,
    @Param('codigo_quiz') codigoQuiz: string
  ) {
    return this.quizFeedbackyService.feedbackQuizDetails(id, codigoQuiz);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
