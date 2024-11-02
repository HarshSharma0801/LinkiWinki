import knex from 'knex'
import knexfile from './knexfile'


const config = knexfile["production"];

const db = knex(config);

export default db;