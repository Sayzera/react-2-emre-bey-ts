# Node.js ve React Karşılaştırması

## Node.js'de Bulunmayan Browser API'leri

Node.js bir tarayıcı ortamı değildir. Bu nedenle aşağıdaki browser API'leri bulunmaz:

- `document` - DOM manipülasyonu için kullanılır
- `window` - Tarayıcı pencere nesnesi
- `localStorage` - Yerel depolama
- `sessionStorage` - Oturum depolaması (cookie, session için alternatifler Node.js'de mevcuttur)
- `history` - Tarayıcı geçmişi
- `location` - URL bilgisi
- `navigator` - Tarayıcı bilgisi
- `screen` - Ekran bilgisi

## Node.js Neden Gereklidir?

### React ile Yapılamayan İşlemler

#### Dosya İşlemleri
- **File Actions**: React ile dosya yazma ve oluşturma işlemleri yapılamaz
- Bir dosyayı sunucuya yükleyemezsiniz

#### Güvenlik ve Veri Yönetimi
- **Gizli Bilgiler**: React ile hassas bilgileri güvenli şekilde saklayamazsınız
- **Veritabanı Bağlantıları**: React ile MySQL, PostgreSQL, NoSQL gibi veritabanlarına doğrudan bağlanamazsınız (cloud veritabanları dışında)
- **Güvenlik Yönetimi**: React ile güvenlik katmanını yönetemezsiniz

#### Performans ve Sistem Yönetimi
- **Trafik Yönetimi**: React ile sunucu tarafı trafik yönetimi yapılamaz
- **Büyük Cache İşlemleri**: React ile büyük ölçekli önbellekleme yapamazsınız

### Node.js ile Yapabilecekleriniz

- ✅ Kendi servislerinizi yazabilirsiniz
- ✅ Kendi teknolojilerinizi projeye entegre edebilirsiniz
- ✅ Dosya ile ilgili her türlü işlemi yapabilirsiniz
- ✅ Backend altyapısını tamamen kontrol edebilirsiniz