
// es5  require('express')
import express from 'express';
import { createUser, getAllUsers, getByUser } from '../controller/userController.js';
const router = express.Router();



/**
 * Modülün Base Gereklilikleri 
 * Get All -> Tümünü getirir 
 * GET BY  -> İlgili kaydın detaylarını getir ve id kullanılır
 */
router.get('/list', getAllUsers)

/**
 * TODO: dinamik parametre nasıl yapılır göndersek veya göndermesekte kabul etmesi için nasıl bir çözüm bulabiliriz ?  
 */
router.get('/users/:id', getByUser);
router.post('/users',  createUser)




// ES6 ve sonrakiler için 
export default router


// ES5 için module.exports = router