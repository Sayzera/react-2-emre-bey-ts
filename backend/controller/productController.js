import { pool } from "../config/database.js";

const createProduct = async (req, res) => {

    try {

        /**
         * TODO: Standart validation
         * TODO : boyle bir user, users tablosunda var mı ? 
         */
        const {
            name,
            price,
            categoryName,
            user_id
        } = req.body;

        const result = await pool.query(`
        INSERT INTO products (name,price,categoryName,user_id) VALUES ($1, $2, $3, $4) RETURNING * 
    `, [name, price, categoryName, user_id])

        res
            .status(201)
            .json({
                success: true,
                message: 'Ürün başarılı bir şekilde oluşturuldu',
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

const getAllProducts = async (req, res) => {
    try {

        // GET ALL Products
        const result = await pool.query(`
            SELECT
                t1.*,
                t2.name AS user_name,
                t2.email AS user_email,
                t2.age AS user_age
            FROM 
                products t1
            INNER JOIN 
                users t2 ON t1.user_id = t2.id
            ORDER BY 
                t1.id ASC 
            `)

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

const getAllProductsUserById = async (req, res) => {
    try {
        // TODO: VALID CHECK

        const { id } = req.params;

        const result = await pool.query(`
            SELECT
                t1.*
            FROM 
                products t1
            WHERE 
                user_id = $1
            ORDER BY 
                t1.id ASC 
            `, [id])

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

export {
    createProduct,
    getAllProducts,
    getAllProductsUserById
}