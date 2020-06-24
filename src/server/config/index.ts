import * as dotenv from 'dotenv';

dotenv.config();

export default {
    mysql: {
        connectionLimit: 10,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_SCHEMA
    },
    auth: {
        secret: process.env.SECRET
    }
}