import express from 'express';
import {addNewProduct, updateProduct, deleteProduct } from '../../controllers/admin/productController.js';
import {validateProduct} from '../../middlewares/validateProduct.js';
import { verifyTokenMiddleware, verifyUserAdmin } from '../../middlewares/authMiddleware.js';

const router = express();

router.post('/', validateProduct, addNewProduct)

router.put('/:id', validateProduct, updateProduct);

router.delete('/:id', validateProduct, deleteProduct);

export default router;
