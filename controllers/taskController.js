import taskModel from "../models/taskModel.js";

function getTasks(req, res) {
  res.json(taskModel.getAllTasks());
}

function createTask(req, res) {
  const { id, title, description, priority } = req.body;
  if (!id || !title || !description || typeof priority !== "number") {
    return res.status(400).json({ error: "Faltan campos o son inválidos" });
  }
  if (taskModel.isDuplicateId(id)) {
    return res.status(400).json({ error: "ID duplicado" });
  }
  if (priority < 1 || priority > 5) {
    return res.status(400).json({ error: "La prioridad debe estar entre 1 y 5" });
  }
  const task = { id, title, description, completed: false, priority };
  taskModel.addTask(task);
  res.status(201).json(task);
}

function updateTask(req, res) {
  const { id } = req.params;
  const { completed } = req.body;
  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "El campo 'completed' debe ser booleano" });
  }
  const numId = isNaN(Number(id)) ? id : Number(id);
  const updated = taskModel.updateTask(numId, { completed });
  if (!updated) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json(taskModel.getTaskById(numId));
}

function deleteTask(req, res) {
  const { id } = req.params;
  const numId = isNaN(Number(id)) ? id : Number(id);
  const deleted = taskModel.deleteTask(numId);
  if (!deleted) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json({ message: "Tarea eliminada" });
}

function getSummary(req, res) {
  res.json(taskModel.getSummary());
}

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getSummary,
};
