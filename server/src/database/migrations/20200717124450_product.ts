import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('product', (table) => {
    table.integer('id').primary();
    table.string('name').notNullable().unique();
    table.decimal('price').notNullable();
    table.integer('amount').notNullable();
    table.string('barcode').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('product');
}
