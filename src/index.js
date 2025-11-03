import Project from "./class/Project";
import Task from "./class/Task";

const TODO_APP = (function() {
    // default project list for now until LocalStorage is implemented
    let PROJECT_LIST = [];

    function createTask(title, description, due, priority) {
        const id = generateId();
        const task = new Task(title, description, due, priority, id);

        return task;
    }

    function createProject() {
        const id = generateId();
        const project = new Project("test project", id);

        return project;
    }

    function addProjectToList(project, storage) {
        storage.push(project);
    }

    function addTaskToProject(task, projectId, storage) {
        storage = storage.map((proj) => {
            if(proj.id === projectId) {
                proj.addTask(task);
            }

            return proj;
        });
    }

    // Helpers
    function generateId() {
        return crypto.randomUUID();
    }

    
    // FOR TESTING
    // const project = createProject("test project");
    // const task = createTask("test title", "test description", "due date", 0);

    // addProjectToList(project, PROJECT_LIST);
    // addTaskToProject(task, project.id, PROJECT_LIST);
    
    // console.log(PROJECT_LIST);
})()

