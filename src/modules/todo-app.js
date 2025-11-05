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
        const activeProjectId = this.getActiveProject().id
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
        
        // set the newly created project as active
        this.setActiveProject(project.id);
    }

    static deleteTask(id) {
        Storage.removeFromStorage("tasks", id);
    }

    static deleteProject(id) {
        if(id === "0") return;

        Storage.removeFromStorage("projects", id);
        this.setActiveProject("0")
    }
    
    static getTasks() {
        return Storage.getStorage().tasks;
    }
    
    static getProjects() {
        return Storage.getStorage().projects;
    }

    static setActiveProject(id) {
        Storage.setActiveProject(id);
    }

    static getActiveProject() {
        return Storage.getActiveProject();
    }
}