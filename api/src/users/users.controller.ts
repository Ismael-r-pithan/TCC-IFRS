import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QuizFeedbackService } from 'src/quiz-feedback/quiz-feedback.service';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePasswordDto } from './dto/update-password.dto';

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

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  findProfile() {
    return this.usersService.getAuthenticatedUser();
  }

  @Get(':id/quizzes')
  @UseGuards(AuthGuard('jwt'))
  findFeedback(@Param('id') id: string) {
    return this.quizFeedbackyService.feedbackQuizzesUser(id);
  }

  @Get(':id/quizzes/:codigo_quiz')
  @UseGuards(AuthGuard('jwt'))
  feedbackQuizDetails(
    @Param('id') id: string,
    @Param('codigo_quiz') codigoQuiz: string
  ) {
    return this.quizFeedbackyService.feedbackQuizDetails(id, codigoQuiz);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updateUserProfile(@Body() updateUserdDto: UpdateUserDto) {
    return this.usersService.update(updateUserdDto);
  }

  @Patch('avatar')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @Request() req: any,
    @UploadedFile() avatar: Express.Multer.File
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    const payloadToken = await this.authService.getUserFromToken(token);
    return this.usersService.updateAvatar(payloadToken.sub, avatar);
  }

  @Patch('reset-password')
  @UseGuards(AuthGuard('jwt'))
  resetPassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.updatePassword(updatePasswordDto);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  softDelete() {
    return this.usersService.softDelete();
  }
}
