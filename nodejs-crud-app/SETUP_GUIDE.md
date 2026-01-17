# 🎯 Node.js CRUD API - Adım Adım Kurulum Rehberi

Bu rehber, projeyi sıfırdan kurmak için gereken tüm adımları içerir.

## 📦 1. Adım: Gerekli Programları Yükleyin

### Node.js Kurulumu
1. https://nodejs.org adresine gidin
2. LTS (Long Term Support) versiyonunu indirin
3. Kurulum tamamlandıktan sonra terminalde test edin:
```bash
node --version
npm --version
```

### PostgreSQL Kurulumu
1. https://www.postgresql.org/download/ adresine gidin
2. İşletim sisteminize uygun versiyonu indirin
3. Kurulum sırasında şifre belirleyin (bu şifreyi unutmayın!)
4. Port numarasını 5432 olarak bırakın

## 🗄️ 2. Adım: Veritabanı Oluşturun

### pgAdmin veya psql ile:

1. PostgreSQL'e bağlanın
2. Yeni bir veritabanı oluşturun:
```sql
CREATE DATABASE crud_app;
```

3. `crud_app` veritabanına bağlanın

4. `database.sql` dosyasındaki SQL kodunu çalıştırın veya manuel olarak:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Örnek veriler ekleyin (opsiyonel):
```sql
INSERT INTO users (name, email, age) VALUES
    ('Ahmet Yılmaz', 'ahmet@example.com', 25),
    ('Mehmet Demir', 'mehmet@example.com', 30),
    ('Ayşe Kaya', 'ayse@example.com', 28);
```

## ⚙️ 3. Adım: Projeyi Kurun

### Terminal/CMD'de şu komutları çalıştırın:

```bash
# nodejs-crud-app klasörüne gidin
cd nodejs-crud-app

# Bağımlılıkları yükleyin
npm install
```

Bu komut şu paketleri yükleyecek:
- `express`: Web framework
- `pg`: PostgreSQL client
- `dotenv`: Ortam değişkenleri
- `cors`: Cross-origin istekleri
- `nodemon`: Otomatik sunucu yenileme (development)

## 🔐 4. Adım: Ortam Değişkenlerini Ayarlayın

1. `env.example.txt` dosyasını kopyalayın
2. Dosya adını `.env` olarak değiştirin
3. İçeriği düzenleyin:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=SİZİN_ŞİFRENİZ_BURAYA  # PostgreSQL kurulumunda belirlediğiniz şifre
DB_NAME=crud_app
PORT=3000
```

**ÖNEMLİ:** 
- `DB_PASSWORD` kısmına kendi PostgreSQL şifrenizi yazın!
- `.env` dosyası `.gitignore` içinde olduğu için git'e gönderilmez

## 🚀 5. Adım: Sunucuyu Başlatın

### Normal Mod:
```bash
npm start
```

### Geliştirme Modu (Otomatik yeniden başlatma):
```bash
npm run dev
```

Başarılı olursa terminalde şunu görmelisiniz:
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

## 🧪 6. Adım: API'yi Test Edin

### Tarayıcıda Test:

1. Tarayıcınızda http://localhost:3000 adresine gidin
2. Ana sayfayı görmelisiniz

3. http://localhost:3000/api/users adresine gidin
4. Kullanıcı listesini JSON formatında görmelisiniz

### Postman ile Test:

1. Postman'i indirin: https://www.postman.com/downloads/
2. `API_TEST_COLLECTION.json` dosyasını import edin
3. Her bir endpoint'i test edin

### Thunder Client ile Test (VS Code):

1. VS Code Extensions'dan "Thunder Client" yükleyin
2. Sol taraftaki şimşek ikonuna tıklayın
3. "New Request" ile istek oluşturun

## 🔥 Sık Karşılaşılan Hatalar ve Çözümleri

### ❌ "Veritabanı bağlantı hatası"
**Çözüm:**
- PostgreSQL servisinin çalıştığından emin olun
- `.env` dosyasındaki şifrenin doğru olduğunu kontrol edin
- `DB_NAME` olarak belirttiğiniz veritabanının oluşturulduğundan emin olun

### ❌ "Port 3000 already in use"
**Çözüm:**
- `.env` dosyasında `PORT=3001` yapın (veya başka bir port)
- Veya 3000 portunu kullanan uygulamayı kapatın

### ❌ "Cannot find module 'express'"
**Çözüm:**
- `npm install` komutunu tekrar çalıştırın
- `node_modules` klasörünün oluştuğundan emin olun

### ❌ "relation 'users' does not exist"
**Çözüm:**
- `database.sql` dosyasındaki SQL kodunu çalıştırmayı unutmuşsunuz
- pgAdmin veya psql'de tabloyu oluşturun

## 📚 Öğrenme Sırası

1. **Önce Okuyun:**
   - `README.md` - Genel bilgiler
   - `SETUP_GUIDE.md` - Bu dosya

2. **Kod İnceleyin:**
   - `server.js` - Ana sunucu yapısını anlayın
   - `config/database.js` - Veritabanı bağlantısını inceleyin
   - `routes/userRoutes.js` - Route tanımlarını görün
   - `controllers/userController.js` - CRUD fonksiyonlarını öğrenin

3. **Pratikte Test Edin:**
   - Postman ile tüm endpoint'leri test edin
   - Her endpoint'in nasıl çalıştığını gözlemleyin
   - Hata durumlarını test edin (örn: olmayan ID)

4. **Kodu Değiştirin:**
   - Yeni alanlar ekleyin (örn: `phone`, `address`)
   - Yeni endpoint'ler ekleyin
   - Validasyon kuralları ekleyin

## 🎓 Öğrenme Kaynakları

- **Node.js:** https://nodejs.org/en/docs/
- **Express.js:** https://expressjs.com/
- **PostgreSQL:** https://www.postgresql.org/docs/
- **RESTful API:** https://restfulapi.net/

## 💡 İpuçları

- Her değişiklikten sonra kodu kaydedin
- `nodemon` kullanıyorsanız sunucu otomatik yeniden başlar
- Terminal'deki hata mesajlarını okuyun
- `console.log()` ile debug yapın
- Postman'de request'lerinizi collection'lara kaydedin

## 📞 Yardım

Herhangi bir sorun yaşarsanız:
1. Terminaldeki hata mesajını okuyun
2. Google'da hata mesajını aratın
3. Stack Overflow'da benzer sorunlara bakın
4. Öğretmeninize sorun

---

**Başarılar! 🚀**
