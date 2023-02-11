let currentDraggedElement;

/**
 * This function allows to drop a dragged element
 * 
 * @param {*} ev - This parameter is the event
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * This function allows to drag an element 
 * 
 * @param {number} index - This parameter is the position at the tasks array
 */
function startDragging(index) {
    currentDraggedElement = index;
}

/**
 * This function is used to drop a task
 * 
 * @param {string} newStatus - This parameter is the new Status of the dragged and dropped object
 */
function dropTask(newStatus) {
    tasks[currentDraggedElement]['status'] = newStatus;
    Array.from(document.getElementsByClassName('area_toDo_draganddrop')).forEach(
        function (element) {
            element.classList.remove('area_toDo_draganddrop');
        }
    );
    endMoveToOtherBoard();
}

/**
 * This function ends the drag
 * 
 */
async function endMoveToOtherBoard() {
    await saveTasks()
    renderTasksAtBoard();
}

/**
 * This function adds a highlight to the board in which the task is dragged
 * 
 * @param {string} overColumn - This parameter is the hovered column at board
 */
function addHighlight(overColumn) {
    document.getElementById('tasks_' + `${overColumn}`).classList.add('area_toDo_draganddrop');
}

/**
 * This function removes the highlight after task is dropped
 * 
 * @param {string} besideColumn - This parameter was the hovered column at board
 */
function removeHighlight(besideColumn) {
    document.getElementById('tasks_' + `${besideColumn}`).classList.remove('area_toDo_draganddrop');
}

/**
 * This function is used to render the tasks in the board
 * 
 */
function renderTasksAtBoard() {
    renderBoards('todo');
    renderBoards('in_progress');
    renderBoards('testing');
    renderBoards('done');
}

/**
 * This function is used to render the board
 * 
 * @param {string} board - This parameter is the column at board
 */
function renderBoards(board) {
    let content = document.getElementById('tasks_' + board);
    content.innerHTML = '';
    let boardFiltered = tasks.filter(t => t['status'] == board)
    for (let i = 0; i < boardFiltered.length; i++) {
        const task = boardFiltered[i];
        let color = task['urgency'];
        let taskID = task['id'];
        content.innerHTML += templateRenderBoards(taskID, task);
        getTodoBorderLeft(taskID, color);
    }
}


/**
 * This function is used to set the border with different colors depeneding on urgency
 * 
 * @param {number} index - This parameter is the position of the array tasks
 * @param {string} color - This paramater is the color
 */
function getTodoBorderLeft(index, color) {
    document.getElementById(`board_task_${index}`).classList.add(`border_${color}`);
    document.getElementById(`user_name_board${index}`).classList.add(`color_${color}`)
}