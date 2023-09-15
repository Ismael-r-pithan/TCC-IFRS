import { Quiz } from 'src/quiz/entities/quiz.entity';;
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'questions', schema: 'public' })
export class Questions {
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

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_codigo' })
  quiz: Quiz;
}
