import Project from "../class/Project.js";
import Task from "../class/Task.js";

const TODO_APP = (function() {
    // default project list for now until LocalStorage is implemented
    let PROJECT_LIST = [];
    let TASK_LIST = [];

    function createTask(title, description, due, priority, projectId) {
        const id = generateId();
        const task = new Task(title, description, due, priority, id, projectId);
        return task;
    }

    function createProject() {
        const id = generateId();
        const project = new Project("test project", id);
        return project;
    }

    
    // Helpers
    let tempId = -1;
    function generateId() {
        tempId++
        return tempId;
        // return crypto.randomUUID();
    }
    
    function addProjectToProjectList(project) {
        PROJECT_LIST.push(project);
    }
    
    function addTaskToTaskList(task) {
        TASK_LIST.push(task);
    }
    
    // FOR TESTING
    const project = createProject("test project");
    const task = createTask("test title", "test description", "due date", 0, project.id);
    const task2 = createTask("test title 2", "test description 2", "due date 2", 0, project.id);

    // addProjectToList(project, PROJECT_LIST);
    addTaskToTaskList(task);
    addTaskToTaskList(task2);
    
    console.log(TASK_LIST);
})()

export default TODO_APP;