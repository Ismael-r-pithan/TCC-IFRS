import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Questions1683765978565 implements MigrationInterface {
  private table = 'questions';
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
            name: 'question_answer',
            type: 'int',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
