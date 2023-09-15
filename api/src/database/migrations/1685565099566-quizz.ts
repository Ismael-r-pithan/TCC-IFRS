import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Quiz1685565099566 implements MigrationInterface {
  private table = 'quiz';
  private schema = 'public';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.table,
        schema: this.schema,
        columns: [
          {
            name: 'codigo',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'author_id',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'room_id',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar',
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
            isNullable: true
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
          }
        ]
      })
    );
  }

  

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
