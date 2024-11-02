"use strict";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.PORT);
const knexfile = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
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
    staging: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
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
            host: 'localhost',
            port: 5432,
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
    }
};
exports.default = knexfile;
