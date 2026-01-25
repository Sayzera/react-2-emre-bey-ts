
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config();






const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
})

pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )
`)

pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS age INTEGER    
`)


pool.query(`
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        categoryName TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    )
`)



// Bağlantıyı test et 

pool.connect((err, client, relase) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası: ', err.message)
    } else {
        console.log("Postgresql veritabanı başarıyla bağlanıldı!")
        relase()
    }
})

pool.on('error', (err) => {
    console.log("Beklenmeyen veritabanı hatası: ", err)
})


export {
    pool
}