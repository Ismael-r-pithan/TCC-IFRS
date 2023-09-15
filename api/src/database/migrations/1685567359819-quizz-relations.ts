import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class QuizRelations1685567359819 implements MigrationInterface {
  private table = 'quiz';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      `${this.table}`,
      new TableForeignKey({
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        name: 'FK_quiz_user_id_users'
      })
    );

    await queryRunner.createForeignKey(
      `${this.table}`,
      new TableForeignKey({
        columnNames: ['room_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rooms',
        onDelete: 'CASCADE',
        name: 'FK_quiz_room_id_rooms'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(`${this.table}`, 'FK_quiz_user_id_users');
    await queryRunner.dropForeignKey(`${this.table}`, 'FK_quiz_room_id_rooms');
  }
}
