document.getElementById('fetchBtn').addEventListener('click', async () => {
  console.log('ojisrsriojs');
  const response = await fetch('http://backend:3000/api/tasks');
  const tasks = await response.json();
  const list = document.getElementById('tasks');
  list.innerHTML = tasks.map((t) => `<li>${t.title}</li>`).join('');
});
