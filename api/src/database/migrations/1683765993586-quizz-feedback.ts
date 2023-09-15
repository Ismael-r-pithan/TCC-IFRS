import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class QuizFeedback1683765993586 implements MigrationInterface {
  private table = 'quiz_feedback';
  private schema = 'public';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.table,
        schema: this.schema,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'quiz_codigo',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'alternative_one',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'alternative_two',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'alternative_three',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'alternative_four',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'alternative_five',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'student_id',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'question_answer',
            type: 'int',
            isNullable: false
          },
          {
            name: 'student_answer',
            type: 'int',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false
          }
          // {
          //   name: 'id',
          //   type: 'varchar',
          //   isPrimary: true
          // },
          // {
          //   name: 'quiz_codigo',
          //   type: 'varchar',
          //   isNullable: false
          // },
          // {
          //   name: 'student_id',
          //   type: 'varchar',
          //   isNullable: false
          // },
          // {
          //   name: 'score',
          //   type: 'int',
          //   isNullable: false
          // },
          // {
          //   name: 'created_at',
          //   type: 'timestamp',
          //   default: 'now()',
          //   isNullable: false
          // },
          // {
          //   name: 'updated_at',
          //   type: 'timestamp',
          //   default: 'now()',
          //   isNullable: false
          // }
        ]
      })
    );
    await queryRunner.query(
      `ALTER TABLE "${this.schema}"."${this.table}" ADD CONSTRAINT "fk_quiz_feedback_student" FOREIGN KEY ("student_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${this.schema}"."${this.table}" DROP CONSTRAINT "fk_quiz_feedback_student"`
    );
    await queryRunner.dropTable(this.table);
  }
}
