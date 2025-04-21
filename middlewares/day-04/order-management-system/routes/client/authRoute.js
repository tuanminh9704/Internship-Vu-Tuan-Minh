import express from 'express';
const router = express();
import { register, login } from '../../controllers/client/authController.js';

router.post('/register', register);

router.post('/login', login);

export default router;
