import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { ResponseQuizDto } from 'src/quiz/dto/response-quiz.dto';
import { CreateQuizDto } from 'src/quiz/dto/create-quiz.dto';
import { QuizService } from 'src/quiz/quiz.service';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { QuizFeedbackService } from 'src/quiz-feedback/quiz-feedback.service';

@Controller({ path: 'rooms', version: '1' })
@ApiTags('Rooms')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly quizService: QuizService,
    private readonly authService: AuthService,
    private readonly quizFeedbackService: QuizFeedbackService
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createRoom(@Body() createRoomDto: CreateRoomDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenPayload = await this.authService.getUserFromToken(token);
    return this.roomsService.create(createRoomDto, tokenPayload);
  }

  @Post('/:room_id/quizzes')
  @UseGuards(AuthGuard('jwt'))
  async createQuiz(
    @Body() createQuizDto: CreateQuizDto,
    @Request() req: any,
    @Param('room_id') roomId: string
  ): Promise<ResponseQuizDto> {
    const token = req.headers.authorization?.split(' ')[1];
    const payloadToken = await this.authService.getUserFromToken(token);

    return this.quizService.create(createQuizDto, roomId, payloadToken);
  }

  @Get(':room_id/quizzes')
  @UseGuards(AuthGuard('jwt'))
  findQuizzes(@Param('room_id') id: string): Promise<ResponseQuizDto[]> {
    return this.roomsService.findQuizzes(id);
  }

  @Get(':room_id/quizzes/:codigo_quiz')
  @UseGuards(AuthGuard('jwt'))
  findStudentsByQuiz(
    @Param('room_id') id: string,
    @Param('codigo_quiz') codigoQuiz: string
  ): Promise<any> {
    // ): Promise<ResponseQuizDto[]> {
    return this.quizFeedbackService.getStudentsQuiz(id, codigoQuiz);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllRooms(@Request() req: any) {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenPayload: PayloadTokenDto =
      await this.authService.getUserFromToken(token);
    return this.roomsService.findAll(tokenPayload);
  }
}
