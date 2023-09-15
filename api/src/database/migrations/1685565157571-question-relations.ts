import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class QuestionRelations1685565157571 implements MigrationInterface {
  private table = 'questions';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      `${this.table}`,
      new TableForeignKey({
        columnNames: ['quiz_codigo'],
        referencedColumnNames: ['codigo'],
        referencedTableName: 'quiz',
        onDelete: 'CASCADE',
        name: 'FK_questions_quiz_codigo_quizes'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      `${this.table}`,
      'FK_questiosn_quiz_codigo_quizes'
    );
  }
}
