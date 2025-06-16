document.addEventListener('DOMContentLoaded', () => {
  const editTask = JSON.parse(localStorage.getItem('editTask'));
  if (editTask) {
    document.getElementById('task-name').value = editTask.nome;
    document.getElementById('task-status').value = editTask.status;
    document.getElementById('task-date').value = new Date(editTask.data_agendado).toISOString().split('T')[0];
  }

  document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('task-name').value;
    const status = document.getElementById('task-status').value;
    const data_agendado = document.getElementById('task-date').value;

    try {
      let response;
      if (editTask) {
        response = await fetch(`http://localhost:3000/api/tasks/${editTask._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, status, data_agendado })
        });
        localStorage.removeItem('editTask');
      } else {
        response = await fetch('http://localhost:3000/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, status, data_agendado })
        });
      }
      if (!response.ok) throw new Error('Erro ao salvar tarefa');
      window.location.href = 'index.html';
    } catch (error) {
      alert(error.message);
    }
  });
});
