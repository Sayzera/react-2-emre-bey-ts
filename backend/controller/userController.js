import { pool } from "../config/database.js";

// [C]RUD
const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // TODO: zod validation
        // res
        // .status(400)
        // .json({
        //     sucess:false,
        //     message: 'Lütfen tüm gerekli alanları doldurunuz',
        //     validationErros: [
        //         {
        //             message: 'Lütfen isim alanını doldurunuz',
        //             path: '[\'name\']'
        //         }
        //     ]
        // })

        // TODO: aynı email varsa kaydetme ve kullanıcıya bu email daha önce sistemizde mevcuttur şeklinde response don 

        const result = await pool.query(`
                INSERT INTO users (name,email,age) VALUES ($1, $2, $3) RETURNING * 
            `, [name, email, age])

        res
            .status(201)
            .json({
                success: true,
                message: 'Kullanıcı başarıyla oluşturuldu',
                data: result.rows
            })




    } catch (error) {
        res
            .status(500)
            .json({
                success: true,
                message: 'Bilinmeyen bir hata oluştu lütfen daha sonra tekrar deneyiniz',
                error: error
            })
    }
}

// C[R]UD
const getAllUsers = async (req, res) => {
    try {

        // GET ALL USERS
        const result = await pool.query(
            'SELECT * FROM users ORDER BY id ASC'
        )

        res
            .status(200)
            .json({
                success: true,
                count: result.rows.length,
                data: result.rows
            })

    } catch (error) {
        res
            .status(500)
            .json({
                success: true,
                message: 'Bilinmeyen bir hata oluştu lütfen daha sonra tekrar deneyiniz',
                error: error
            })
    }
}

// CR[U]D
const updateUserById = async (req, res) => {
    try {

        // TODO: id gerçekten var mı 

        const { id } = req.params;

        const { email, age } = req.body



        const checkUser = await pool.query(`
            SELECT * FROM users where id = $1
            `, [id])

        if (checkUser.rows.length === 0) {
            res
                .status(404)
                .json({
                    success: false,
                    message: 'Böyle bir kullanıcı bulunamadı.',
                })
        }

        const result = await pool.query(`
            UPDATE
                users
            SET
                email = $1, age = $2
            WHERE 
                id = $3 
            RETURNING  *
            `, [email, age, id])

        res
            .status(200)
            .json({
                success: true,
                count: result.rows.length,
                data: result.rows
            })

    } catch (error) {
        res
            .status(500)
            .json({
                success: true,
                message: 'Bilinmeyen bir hata oluştu lütfen daha sonra tekrar deneyiniz',
                error: error
            })
    }
}

// CRU[D]
const deleteUserById = async (req, res) => {
    try {
        //TODO: id varmı diye bakıyorum 
        const { id } = req.params;

        //TODO: id ye karşılık gelen kullanıcı var mı 

        const result = await pool.query(`
            DELETE 
                FROM users
            WHERE
                id = $1
            RETURNING id
            `, [id])
          

        res
            .status(200)
            .json({
                success: true,
                message: 'Kullanıcı başarıyla silindi',
                data: result.rows
            })
    } catch (error) {
        res
            .status(500)
            .json({
                success: true,
                message: 'Bilinmeyen bir hata oluştu lütfen daha sonra tekrar deneyiniz',
                error: error
            })
    }
}



export {
    createUser,
    getAllUsers,
    updateUserById,
    deleteUserById
}