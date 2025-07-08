import express from 'express';
import taskController from '../controllers/taskController.js';

const router = express.Router();

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.get('/tasks/summary', taskController.getSummary);

export default router;
