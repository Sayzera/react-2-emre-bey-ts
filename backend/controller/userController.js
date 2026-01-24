
import { success, z } from 'zod'
/**
 * HTTP RESPONSE KODLARI araştırılacak 
 * proje içerisinde en çok kullanılan kodlar araştırılacak ve proje içerisinde hata kodları ile birlikte dönecek 
 * 
 * 
 *  * 200 - OK: Başarılı istek
    * 201 - Created: Yeni kayıt oluşturuldu
    * 400 - Bad Request: Eksik/hatalı parametre, geçersiz istek
    * 401 - Unauthorized: Yetkilendirme gerekli (token eksik/geçersiz)
    * 403 - Forbidden: Erişim yasak (yetki yok)
    * 404 - Not Found: Kayıt bulunamadı
    * 422 - Unprocessable Entity: İş mantığı hatası (validasyon hatası)
    * 500 - Internal Server Error: Sunucu hatası
    * 
    * 
    * 
    * 
    * 
    * 
    * 
    * TODO: Kullanıcı oluşturma formumuzun olduğu bir senaryo düşünelim form içerisinde 8 adet birbirinden farklı alanlar bulunmaktadır
    * bu alanlar içiersinde sizin belirlemiş olduğunuz validationlar bulunuyor 
    * bu validasyonu sadece backend taraflı kontrol edelim kullanıcının yaptığı hatayı backendden göndererek uygun bir kısımda gösterelim
    * Örn: Kullanıcı ad boş geçilemez
    * 
    * Eğer sizin isterleriniz doğru ve durumu karşılıyorsa kullanıcıya işlem başarı şeklinde durum kodu ve mesajı gönderiniz. 
 */

const getAllUsers = async (req, res) => {
    res.send({
        message: 'Tüm kullanıcılar başarıyla getirildi',
        success: true,
        data: {}
    })
}

const getByUser = async (req, res) => {
    console.log(req.query, "req")
    console.log(req.params, "params")

    const id = req.params?.id;


    res.status(401).send({
        deneme: 'xx'
    })
}

const createUser = async (req, res) => {

    const userSchema = z.object({
        name: z
            .string()
            .min(2, "En 2 karekter giriniz."),

        lastname: z
            .string()
            .min(2, "En 2 karekter giriniz."),
        password: z
            .string()
            .min(2, "En 2 karekter giriniz."),
    })

    const body = req.body;
    const result = userSchema.safeParse(body)

    let errors = result?.error


    if (errors) {
        errors = JSON.parse(errors.message)
        errors = errors?.map((item) => {
            return {
                message: item.message,
                path: item.path?.[0]
            }
        })
    }
    res
        .status(
            errors ? 400 : 200
        )
        .send({
            message: 'Kullanıcı başarıyla oluşturuldu',
            success: errors ? false : true,
            errorCode: errors ? 400 : 200,
            data: {
                body,
            },
            errors: errors ? errors : {}
        })
}




export {
    getAllUsers,
    getByUser,
    createUser
}