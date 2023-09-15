import { Quiz } from 'src/quiz/entities/quiz.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';

@Entity({ name: 'quiz_feedback', schema: 'public' })
export class QuizFeedback {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  description: string;

  @Column({
    name: 'alternative_one'
  })
  alternativeOne: string;

  @Column({
    name: 'alternative_two'
  })
  alternativeTwo: string;

  @Column({
    name: 'alternative_three'
  })
  alternativeThree: string;

  @Column({
    name: 'alternative_four'
  })
  alternativeFour: string;

  @Column({
    name: 'alternative_five'
  })
  alternativeFive: string;

  @Column({
    name: 'question_answer'
  })
  questionAnswer: number;

  @Column({
    name: 'student_answer'
  })
  studentAnswer: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp'
  })
  createdAt: Date;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_codigo' })
  quiz: Quiz;
}
