import express from 'express';
import { verifyTokenMiddleware, verifyUserAdmin } from '../../middlewares/authMiddleware.js';

const router = express();

import { getAllUsers,changeStatusUser } from '../../controllers/admin/userController.js';

router.get('/', getAllUsers);

router.patch('/:id/lock', changeStatusUser);

export default router;
