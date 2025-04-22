import express from 'express';
import { getAllProduct} from '../../controllers/client/productController.js';

const router = express();

router.get('/',  getAllProduct);

export default router;
