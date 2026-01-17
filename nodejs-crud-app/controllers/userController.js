// controllers/userController.js
// Kullanıcı işlemleri için tüm CRUD fonksiyonları

const pool = require('../config/database');

// 1️⃣ TÜM KULLANICILARI GETİR (READ - GET)
const getAllUsers = async (req, res) => {
    try {
        // SQL sorgusu: users tablosundaki tüm kayıtları getir
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
        
        res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        console.error('❌ Kullanıcıları getirirken hata:', error);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası',
            error: error.message
        });
    }
};

// 2️⃣ TEK BİR KULLANICIYI GETİR (READ - GET)
const getUserById = async (req, res) => {
    try {
        const { id } = req.params; // URL'den id parametresini al
        
        // SQL sorgusu: Belirli id'ye sahip kullanıcıyı getir
        // $1 = parametreli sorgu (SQL injection'dan korunmak için)
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        
        // Kullanıcı bulunamadıysa
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `ID: ${id} numaralı kullanıcı bulunamadı`
            });
        }
        
        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('❌ Kullanıcı getirirken hata:', error);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası',
            error: error.message
        });
    }
};

// 3️⃣ YENİ KULLANICI OLUŞTUR (CREATE - POST)
const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body; // Request body'den verileri al
        
        // Basit validasyon
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'İsim ve email alanları zorunludur'
            });
        }
        
        // SQL sorgusu: Yeni kullanıcı ekle ve eklenen veriyi geri döndür (RETURNING *)
        const result = await pool.query(
            'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
            [name, email, age]
        );
        
        res.status(201).json({
            success: true,
            message: 'Kullanıcı başarıyla oluşturuldu',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('❌ Kullanıcı oluştururken hata:', error);
        
        // Email unique constraint hatası
        if (error.code === '23505') {
            return res.status(400).json({
                success: false,
                message: 'Bu email adresi zaten kullanılıyor'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası',
            error: error.message
        });
    }
};

// 4️⃣ KULLANICI GÜNCELLE (UPDATE - PUT)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;
        
        // Önce kullanıcının var olup olmadığını kontrol et
        const checkUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        
        if (checkUser.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `ID: ${id} numaralı kullanıcı bulunamadı`
            });
        }
        
        // SQL sorgusu: Kullanıcıyı güncelle
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
            [name, email, age, id]
        );
        
        res.status(200).json({
            success: true,
            message: 'Kullanıcı başarıyla güncellendi',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('❌ Kullanıcı güncellerken hata:', error);
        
        // Email unique constraint hatası
        if (error.code === '23505') {
            return res.status(400).json({
                success: false,
                message: 'Bu email adresi başka bir kullanıcı tarafından kullanılıyor'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası',
            error: error.message
        });
    }
};

// 5️⃣ KULLANICI SİL (DELETE - DELETE)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        // SQL sorgusu: Kullanıcıyı sil ve silinen veriyi döndür
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        
        // Kullanıcı bulunamadıysa
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `ID: ${id} numaralı kullanıcı bulunamadı`
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Kullanıcı başarıyla silindi',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('❌ Kullanıcı silerken hata:', error);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası',
            error: error.message
        });
    }
};

// Controller fonksiyonlarını dışa aktar
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
