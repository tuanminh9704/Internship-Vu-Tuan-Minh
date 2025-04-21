import express from 'express';
import conn from '../configs/database.js';
import { getAllProducts, addNewProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);

router.post('/products', addNewProduct);

router.put('/products/:id', updateProduct);


router.delete('/products/:id', deleteProduct);

export default router;