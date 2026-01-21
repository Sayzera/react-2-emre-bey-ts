import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'

import UserRoutes from './routes/userRoutes.js'


import posts from './jsonlar/posts.json' with { type: "json" }
import comments from './jsonlar/comments.json' with {type: "json"}
import albums from './jsonlar/albums.json' with {type: "json"}
import photos from './jsonlar/photos.json' with {type: "json"}
import todos from "./jsonlar/todos.json" with {type: "json"}
import users from "./jsonlar/users.json" with {type: "json"}
dotenv.config()

const app = express();

app.use(cors()) // cors-origin resource sharing - farklı domainlerden gelen istekleri kabul veya özelleştir
app.use(express.json()) // json formatındaki istekleri body parse ediyor
app.use(express.urlencoded({ extended: true })) // URL-encoded form verilerini parse et


/**
 * TODO: https://jsonplaceholder.typicode.com/ buradaki 
 * 
 * 
        /posts	100 posts           +
        /comments	500 comments    +
        /albums	100 albums          +
        /photos	5000 photos         +
        /todos	200 todos           +
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

// TODO: routes içerisinde uygun bir dosya açıp iç kısma çekelim ve prefiks verelim 
// iş kodlarınıda controler içerisindek ekleyelim 

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

app.get('/posts', (req, res) => {

    res.json({
        message: 'Kullanıcılar başarıyla getirildi',
        success: 200,
        data: posts
    })
})

app.get('/comments', (req, res) => {
    res.json({
        message: 'Yorumlar başarı ile getirildi.',
        success: 200,
        data: comments
    })
})

app.get('/albums', (req, res) => {
    res.json({
        message: "Albümler başarı ile getirildi.",
        success: 200,
        data: albums
    })
})

app.get('/photos', (req, res) => {
    res.json({
        message: "Fotoğraflar başarı ile getirildi.",
        success: 200,
        data: photos
    })
})

app.get("/todos", (req, res) => {
    res.json({
        message: "todos başarı ile getirildi.",
        success: 200,
        data: todos
    })
})

app.get("/users", (req, res) => {
    res.json({
        message: "Users başarı ile getirildi.",
        success: 200,
        data: users
    })
})

// routes 
app.use('/api', UserRoutes)

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