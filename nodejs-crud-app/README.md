# Node.js CRUD API - PostgreSQL ile Basit Örnek

Bu proje, öğrenciler için hazırlanmış çok temel bir Node.js CRUD API örneğidir. PostgreSQL veritabanı kullanılarak basit bir "users" tablosu üzerinde Create, Read, Update, Delete işlemleri yapılmaktadır.

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- PostgreSQL (v12 veya üzeri)
- npm veya yarn

## 🚀 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. PostgreSQL Veritabanı Oluşturun

PostgreSQL'e bağlanın ve veritabanını oluşturun:

```sql
CREATE DATABASE crud_app;
```

### 3. Tabloyu Oluşturun

`database.sql` dosyasındaki SQL kodunu çalıştırın veya manuel olarak:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Ortam Değişkenlerini Ayarlayın

`.env.example` dosyasını kopyalayıp `.env` adıyla kaydedin ve kendi veritabanı bilgilerinizi girin:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sizin_şifreniz
DB_NAME=crud_app
PORT=3000
```

### 5. Sunucuyu Başlatın

```bash
# Normal mod
npm start

# Geliştirme modu (otomatik yeniden başlatma)
npm run dev
```

Sunucu `http://localhost:3000` adresinde çalışacaktır.

## 📚 API Endpoints

### 1. Tüm Kullanıcıları Getir (GET)

```
GET http://localhost:3000/api/users
```

**Cevap Örneği:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Ahmet Yılmaz",
      "email": "ahmet@example.com",
      "age": 25,
      "created_at": "2024-01-17T10:30:00.000Z"
    }
  ]
}
```

### 2. Tek Kullanıcı Getir (GET)

```
GET http://localhost:3000/api/users/1
```

**Cevap Örneği:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "age": 25,
    "created_at": "2024-01-17T10:30:00.000Z"
  }
}
```

### 3. Yeni Kullanıcı Ekle (POST)

```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Mehmet Demir",
  "email": "mehmet@example.com",
  "age": 30
}
```

**Cevap Örneği:**
```json
{
  "success": true,
  "message": "Kullanıcı başarıyla oluşturuldu",
  "data": {
    "id": 2,
    "name": "Mehmet Demir",
    "email": "mehmet@example.com",
    "age": 30,
    "created_at": "2024-01-17T10:35:00.000Z"
  }
}
```

### 4. Kullanıcı Güncelle (PUT)

```
PUT http://localhost:3000/api/users/1
Content-Type: application/json

{
  "name": "Ahmet Yılmaz (Güncellendi)",
  "email": "ahmet.yeni@example.com",
  "age": 26
}
```

**Cevap Örneği:**
```json
{
  "success": true,
  "message": "Kullanıcı başarıyla güncellendi",
  "data": {
    "id": 1,
    "name": "Ahmet Yılmaz (Güncellendi)",
    "email": "ahmet.yeni@example.com",
    "age": 26,
    "created_at": "2024-01-17T10:30:00.000Z"
  }
}
```

### 5. Kullanıcı Sil (DELETE)

```
DELETE http://localhost:3000/api/users/1
```

**Cevap Örneği:**
```json
{
  "success": true,
  "message": "Kullanıcı başarıyla silindi"
}
```

## 📁 Proje Yapısı

```
nodejs-crud-app/
│
├── config/
│   └── database.js          # PostgreSQL bağlantı yapılandırması
│
├── controllers/
│   └── userController.js    # Kullanıcı işlemleri için controller
│
├── routes/
│   └── userRoutes.js        # API route tanımları
│
├── database.sql             # Veritabanı tablosu oluşturma SQL kodu
├── server.js                # Ana sunucu dosyası
├── .env.example             # Ortam değişkenleri örneği
├── .gitignore               # Git ignore dosyası
├── package.json             # Proje bağımlılıkları
└── README.md                # Bu dosya
```

## 🎯 Öğrenme Hedefleri

Bu projede öğrenciler şunları öğrenecek:

1. **Node.js ve Express.js** temellerini
2. **RESTful API** tasarımı ve HTTP metodları (GET, POST, PUT, DELETE)
3. **PostgreSQL** veritabanı bağlantısı ve SQL sorguları
4. **CRUD operasyonları** (Create, Read, Update, Delete)
5. **Async/Await** kullanımı
6. **Hata yönetimi** (Error Handling)
7. **Ortam değişkenleri** (.env kullanımı)
8. **API testi** (Postman veya Thunder Client ile)

## 🔧 Test Etme

API'yi test etmek için:

1. **Postman** kullanabilirsiniz
2. **Thunder Client** (VS Code eklentisi) kullanabilirsiniz
3. **curl** komutları kullanabilirsiniz

Örnek curl komutu:

```bash
# Tüm kullanıcıları getir
curl http://localhost:3000/api/users

# Yeni kullanıcı ekle
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","age":25}'
```

## 💡 İpuçları

- `.env` dosyasını asla git'e commit etmeyin
- Her değişiklikten sonra API'yi test edin
- SQL injection'dan korunmak için parametreli sorgular kullanın (pg kütüphanesi bunu otomatik yapar)
- Hata mesajlarını okumayı öğrenin

## 📖 Sonraki Adımlar

Bu temel yapıyı öğrendikten sonra ekleyebileceğiniz özellikler:

- [ ] Veri doğrulama (validation)
- [ ] Kullanıcı kimlik doğrulama (authentication)
- [ ] Sayfalama (pagination)
- [ ] Arama ve filtreleme
- [ ] İlişkisel tablolar (foreign keys)
- [ ] Middleware kullanımı
- [ ] Logging sistemi

## 🤝 Yardım

Sorularınız için:
- Node.js dokümantasyonu: https://nodejs.org/docs
- Express.js dokümantasyonu: https://expressjs.com
- PostgreSQL dokümantasyonu: https://www.postgresql.org/docs
