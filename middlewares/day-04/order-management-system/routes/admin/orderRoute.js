import express from 'express';
import { getAllOrders, updateOrderStatus } from '../../controllers/admin/orderController.js';
const router = express();

router.get('/', getAllOrders);

router.patch('/:id/status', updateOrderStatus);

export default router;
