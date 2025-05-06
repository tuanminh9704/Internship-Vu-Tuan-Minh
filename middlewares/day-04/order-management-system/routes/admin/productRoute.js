import express from 'express';
import {addNewProduct, updateProduct, deleteProduct } from '../../controllers/admin/productController.js';
import {validateProduct} from '../../middlewares/validateProduct.js';
import { verifyTokenMiddleware, verifyUserAdmin } from '../../middlewares/authMiddleware.js';

const router = express();

router.post('/', addNewProduct)

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;
