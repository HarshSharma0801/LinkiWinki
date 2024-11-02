import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
   await knex.schema.createTable('Url_Details' , table=>{
    table.increments('id').unique;
    table.string('username').notNullable();
    table.string('original_url').notNullable();
    table.string('shorten_url');
    table.string('shorten_id');
    table.integer('click_counts').defaultTo(0);
    table.integer('qr_counts').defaultTo(0);
   })
}


export async function down(knex: Knex): Promise<void> {
await knex.schema.dropTableIfExists('Url_Details');
}

