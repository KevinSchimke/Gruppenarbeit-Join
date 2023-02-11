/**
 * This function is used to open a task in a single view
 * 
 * @param {number} i - This parameter is the position at the tasks array
 */
function openSingleView(i) {
    document.getElementById('task_overlay').classList.remove('d-none');
    document.getElementById('body').classList.add('noFlowByOpenCard');
    editTask(i);
}

/**
 * This function is used to close the single view of a task
 * 
 */
function closeSingleView() {
    document.getElementById('task_overlay').classList.add('d-none');
    document.getElementById('body').classList.remove('noFlowByOpenCard');
}

/**
 * This function is used to render the tasks of the backlog
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
 * @param {object} task - This parameter is a task object at position i
 * @param {number} i - This parameter is the position at the tasks array
 */
function getUrgencyBorderColour(task, i) {
    const color = task['urgency'];
    document.getElementById(`backlog_row_${i}`).classList.add(`border_${color}`);
}

/**
 * This function is used to get the font color for each urgency
 * 
 * @param {string} fontcolor - This is the fontcolor
 */
function geturgencyFontColor(fontcolor) {
    document.getElementById('urgency_overlay').classList.add(`color_${fontcolor}`)
}

/**
 * This function is used to edit a task which is already in the backlog and board
 * 
 * @param {string} id - This parameter is the position at the tasks array
 */
function editTask(id) {
    let content = document.getElementById('task_overlay');
    content.innerHTML = '';
    content.innerHTML = templateEditTask(id);
    disableButton();
    loadInfosEditTask(id);
}

function disableButton() {
    if (window.location.pathname == "/board.html") {
        document.getElementById('buttonMoveToBoard').classList.add('d-none')
    }
}

/**
 * This function is used to load all details which are in each task
 * 
 * @param {number} id - This parameter is the position at the tasks array
 */
function loadInfosEditTask(id) {
    document.getElementById('title').value = tasks[id]['title'];
    document.getElementById('date').value = tasks[id]['date'];
    document.getElementById('urgency').value = tasks[id]['urgency'];
    document.getElementById('description').value = tasks[id]['description'];
}

/**
 * This function is used to save the edit the user made to a task
 * 
 * @param {number} id - This parameter is the position at the tasks array
 */
async function saveEdit(id) {
    overwriteInfosEditTask(id);
    await saveTasks();
    openPage('backlog.html');
}

/**
 * This function is used to overwrite all infos with the current edit
 * 
 * @param {number} id - This parameter is the position at the tasks array
 */
function overwriteInfosEditTask(id) {
    tasks[id]['title'] = document.getElementById('title').value
    tasks[id]['date'] = document.getElementById('date').value
    tasks[id]['category'] = document.getElementById('catagory').value
    tasks[id]['urgency'] = document.getElementById('urgency').value
    tasks[id]['description'] = document.getElementById('description').value
}

/**
 * This function is used to delete a task
 * 
 * @param {number} i - This parameter is the position at the tasks array
 */
async function deleteTask(i) {
    tasks.splice(i, 1);
    setNewIdForEachTask();
    await saveTasks();
    openPage('backlog.html');
}

/**
 * This function is used to change the Status of a task from 'Backlog' to 'TODO'
 * 
 * @param {number} id - This parameter is the position at the tasks array
 */
async function moveToBoard(id) {
    currentStatus = tasks[id]['status'];
    if (currentStatus == 'backlog') {
        tasks[id]['status'] = 'todo'
    }
    await saveTasks();
    openPage('board.html');
}

/**
 * This function is used to set task id to its position of tasks array if its not empty
 */
function setNewIdForEachTask() {
    for (let i = 0; i < tasks.length; i++) {
        tasks[i]['id'] = i;
    }
}