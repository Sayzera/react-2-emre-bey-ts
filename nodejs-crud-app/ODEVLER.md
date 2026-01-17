# 🎓 Öğrenci Ödevleri ve Pratik Çalışmalar

Bu dosya, öğrencinin projeyi geliştirmesi için ödev ve pratik çalışmalar içerir.

---

## 📚 Temel Seviye Ödevler

### Ödev 1: Proje Kurulumu
**Görev:**
1. Node.js ve PostgreSQL'i kurun
2. Projeyi çalıştırın
3. API'yi test edin (en az 3 endpoint)

**Teslim:**
- Çalışan API'nin ekran görüntüsü
- Postman test sonuçları

---

### Ödev 2: Yeni Alanlar Ekleyin
**Görev:**
Users tablosuna yeni alanlar ekleyin:
- `phone` (telefon numarası)
- `address` (adres)
- `city` (şehir)

**Adımlar:**
1. PostgreSQL'de tabloyu güncelleyin:
```sql
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users ADD COLUMN address TEXT;
ALTER TABLE users ADD COLUMN city VARCHAR(50);
```

2. Controller'da CREATE ve UPDATE fonksiyonlarını güncelleyin
3. Yeni alanlarla POST ve PUT istekleri test edin

**Teslim:**
- Güncellenmiş kod
- Test sonuçları

---

### Ödev 3: Validasyon Ekleyin
**Görev:**
Kullanıcı oluştururken ve güncellerken şu kontrolleri yapın:

- `name`: En az 3 karakter
- `email`: Geçerli email formatı (@, . içermeli)
- `age`: 18-100 arasında olmalı
- `phone`: 10-11 karakter

**İpucu:**
```javascript
// Örnek validasyon
if (name.length < 3) {
    return res.status(400).json({
        success: false,
        message: 'İsim en az 3 karakter olmalıdır'
    });
}
```

**Teslim:**
- Validasyon eklenmiş controller
- Başarısız validasyon test sonuçları

---

## 🚀 Orta Seviye Ödevler

### Ödev 4: Arama Özelliği
**Görev:**
İsme göre arama endpoint'i oluşturun:

```
GET /api/users/search?name=ahmet
```

**İpucu:**
```javascript
const searchUsers = async (req, res) => {
    const { name } = req.query;
    const result = await pool.query(
        'SELECT * FROM users WHERE name ILIKE $1',
        [`%${name}%`]
    );
    // ...
};
```

**Teslim:**
- Yeni endpoint kodu
- Test sonuçları

---

### Ödev 5: Sayfalama (Pagination)
**Görev:**
Kullanıcı listesine sayfalama ekleyin:

```
GET /api/users?page=1&limit=10
```

**İpucu:**
```javascript
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const offset = (page - 1) * limit;

const result = await pool.query(
    'SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2',
    [limit, offset]
);
```

**Teslim:**
- Sayfalama kodu
- Farklı page değerleri ile test sonuçları

---

### Ödev 6: Yeni Tablo Oluşturun - Posts
**Görev:**
Kullanıcıların gönderi (post) paylaşabileceği bir yapı oluşturun.

**1. Tablo Oluşturun:**
```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**2. Endpoint'ler Oluşturun:**
- GET /api/posts - Tüm gönderileri getir
- GET /api/posts/:id - Tek gönderi getir
- POST /api/posts - Yeni gönderi oluştur
- PUT /api/posts/:id - Gönderi güncelle
- DELETE /api/posts/:id - Gönderi sil
- GET /api/users/:userId/posts - Belirli kullanıcının gönderilerini getir

**3. İlişkisel Sorgu Örneği:**
```javascript
// Gönderiyi kullanıcı bilgisiyle birlikte getir
const result = await pool.query(`
    SELECT posts.*, users.name as author_name, users.email as author_email
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = $1
`, [id]);
```

**Teslim:**
- posts için controller ve routes
- Test sonuçları

---

## 🎯 İleri Seviye Ödevler

### Ödev 7: Authentication (Kimlik Doğrulama)
**Görev:**
Basit bir login sistemi oluşturun.

**1. Password Alanı Ekleyin:**
```sql
ALTER TABLE users ADD COLUMN password VARCHAR(255);
```

**2. bcrypt ile Şifre Hash'leme:**
```bash
npm install bcrypt
```

```javascript
const bcrypt = require('bcrypt');

