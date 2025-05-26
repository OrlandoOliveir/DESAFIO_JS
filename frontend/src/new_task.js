document.getElementById('task-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const taskData = {
    nome: document.getElementById('task-name').value,
    status: document.getElementById('task-status').value,
    data_agendado: document.getElementById('task-date').value
  };

  try {
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData)
    });

    if (response.ok) {
      alert('Tarefa criada com sucesso!');
      window.location.href = 'index.html';
    } else {
      throw new Error('Falha ao criar tarefa');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao criar tarefa: ' + error.message);
  }
});