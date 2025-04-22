import express from 'express';
import { addNewOrders, getOrderByUserId } from '../../controllers/client/orderController.js';
import {verifyTokenMiddleware} from '../../middlewares/authMiddleware.js';


const router = express();

router.get('/', verifyTokenMiddleware, getOrderByUserId);

router.post('/', verifyTokenMiddleware, addNewOrders);

export default router;
