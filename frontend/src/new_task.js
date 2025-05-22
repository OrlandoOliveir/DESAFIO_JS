document.getElementById('save-btn').addEventListener('click', function(event) {
    
    event.preventDefault(); 

    const taskName = document.getElementById('task-name').value;
    const taskStatus = document.getElementById('task-status').value;
    const taskDueDate = document.getElementById('task-date').value;


    console.log(taskName, taskStatus, taskDueDate);

});
