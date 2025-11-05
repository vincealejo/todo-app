import Project from "../class/Project.js";
import Task from "../class/Task.js";
import generateId from "./generate-id.js";
import Storage from "./local-storage.js";

export default class TODO_APP {
    static init() {
        Storage.init()

        // create a default project
        this.createProject("all tasks");
    }

    static createTask({title, description, due, priority, projectId}) {
        const id = generateId();
        const task = new Task({title, description,due, priority, id, projectId});
        Storage.updateStorage("tasks", task);
    }
    
    static createProject(name) {
        // prevents adding project with the same name
        const projectNames = Storage.getStorage().projects.map(p => p.name);
        if(projectNames.includes(name.toLowerCase())) return;
        
        const id = generateId();
        const project = new Project(name.toLowerCase(), id);
        Storage.updateStorage("projects", project);
    }
    
    static getTasks() {
        return Storage.getStorage().tasks;
    }
    
    static getProjects() {
        return Storage.getStorage().projects;
    }
}