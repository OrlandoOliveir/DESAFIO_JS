document.getElementById('refresh-btn').addEventListener('click', async(event) =>{
try {
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
        const tasks = await response.json();
        console.log('Tarefas carregadas com sucesso!');
        console.log(tasks);
    } else {
      throw new Error('Falha ao carregar tarefas');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar tarefas: ' + error.message);
  }
});


