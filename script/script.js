let currentPage;
let tasks = [];

/**
 * This function is used to initialize
 * 
 * @param {string} page - This parameter is the current selected html page
 */
async function init(page) {
    if (page == 'index') {
        openPage('board.html')
    } else {
        currentPage = page;
        await includeHTML();
        await downloadFromServer();
        tasks = JSON.parse(backend.getItem('tasks')) || [];
        navbarSelection(page);
        forwardingNextFunctions(page);
    }
}

/**
 * 
 * This function is used to show the navbar
 * @param {string} page - This parameter is the current selected html page
 */
function navbarSelection(page) {
    if (page != 'index') {
        document.getElementById('navbarLinksSelection_' + page).style.backgroundColor = 'white';
    }
}

/**
 * This function is used to render the board or the backlog if one of them is opened
 * 
 * @param {string} page - This parameter is the current selected html page
 */
function forwardingNextFunctions(page) {
    if (page == 'board') {
        renderTasksAtBoard();
    }
    if (page == 'backlog') {
        renderBacklogTasks();
    }
}

/**
 * This function is used to save a task
 * 
 */
async function saveTasks() {
    let taskAsString = JSON.stringify(tasks);
    await backend.setItem('tasks', taskAsString);
}

/**
 * This function is used to open the new Site
 * 
 * @param {string} page - This parameter is the current selected html page
 */
function openPage(site) {
    window.open(site, "_self");
}