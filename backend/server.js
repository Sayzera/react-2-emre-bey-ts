import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'


import posts from './posts.json' with { type: "json" }

dotenv.config()

const app = express();

app.use(cors()) // cors-origin resource sharing - farklı domainlerden gelen istekleri kabul veya özelleştir
app.use(express.json()) // json formatındaki istekleri body parse ediyor
app.use(express.urlencoded({ extended: true })) // URL-encoded form verilerini parse et


/**
 * TODO: https://jsonplaceholder.typicode.com/ buradaki 
 * 
 * 
        /posts	100 posts
        /comments	500 comments
        /albums	100 albums
        /photos	5000 photos
        /todos	200 todos
        /users	10 users

        serivsleri oluşturalım tek tek once servise gideceğiz sonra jsonu kopyalayacağız 
 */

/**
 * get 
 * post 
 * put
 * delete 
 * patch
 * options 
 */

app.get('/info', (req, res) => {

    res.json({
        message: 'Node js bu v22.20.0 da çalışmaktadır.',
        success: 200,
        data: [
            {
                name: 'Sezer',
                job: "Sr.Full Stack Developer"
            },
            {
                name: 'Emre',
                job: "Sr.Full Stack Developer"
            }
        ]
    })

})

app.get('/posts', (req,res) => {

    res.json({
        message: 'Kullanıcılar başarıyla getirildi',
        success: 200,
        data: posts
    })
})

const PORT = process.env.PORT || 5000;

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
})


process.on('unhandledRejection', (err) => {
    console.error("Yakalanmış promise hatası: ", err)
})