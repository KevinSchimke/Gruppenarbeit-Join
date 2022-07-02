/**
 * This function is used to open a task in a single view
 * 
 * @param {*} i - This is the task which is opened
 */
function openSingleView(i) {
    document.getElementById('task_overlay').classList.remove('d_none');
    editTask(i);
}

/**
 * This function is used to close the single view of a task
 * 
 */
function closeSingleView() {
    document.getElementById('task_overlay').classList.add('d_none');
}

/**
 * This function is used to render the tasks in the backlog
 * 
 */
function renderBacklogTasks() {
    let content = document.getElementById('content_backlog');
    content.innerHTML = '';
    for (let i = tasks.length - 1; i >= 0; i--) {
        const task = tasks[i];
        content.innerHTML += templateRenderBacklogTasks(task, i);
        getUrgencyBorderColour(task, i);
    }
}

/**
 * This function is used to get the border color for each urgency
 * 
 * @param {*} task - This is a task
 * @param {*} i - This is the task at the point i
 */
function getUrgencyBorderColour(task, i) {
    const color = task['urgency'];
    document.getElementById(`backlog_row_${i}`).classList.add(`border_${color}`);
}

/**
 * This function is used to get the font color for each urgency
 * 
 * @param {*} fontcolor - This is the fontcolor
 */
function geturgencyFontColor(fontcolor) {
    document.getElementById('urgency_overlay').classList.add(`color_${fontcolor}`)
}

/**
 * This function is used to edit a task which is already in the backlog and board
 * 
 * @param {string} id - 
 */
function editTask(id) {
    let content = document.getElementById('task_overlay');
    content.innerHTML = '';
    content.innerHTML = templateEditTask(id);
    loadInfosEditTask(id);
}

/**
 * This function is used to load all details which are in each task
 * 
 * @param {*} id - This is the task
 */
function loadInfosEditTask(id){
    document.getElementById('title').value = tasks[id]['title'];
    document.getElementById('date').value =  tasks[id]['date'];
    document.getElementById('urgency').value = tasks[id]['urgency'];
    document.getElementById('description').value = tasks[id]['description'];
}

/**
 * This function is used to save the edit the user made to a task
 * 
 * @param {*} id - This is the task
 */
async function saveEdit(id) {
    overwriteInfosEditTask(id);
    await saveTasks();
    reloadBacklog();
}

/**
 * This function is used to overwrite all infos with the current edit
 * 
 * @param {*} id - This is the task
 */
function overwriteInfosEditTask(id){
    tasks[id]['title'] = document.getElementById('title').value
    tasks[id]['date'] = document.getElementById('date').value
    tasks[id]['category'] = document.getElementById('catagory').value
    tasks[id]['urgency'] = document.getElementById('urgency').value
    tasks[id]['description'] = document.getElementById('description').value
}

/**
 * This function is used to delete a task
 * 
 * @param {*} i - This is the task at point i
 */
async function deleteTask(i) { 
    tasks.splice(i, 1);
    await saveTasks();
    reloadBacklog();
}

/**
 * This function is used to reload the backlog
 * 
 */
function reloadBacklog() {
    window.open("backlog.html", "_self");
}