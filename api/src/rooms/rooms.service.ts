import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { QuizMapper } from 'src/quiz/quiz.mapper.service';
import { ResponseQuizDto } from 'src/quiz/dto/response-quiz.dto';
import { nanoid } from 'nanoid';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @Inject(UsersService) private readonly userService: UsersService,
    @Inject(QuizMapper) private readonly quizMapper: QuizMapper
  ) {}

  async create(createRoomDto: CreateRoomDto, tokenPayload: PayloadTokenDto) {
    const user = await this.userService.findOne(tokenPayload?.sub);

    const room = this.roomRepository.create({
      id: nanoid(10),
      name: createRoomDto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      creator: user
    });
    return this.roomRepository.save(room);
  }

  findAll(tokenPayload: PayloadTokenDto) {
    return this.roomRepository.find({
      where: {
        creator: {
          id: tokenPayload.sub
        }
      }
    });
  }

  async findQuizzes(id: string): Promise<ResponseQuizDto[]> {
    const rooms = await this.roomRepository.findOne({
      where: {
        id
      },
      relations: ['quizzes']
    });
    if (!rooms) {
      throw new NotFoundException('Turma não encontrada');
    }
    return rooms.quizzes.map((quiz) => this.quizMapper.toResponse(quiz));
  }

  async getRoomOrException(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: {
        id
      }
    });

    if (!room) {
      throw new NotFoundException('Sala não encontrada');
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.findOne({
      where: {
        id
      }
    });
    const roomUpdated = this.roomRepository.create({
      ...room,
      name: updateRoomDto.name
    });

    return this.roomRepository.save(roomUpdated);
  }

  async delete(id: string) {
    return this.roomRepository.delete(id);
  }
}
