// server.js
// Ana sunucu dosyası - Uygulama burada başlatılır

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Express uygulaması oluştur
const app = express();

// Middleware'ler
app.use(cors()); // CORS (Cross-Origin Resource Sharing) - Farklı domain'lerden istek kabul et
app.use(express.json()); // JSON formatındaki request body'leri parse et
app.use(express.urlencoded({ extended: true })); // URL-encoded form verilerini parse et

// Routes'ları import et
const userRoutes = require('./routes/userRoutes');

// Ana sayfa route'u
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Node.js CRUD API Çalışıyor!',
        version: '1.0.0',
        endpoints: {
            users: {
                getAll: 'GET /api/users',
                getById: 'GET /api/users/:id',
                create: 'POST /api/users',
                update: 'PUT /api/users/:id',
                delete: 'DELETE /api/users/:id'
            }
        }
    });
});

// API Routes - /api öneki ile kullan
app.use('/api', userRoutes);

// 404 - Route bulunamadı
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route bulunamadı'
    });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   🚀 Sunucu Başlatıldı!                ║
╠════════════════════════════════════════╣
║   📍 URL: http://localhost:${PORT}     ║
║   🌐 API: http://localhost:${PORT}/api ║
║   📊 Durum: Çalışıyor ✅               ║
╚════════════════════════════════════════╝
    `);
});

// Hata yakalama
process.on('unhandledRejection', (err) => {
    console.error('🚨 Yakalanmamış Promise Hatası:', err);
});
