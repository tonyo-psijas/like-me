import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    allowExitOnIdle: true
});

const getHealth = async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        const result2 = await pool.query("SELECT * FROM posts");

        console.log("Base de datos conectada y funcionando a la fecha " + result.rows[0].now);
        console.log(result2.rows);

    } catch (error) {
        console.error("Error conectando a la base de datos: " + error);
    }
};

getHealth();

export default pool;