# ⚡ Hızlı Başlangıç

Öğrencim için hazırlanmış Node.js + PostgreSQL CRUD API projesi.

---

## 🎯 Ne Öğreneceksiniz?

Bu projede şunları öğreneceksiniz:
- ✅ Node.js ve Express.js temellerini
- ✅ PostgreSQL veritabanı bağlantısı
- ✅ RESTful API tasarımı
- ✅ CRUD operasyonları (Create, Read, Update, Delete)
- ✅ HTTP metodları (GET, POST, PUT, DELETE)
- ✅ Async/Await kullanımı
- ✅ Hata yönetimi

---

## 📂 Proje Yapısı

```
nodejs-crud-app/
│
├── 📁 config/
│   └── database.js              # PostgreSQL bağlantısı
│
├── 📁 controllers/
│   └── userController.js        # CRUD işlemleri
│
├── 📁 routes/
│   └── userRoutes.js            # API endpoint'leri
│
├── 📄 server.js                 # Ana sunucu dosyası
├── 📄 database.sql              # Veritabanı kurulum SQL'i
├── 📄 package.json              # Proje bağımlılıkları
│
├── 📖 README.md                 # Genel bilgiler
├── 📖 SETUP_GUIDE.md            # Adım adım kurulum
├── 📖 API_TESTS.md              # API test örnekleri
├── 📖 ODEVLER.md                # Pratik ödevler
└── 📄 QUICK_START.md            # Bu dosya
```

---

## 🚀 3 Adımda Başlayın

### 1️⃣ Gerekli Programları Kurun
- **Node.js:** https://nodejs.org (LTS versiyonu)
- **PostgreSQL:** https://www.postgresql.org/download/
- **Postman:** https://www.postman.com/downloads/ (API testi için)

### 2️⃣ Veritabanını Oluşturun
```sql
-- PostgreSQL'de çalıştırın
CREATE DATABASE crud_app;

-- Tabloyu oluşturun (database.sql dosyasından)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Örnek veri ekleyin
INSERT INTO users (name, email, age) VALUES
    ('Ahmet Yılmaz', 'ahmet@example.com', 25),
    ('Mehmet Demir', 'mehmet@example.com', 30);
```

### 3️⃣ Projeyi Başlatın
```bash
# nodejs-crud-app klasörüne gidin
cd nodejs-crud-app

# Bağımlılıkları yükleyin
npm install

# .env dosyası oluşturun (env.example.txt'den kopyalayın)
# DB_PASSWORD kısmını kendi şifrenizle değiştirin!

# Sunucuyu başlatın
npm run dev
```

**Başarılıysa şunu göreceksiniz:**
```
╔════════════════════════════════════════╗
║   🚀 Sunucu Başlatıldı!                ║
╠════════════════════════════════════════╣
║   📍 URL: http://localhost:3000        ║
║   🌐 API: http://localhost:3000/api    ║
║   📊 Durum: Çalışıyor ✅               ║
╚════════════════════════════════════════╝

✅ PostgreSQL veritabanına başarıyla bağlanıldı!
```

---

## 🧪 İlk Testinizi Yapın

### Tarayıcıda:
1. http://localhost:3000 - Ana sayfa
2. http://localhost:3000/api/users - Kullanıcı listesi

### Postman'de:
1. `API_TEST_COLLECTION.json` dosyasını import edin
2. Tüm endpoint'leri sırayla test edin

---

## 📚 Öğrenme Sırası

Önerilen öğrenme sırası:

### 1. Dökümantasyonu Okuyun (30 dakika)
- ✅ README.md
- ✅ SETUP_GUIDE.md

### 2. Kodu İnceleyin (1 saat)
- ✅ server.js - Ana yapıyı anla
- ✅ config/database.js - Veritabanı bağlantısını gör
- ✅ routes/userRoutes.js - Route'ları öğren
- ✅ controllers/userController.js - CRUD fonksiyonlarını incele

### 3. API'yi Test Edin (30 dakika)
- ✅ API_TESTS.md dosyasındaki tüm örnekleri deneyin
- ✅ Her endpoint'i Postman ile test edin
- ✅ Hata durumlarını test edin

### 4. Kodu Değiştirin (1-2 saat)
- ✅ Yeni alan ekleyin (örn: phone, address)
- ✅ Validasyon ekleyin
- ✅ Yeni endpoint oluşturun

### 5. Ödevleri Yapın
- ✅ ODEVLER.md dosyasındaki görevleri sırayla yapın

---

## 🎯 İlk Hedefleriniz

1. ✅ Sunucuyu başarıyla çalıştırın
2. ✅ Tüm endpoint'leri test edin
3. ✅ Yeni bir kullanıcı oluşturun
4. ✅ Kullanıcıyı güncelleyin
5. ✅ Kullanıcıyı silin
6. ✅ Her işlemin veritabanına yansıdığını kontrol edin

---

## ❓ Sorun mu Yaşıyorsunuz?

### "Veritabanı bağlantı hatası"
➡️ `.env` dosyasındaki şifreyi kontrol edin
➡️ PostgreSQL servisinin çalıştığından emin olun
➡️ `crud_app` veritabanını oluşturduğunuza emin olun

### "Port 3000 already in use"
➡️ `.env` dosyasında `PORT=3001` yapın

### "Cannot find module 'express'"
➡️ `npm install` komutunu tekrar çalıştırın

### "relation 'users' does not exist"
➡️ `database.sql` dosyasındaki SQL'i çalıştırın

**Daha fazla yardım için:** `SETUP_GUIDE.md` dosyasına bakın

---

## 📞 İletişim

Sorularınız için öğretmeninize ulaşın.

**Başarılar! 🚀 Öğrenirken eğlenin! 💻**

---

## 🔥 Pro İpuçları

1. **Her zaman terminali okuyun** - Hata mesajları çok değerlidir
2. **Küçük adımlarla ilerleyin** - Bir şeyi değiştirip test edin
3. **console.log kullanın** - Debug yaparken en iyi arkadaşınız
4. **Postman collection'ınızı kaydedin** - Test sonuçlarınızı saklayın
5. **Kodu kopyala-yapıştır yapmayın** - Yazarak öğrenirsiniz
6. **Google kullanın** - Hata mesajlarını aratın
7. **Stack Overflow sizin dostunuz** - Çoğu sorunun cevabı orada

---

## 🎓 Sonraki Adımlar

Temel CRUD'u öğrendikten sonra:
- [ ] Authentication (JWT)
- [ ] Validation (joi, express-validator)
- [ ] Middleware'ler
- [ ] İlişkisel tablolar (Foreign Keys)
- [ ] Dosya yükleme (Multer)
- [ ] API dokümantasyonu (Swagger)
- [ ] Testing (Jest, Supertest)
- [ ] Deployment (Heroku, Railway)

Başarılar! 💪
