import Project from "../class/Project.js";
import Task from "../class/Task.js";
import generateId from "./generate-id.js";
import Storage from "./local-storage.js";

export default class TODO_APP {
    static init() {
        Storage.init();

        // create a default project
        this.createProject("all tasks", "0");
    }

    static createTask({title, description, due, priority}) {
        const id = generateId();
        const activeProjectId = this.getActiveProject().id;
        const task = new Task({title, description,due, priority, id, projectId: activeProjectId});

        Storage.addToStorage("tasks", task);
    }
    
    static createProject(name, id) {
        // prevents adding project with the same name
        const projectNames = Storage.getStorage().projects.map(p => p.name);
        if(projectNames.includes(name.toLowerCase())) return;
        let projectId;

        if(id === undefined) {
            projectId = generateId();
        } else { 
            projectId = id;
        }

        const project = new Project(name.toLowerCase(), projectId);

        Storage.addToStorage("projects", project);
        
        // set the created project as active
        this.setActiveProject(project.id);
    }

    static deleteTask(id) {
        Storage.removeFromStorage("tasks", id);
    }

    static deleteProject(id) {
        // prevents deleting the default project
        if(id === "0") return;
        const activeProjectId = this.getActiveProject().id;
        
        Storage.removeFromStorage("projects", id);

        // deletes all of the task that has the project's id
        this.#deleteTasksWithProjectId(id);
        
        /*
            reset the active project to default if the project to be deleted is the current active project
        */
        if(activeProjectId === id) {
            this.setActiveProject("0")
        }
    }
    
    static editTask(id, value) {
        Storage.editItem("tasks", id, value);
    }
    
    static editProject(id, value) {
        if(id === "0") return;

        Storage.editItem("projects", id, value);
    }
    
    static getTasks() {
        return Storage.getStorage().tasks;
    }
    
    static getProjects() {
        return Storage.getStorage().projects;
    }

    static setActiveProject(id) {
        Storage.addToStorage("activeProject", id);
    }

    static getActiveProject() {
        const activeProjectId = Storage.getStorage().activeProject;
        const activeProject = Storage.getStorage().projects.filter((p) => p.id === activeProjectId)[0];

        return activeProject;
    }
    
    static #deleteTasksWithProjectId(id) {
        const currentTasks = this.getTasks();
        let newTasks = currentTasks.filter((task) => {
            return task.projectId !== id;
        });
        
        Storage.replaceStorage("tasks", newTasks);
    }
}