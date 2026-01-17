// routes/userRoutes.js
// API route tanımları

const express = require('express');
const router = express.Router();

// Controller'ı import et
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// ROUTE TANIMLARI

// GET /api/users - Tüm kullanıcıları getir
router.get('/users', getAllUsers);

// GET /api/users/:id - Belirli bir kullanıcıyı getir
router.get('/users/:id', getUserById);

// POST /api/users - Yeni kullanıcı oluştur
router.post('/users', createUser);

// PUT /api/users/:id - Kullanıcıyı güncelle
router.put('/users/:id', updateUser);

// DELETE /api/users/:id - Kullanıcıyı sil
router.delete('/users/:id', deleteUser);

module.exports = router;