// Kullanıcı oluştururken
const hashedPassword = await bcrypt.hash(password, 10);

// Login yaparken
const isMatch = await bcrypt.compare(password, user.password);
```

**3. Endpoint'ler:**
- POST /api/auth/register
- POST /api/auth/login

**Teslim:**
- Authentication kodu
- Register ve login test sonuçları

---

### Ödev 8: Middleware Oluşturun
**Görev:**
Log middleware ve error handling middleware oluşturun.

**1. Logger Middleware:**
```javascript
// middleware/logger.js
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};
```

**2. Error Handler Middleware:**
```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Sunucu hatası',
        error: err.message
    });
};
```

**3. server.js'de Kullanın:**
```javascript
app.use(logger);
// ... diğer middleware ve route'lar
app.use(errorHandler);
```

**Teslim:**
- Middleware kodları
- Log çıktıları

---

### Ödev 9: Dosya Yükleme
**Görev:**
Kullanıcı profil fotoğrafı yükleme özelliği ekleyin.

**1. Multer Yükleyin:**
```bash
npm install multer
```

**2. Dosya Yükleme Endpoint'i:**
```javascript
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/users/:id/avatar', upload.single('avatar'), async (req, res) => {
    // ...
});
```

**Teslim:**
- Dosya yükleme kodu
- Yüklenen dosya örnekleri

---

### Ödev 10: API Dokümantasyonu
**Görev:**
Swagger/OpenAPI ile API dokümantasyonu oluşturun.

**1. Swagger Yükleyin:**
```bash
npm install swagger-ui-express swagger-jsdoc
```

**2. server.js'de Yapılandırın:**
```javascript
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CRUD API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

**3. Route'larda JSDoc Ekleyin:**
```javascript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Tüm kullanıcıları getirir
 *     responses:
 *       200:
 *         description: Başarılı
 */
router.get('/users', getAllUsers);
```

**Teslim:**
- Swagger dokümantasyon URL'i (http://localhost:3000/api-docs)

---

## 🏆 Proje Ödevleri

### Proje 1: Blog Sistemi
**Özellikler:**
- Kullanıcı kaydı ve girişi
- Blog yazısı oluşturma, güncelleme, silme
- Yorum sistemi
- Kategoriler
- Beğeni/yıldız sistemi

---

### Proje 2: E-ticaret API
**Özellikler:**
- Ürün yönetimi
- Kategori yönetimi
- Sepet sistemi
- Sipariş yönetimi
- Kullanıcı adresleri

---

### Proje 3: Görev Yönetim Sistemi
**Özellikler:**
- Kullanıcılar ve roller
- Projeler
- Görevler (tasks)
- Görev atama
- Durum takibi (todo, in-progress, done)

---

## 📝 Kontrol Listesi

Öğrenci her ödevi tamamladığında işaretlesin:

- [ ] Ödev 1: Proje Kurulumu
- [ ] Ödev 2: Yeni Alanlar
- [ ] Ödev 3: Validasyon
- [ ] Ödev 4: Arama
- [ ] Ödev 5: Sayfalama
- [ ] Ödev 6: Posts Tablosu
- [ ] Ödev 7: Authentication
- [ ] Ödev 8: Middleware
- [ ] Ödev 9: Dosya Yükleme
- [ ] Ödev 10: API Dokümantasyonu

---

## 💡 Öğrenme Kaynakları

### Video Kaynaklar:
- freeCodeCamp: Node.js Full Course
- Traversy Media: Node.js & Express Projects
- The Net Ninja: Node.js Tutorial

### Döküman:
- https://nodejs.org/docs
- https://expressjs.com/en/guide/routing.html
- https://node-postgres.com/

### Kitaplar:
- "Node.js Design Patterns" - Mario Casciaro
- "Express in Action" - Evan Hahn

---

## 🎯 Başarı Kriterleri

Her ödev için:
- ✅ Kod çalışıyor ve test edilmiş
- ✅ Kodda yorum satırları var
- ✅ Hata durumları ele alınmış
- ✅ API test sonuçları mevcut
- ✅ Temiz ve okunabilir kod

Başarılar! 💪
