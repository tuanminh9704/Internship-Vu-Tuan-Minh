import express from 'express';
const router = express();

import { getAllUsers } from '../../controllers/admin/userController.js';

router.get('/', getAllUsers);

export default router;
