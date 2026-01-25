

import express from 'express';
import { createProduct, getAllProducts, getAllProductsUserById } from '../controller/productController.js';
const router = express.Router();



router.post('/product', createProduct)
router.get('/get-all-products', getAllProducts)
router.get('/get-all-products-user-by-id/:id', getAllProductsUserById)


// TODO: UPDATE 
// TODOO: DELETE



export default router


