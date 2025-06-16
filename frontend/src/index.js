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
      C: { text: 'Concluído', class: 'concluido' },
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

      const completeBtn = taskRow.querySelector('.complete-btn');
      completeBtn.addEventListener('click', async () => {
        if (confirm('Deseja marcar esta tarefa como concluída?')) {
          try {
            const response = await fetch(
              `http://localhost:3000/api/tasks/${task._id}`,
              {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'C' }),
              }
            );
            if (!response.ok) throw new Error('Erro ao atualizar tarefa');
            alert('Tarefa marcada como concluída!');
            loadTasks();
          } catch (error) {
            alert('Erro ao concluir tarefa: ' + error.message);
          }
        }
      });

      const deleteBtn = taskRow.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', async () => {
        if (confirm('Deseja realmente excluir esta tarefa?')) {
          try {
            const response = await fetch(
              `http://localhost:3000/api/tasks/${task._id}`,
              {
                method: 'DELETE',
              }
            );
            if (!response.ok) throw new Error('Erro ao excluir tarefa');
            alert('Tarefa excluída com sucesso!');
            loadTasks();
          } catch (error) {
            alert('Erro ao excluir tarefa: ' + error.message);
          }
        }
      });

      const editBtn = taskRow.querySelector('.edit-btn');
      editBtn.addEventListener('click', () => {
        localStorage.setItem(
          'editTask',
          JSON.stringify({
            _id: task._id,
            nome: task.nome,
            status: task.status,
            data_agendado: task.data_agendado,
          })
        );
        window.location.href = 'new_task.html?edit=1';
      });
    });
  };

  refreshBtn.addEventListener('click', loadTasks);

  const emptyRow = document.createElement('div');
  emptyRow.className = 'task-row empty';
  emptyRow.textContent = 'Clique no botão ↻ para carregar as tarefas';
  taskGrid.appendChild(emptyRow);
});
