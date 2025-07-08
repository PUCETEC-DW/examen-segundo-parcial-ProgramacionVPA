// In-memory storage for tasks
let tasks = [];

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find(task => task.id === id);
}

function addTask(task) {
  tasks.push(task);
}

function updateTask(id, updates) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    return true;
  }
  return false;
}

function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    return true;
  }
  return false;
}

function getSummary() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed);
  const averagePriority = pendingTasks.length > 0 ?
    (pendingTasks.reduce((sum, t) => sum + t.priority, 0) / pendingTasks.length) : 0;
  return {
    total,
    completed,
    averagePriority: Number(averagePriority.toFixed(2))
  };
}

function isDuplicateId(id) {
  return tasks.some(task => task.id === id);
}

export default {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  getSummary,
  isDuplicateId
};
