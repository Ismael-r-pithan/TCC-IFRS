import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'users', schema: 'public' })
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp'
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp'
  })
  deletedAt: Date;

  @OneToMany(() => Room, (room) => room.creator)
  rooms: Room[];

  @OneToMany(() => Quiz, (quiz) => quiz.author)
  quizzes: Quiz[];
}
