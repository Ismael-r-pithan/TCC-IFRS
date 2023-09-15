import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { SignInDto } from './dto/sign-in.dto';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PayloadTokenDto } from './dto/payload-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any | null> {
    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (user) {
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (passwordMatch) {
        delete user.password;
        return user;
      }
    }
    throw new ForbiddenException('Invalid credentials');
  }

  async login({ email, password }: SignInDto) {
    const user = await this.validateUser(email, password);

    if (!user) {
      return new NotFoundException('Invalid credentials');
    }

    const userData: any = { ...user };
    delete userData.password;

    const token = this.jwtService.sign(
      { sub: userData?.id, email: userData?.email },
      { secret: process.env.JWT_SECRET }
    );
    return {
      user: userData,
      token: token
    };
  }

  async getUserFromToken(token: string): Promise<PayloadTokenDto> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      });
      return payload;
    } catch (e) {
      console.error('AuthService/getUserFromToken - ', { e });
      throw new ForbiddenException();
    }
  }
}
