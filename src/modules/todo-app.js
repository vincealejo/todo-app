import Project from "../class/Project.js";
import Task from "../class/Task.js";
import generateId from "./generate-id.js";
import Storage from "./local-storage.js";

export default class TODO_APP {
    static #activeProject = null;

    static init() {
        Storage.init()

        // create a default project
        this.createProject("all tasks");
    }

    static createTask({title, description, due, priority}) {
        const id = generateId();
        const activeProjectId = this.getActiveProject().id
        const task = new Task({title, description,due, priority, id, projectId: activeProjectId});
        Storage.updateStorage("tasks", task);
    }
    
    static createProject(name) {
        // prevents adding project with the same name
        const projectNames = Storage.getStorage().projects.map(p => p.name);
        if(projectNames.includes(name.toLowerCase())) return;
        
        const id = generateId();
        const project = new Project(name.toLowerCase(), id);
        Storage.updateStorage("projects", project);
        
        // set the newly created project as active
        this.setActiveProject(project.id);
    }
    
    static getTasks() {
        return Storage.getStorage().tasks;
    }
    
    static getProjects() {
        return Storage.getStorage().projects;
    }

    static setActiveProject(id) {
        const project = Storage.getStorage().projects.filter((p) => p.id === id)[0];
        this.#activeProject = project;
    }

    static getActiveProject() {
        return this.#activeProject;
    }
}