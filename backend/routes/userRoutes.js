
// es5  require('express')
import express from 'express';
import { getAllUsers, getByUser } from '../controller/userController.js';
const router = express.Router();



/**
 * Modülün Base Gereklilikleri 
 * Get All -> Tümünü getirir 
 * GET BY  -> İlgili kaydın detaylarını getir ve id kullanılır
 * 
 * 
 */


router.get('/users', getAllUsers)



/**
 * TODO: dinamik parametre nasıl yapılır göndersek veya göndermesekte kabul etmesi için nasıl bir çözüm bulabiliriz ?  
 */

router.get('/users/:id', getByUser);


router.post('/users', (req, res) => {

    const data = req.body;

    const userName = data?.name
    const lastname = data?.lastname;
    const password = data?.password;

    // if conditions

    // ...

    res.json({
        message: 'Sezer kullanıcısı başarıyla eklendi',
        success: true,
        data: {
            userName,
            lastname,
            password
        }
    })
})


// 

// router.delete() - Silme 

// router.put() - Güncelleme işlemi

// 



// ES6 ve sonrakiler için 
export default router


// ES5 için module.exports = router