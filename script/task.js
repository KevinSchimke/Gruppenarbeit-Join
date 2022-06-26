let tasks = [];

function createTask() {
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let catagory = document.getElementById('catagory');
    let urgency = document.getElementById('urgency');
    let description = document.getElementById('description');

    let task = {
        "title": title.value,
        "date": date.value,
        "catagory": catagory.value,
        "urgency": urgency.value,
        "description": description.value
    };

    tasks.push(task);
    console.log(task)
    title.value ='';
    date.value ='';
    catagory.value ='';
    urgency.value ='';
    description.value ='';

    taskAsString();
}

    async function taskAsString() {
    let taskAsString = JSON.stringify(tasks);
    await backend.setItem('tasks', taskAsString);
}

function cancelTask() {
    document.getElementById('title').value = '';
    document.getElementById('date').value = '';
    document.getElementById('catagory').value = '';
    document.getElementById('urgency').value = '';
    document.getElementById('description').value = '';
}