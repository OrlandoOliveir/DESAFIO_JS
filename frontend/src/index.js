import _ from 'lodash';
document.addEventListener('DOMContentLoaded', () => {
  const refreshBtn = document.getElementById('refresh-btn');
  const taskGrid = document.getElementById('task-grid');
  const taskTemplate = document.getElementById('task-template');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      A: { text: 'Pendente', class: 'pendente' },
      P: { text: 'Em andamento', class: 'em_andamento' },
      F: { text: 'Concluído', class: 'concluido' },
    };
    return statusMap[status] || { text: status, class: '' };
  };

  const loadTasks = async () => {
    try {
      refreshBtn.disabled = true;
      refreshBtn.querySelector('.refresh-icon').textContent = '⌛';

      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Falha ao carregar tarefas');

      const tasks = await response.json();
      renderTasks(tasks);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar tarefas: ' + error.message);
    } finally {
      refreshBtn.disabled = false;
      refreshBtn.querySelector('.refresh-icon').textContent = '↻';
    }
  };

  const renderTasks = (tasks) => {
    taskGrid
      .querySelectorAll('.task-row:not(#task-template)')
      .forEach((row) => row.remove());

    if (tasks.length === 0) {
      const emptyRow = document.createElement('div');
      emptyRow.className = 'task-row empty';
      emptyRow.textContent =
        'Nenhuma tarefa encontrada. Clique em Atualizar para carregar.';
      taskGrid.appendChild(emptyRow);
      return;
    }

    tasks.forEach((task) => {
      const statusInfo = getStatusInfo(task.status);
      const taskRow = taskTemplate.cloneNode(true);

      taskRow.id = '';
      taskRow.style.display = '';
      taskRow.querySelector('.task-name').textContent = task.nome;
      taskRow.querySelector('.status-text').textContent = statusInfo.text;
      taskRow.querySelector('.task-status').className =
        `task-status ${statusInfo.class}`;
      taskRow.querySelector('.task-date').textContent = formatDate(
        task.data_agendado
      );

      taskGrid.appendChild(taskRow);
    });
  };

  refreshBtn.addEventListener('click', loadTasks);

  const emptyRow = document.createElement('div');
  emptyRow.className = 'task-row empty';
  emptyRow.textContent = 'Clique no botão ↻ para carregar as tarefas';
  taskGrid.appendChild(emptyRow);
});
