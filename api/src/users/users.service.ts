import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ]
    });

    if (userExists) {
      throw new ConflictException('E-mail ou Username já cadastrado');
    }

    const user = this.userRepository.create({
      id: v4(),
      email: createUserDto.email,
      password: bcrypt.hashSync(createUserDto.password, 10),
      username: createUserDto.username,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    delete user.password;

    return user;
  }

  async getUserOrException(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    delete user.password;

    return user;
  }
}
