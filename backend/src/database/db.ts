import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER as string,
    host: process.env.DB_HOST as string,
    database: process.env.DB_NAME as string,
    password: process.env.DB_PASSWORD as string,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    max: 20, // sets max pool size to 20
    idleTimeoutMillis: 30000, // closes idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // returns an error after 2 seconds if connection wasnt established
});

export default pool;