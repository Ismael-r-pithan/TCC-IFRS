import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Rooms1683759793465 implements MigrationInterface {
  private table = 'rooms';
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
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'creator_id',
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
            default: 'now()',
            isNullable: false
          }
        ]
      })
    );
    await queryRunner.query(
      `ALTER TABLE "${this.schema}"."${this.table}" ADD CONSTRAINT "fk_rooms_users_creator" FOREIGN KEY ("creator_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "${this.schema}"."${this.table}" DROP CONSTRAINT "fk_rooms_users_creator"`
    );
    await queryRunner.dropTable(this.table);
  }
}
