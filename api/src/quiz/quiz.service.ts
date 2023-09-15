import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { QuizMapper } from './quiz.mapper.service';
import { ResponseQuizDto } from './dto/response-quiz.dto';
import { nanoid } from 'nanoid';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @Inject(QuizMapper) private quizMapper: QuizMapper,
    @Inject(RoomsService) private roomService: RoomsService,
    @Inject(UsersService) private userService: UsersService
  ) {}

  async create(
    createQuizDto: CreateQuizDto,
    roomId: string,
    payloadToken: PayloadTokenDto
  ): Promise<ResponseQuizDto> {
    const author = await this.userService.getUserOrException(payloadToken.sub);
    const room = await this.roomService.getRoomOrException(roomId);

    const quiz = this.quizRepository.create({
      ...createQuizDto,
      codigo: nanoid(6).toUpperCase(),
      room,
      author
    });

    const response = await this.quizRepository.save(quiz);

    return this.quizMapper.toResponse(response);
  }

  async findAll(): Promise<ResponseQuizDto[]> {
    const quizzes = await this.quizRepository.find();

    const response: ResponseQuizDto[] = quizzes.map((quiz) =>
      this.quizMapper.toResponse(quiz)
    );
    return response;
  }

  async findOne(id: string): Promise<ResponseQuizDto> {
    const quiz = await this.getQuizOrException(id);

    return this.quizMapper.toResponse(quiz);
  }

  async update(
    id: string,
    updateQuizDto: UpdateQuizDto
  ): Promise<ResponseQuizDto> {
    const quiz = await this.getQuizOrException(id);

    const quizUpdated = this.quizRepository.create({
      ...quiz,
      ...updateQuizDto
    });

    const response = await this.quizRepository.save(quizUpdated);

    return this.quizMapper.toResponse(response);
  }

  async remove(id: string) {
    const quiz = await this.getQuizOrException(id);

    await this.quizRepository.softDelete(quiz.codigo);
  }

  async getQuizOrException(codigo: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: {
        codigo
      },
      relations: ['questions']
    });

    if (!quiz) {
      throw new NotFoundException('Quiz não encontrado');
    }

    return quiz;
  }
}
