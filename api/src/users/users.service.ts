import {
  BadRequestException,
  ConflictException,
  Inject,
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
import { nanoid } from 'nanoid';

import { S3 } from 'aws-sdk';
import path from 'path';
import fs from 'fs';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username }
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

  async updateAvatar(userId: string, avatar: Express.Multer.File) {
    const avatarName = `${nanoid(8)}-${avatar.originalname}`;

    if (process.env.ENV === 'production') {
      const s3: S3 = new S3({
        region: process.env.AWS_BUCKET_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
      });

      await s3
        .putObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: avatarName,
          Body: avatar.buffer,
          ContentType: avatar.mimetype
        })
        .promise();
    } else {
      const uploadPath = path.resolve(__dirname, '..', '..', 'uploads');
      const localPath = path.join(uploadPath, avatarName);

      fs.writeFileSync(localPath, avatar.buffer);
    }

    const urlS3 = process.env.AWS_BUCKET_URL;

    const developmentServerUrl = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;

    const avatarUrl =
      process.env.ENV === 'procution'
        ? `${urlS3}/${avatarName}`
        : `${developmentServerUrl}/${avatarName}`;

    const user = await this.findOne(userId);

    const userUpdated = {
      ...user,
      avatar: avatarUrl
    };

    return this.userRepository.save(userUpdated);
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const loggedUser = await this.getAuthenticatedUser();
    const confirmCurrentPassword = await this.authService.validateUser(
      loggedUser.email,
      updatePasswordDto.currentPassword
    );

    if (!confirmCurrentPassword) {
      throw new BadRequestException('Senha atual incorreta!!');
    }

    if (updatePasswordDto.password !== updatePasswordDto.confirmPassword) {
      throw new BadRequestException('Senhas não coincidem');
    }

    const user = await this.userRepository.findOne({
      where: {
        email: loggedUser.email
      }
    });

    const userUpdated = this.userRepository.create({
      ...user,
      password: bcrypt.hashSync(updatePasswordDto.password, 10)
    });

    return this.userRepository.save(userUpdated);
  }

  async update(updateUserDto: UpdateUserDto) {
    const userAuthenticated = await this.getAuthenticatedUser();

    const userUpdated = this.userRepository.create({
      ...userAuthenticated,
      username: updateUserDto.username
    });

    return this.userRepository.save(userUpdated);
  }

  async softDelete() {
    const userAuthenticated = await this.getAuthenticatedUser();

    return this.userRepository.softDelete(userAuthenticated.id);
  }

  async getAuthenticatedUser() {
    const token = this.request.headers.authorization?.split(' ')[1];
    const userToken = await this.authService.getUserFromToken(token);
    return this.findOne(userToken.sub);
  }
}
