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

router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, status, data_agendado } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { nome, status, data_agendado },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export default router;