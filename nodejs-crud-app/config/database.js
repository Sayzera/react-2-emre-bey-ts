// config/database.js
// PostgreSQL veritabanı bağlantı yapılandırması

const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL bağlantı havuzu (connection pool) oluşturuyoruz
// Pool, birden fazla bağlantıyı yönetir ve performansı artırır
const pool = new Pool({
    host: process.env.DB_HOST,       // Veritabanı sunucu adresi
    port: process.env.DB_PORT,       // PostgreSQL portu (varsayılan: 5432)
    user: process.env.DB_USER,       // Veritabanı kullanıcı adı
    password: process.env.DB_PASSWORD, // Veritabanı şifresi
    database: process.env.DB_NAME    // Veritabanı adı
});

// Bağlantıyı test et
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Veritabanı bağlantı hatası:', err.message);
    } else {
        console.log('✅ PostgreSQL veritabanına başarıyla bağlanıldı!');
        release(); // Bağlantıyı serbest bırak
    }
});

// Hata durumlarını yakala
pool.on('error', (err) => {
    console.error('🚨 Beklenmeyen veritabanı hatası:', err);
});

module.exports = pool;
