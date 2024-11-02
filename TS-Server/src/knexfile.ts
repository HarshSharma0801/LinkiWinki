
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.PORT)
const knexfile = {

  development: {
    client: 'pg',
    connection: {
      connectionString:"postgres://default:sSc9EPgR6vOH@ep-white-bread-a43qrkm0.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'localhost' ,
      port: 5432 ,
      user: process.env.DATABASEUSER,
      password: process.env.PASSWORD,
      database: process.env.DATABASENAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString:"postgres://default:sSc9EPgR6vOH@ep-white-bread-a43qrkm0.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
    },  
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

export default knexfile;
