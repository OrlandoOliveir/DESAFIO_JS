import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const taskSchema = new mongoose.Schema({
  nome: String,
  status: String,
  data_agendado: Date
});

const Task = mongoose.model('tarefas', taskSchema);

router.post('/tasks', async (req, res) => {
  try {
    const { nome, status, data_agendado } = req.body;
    const newTask = await Task.create({ nome, status, data_agendado });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router; 