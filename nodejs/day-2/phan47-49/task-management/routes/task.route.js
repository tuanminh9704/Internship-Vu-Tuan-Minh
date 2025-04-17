import { Router } from "express";
import { getListTask, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";
const router = Router();

router.get('/', getListTask);

router.post('/', createTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;