/**
 * Template for the document backlog.js and function renderBacklogTasks()
 * 
 * @param {object} task - This parameter is the object at position i of the tasks array
 * @param {number} i - This parameter is the position at the tasks array
 * @returns 
 */
function templateRenderBacklogTasks(task, i) {
    return /*html*/`
    <div onclick="openSingleView(${i})" id="backlog_row_${i}" class="backlog_rows">
        <div class="backlog_user">
            <img class="backlog_user_pic" src="img/${task['user']}.jpg" alt="">
            <p class="backlog_user_name">${task['user']}</p>
    </div>
    <div class="backlog_title">
        <p class="backlog_task_title">${task['title']}</p>
    </div>
    <div class="backlog_category">
        <p class="backlog_task_category">${task['catagory']}</p>
    </div>
    <div class="backlog_details">
        <p class="backlog_task_details">${task['description']}</p>
    </div>
</div>
    `
}

/**
 * Template for the document backlog.js and function editTask()
 * 
 * @param {number} id - This parameter is the position at the tasks array
 * @returns 
 */
function templateEditTask(id) {
    return /*html*/`
    <div class="card card_singleView" onclick="event.stopPropagation()">
            <form onsubmit="event.preventDefault(), saveEdit(${id})">
                <div class="addTask">
                    <div class="addTaskChild fontColor">
                        <div class="catagoryHeadline">TITLE</div>
                        <input required minlength="2" class="userInput" id="title" type="text" placeholder="Give your task a title">
                    </div>
                    <div class="addTaskChild fontColor">
                        <div class="catagoryHeadline">DUE DATE</div>
                        <input required class="userInput" type="date" id="date">
                    </div>
                </div>
                <div class="addTask">
                    <div class="addTaskChild fontColor">
                        <div class="catagoryHeadline">CATAGORY</div>
                        <select required class="userSelect" id="catagory">
                            <option>Marketing</option>
                            <option>Development</option>
                            <option>Design</option>
                        </select>
                    </div>
                    <div class="addTaskChild fontColor">
                        <div class="catagoryHeadline">URGENCY</div>
                        <select required class="userSelect" id="urgency">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                </div>
                <div class="addTask">
                    <div class="addTaskChild fontColor">
                        <div class="catagoryHeadline"> DESCRIPTION </div>
                        <textarea required minlength="5" class="description" type="text" placeholder="Type a description of your task" id="description"></textarea>
                    </div>
                    <div class="addTaskChild fontColor">
                        <div class="btnContainer">
                            <button onclick="deleteTask(${id})" class="createbtn background_4" type="submit">Delete</button>
                            <button class="createbtn" type="submit">SAVE EDIT</button>
                            <button id="buttonMoveToBoard" onclick="moveToBoard(${id})" class="createbtn background_3" type="submit">Move to Board</button>
                        </div>
                    </div>
                </div>
            </form>
    </div>
`
}
/**
 * Template for the document board.js and function renderBoards()
 * 
 * @param {number} index - This parameter is the position at the tasks array
 * @param {object} task - This parameter is the object at position i of the tasks array
 * @returns 
 */
function templateRenderBoards(index, task) {
    return /*html*/`
    <div onclick="openSingleView(${index})" ondragstart="startDragging(${index})" draggable="true" id="board_task_${index}" class="board_task">
        <p class="board_task_date">${task['date']}</p>
        <p class="board_task_title">${task['title']}</p>
        <p id="user_name_board${index}" class="board_task_assigned_name">${task['user']}</p>
        <div class="board_task_details">
            <p class="details_text">${task['description']}</p>
        </div>
    </div>
    `
}