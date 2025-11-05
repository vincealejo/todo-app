import Project from "../class/Project";

export default class Storage {
    static #APP_NAME = "todo-app";
    
    static init() {
        if(localStorage.getItem(this.#APP_NAME)) return;
        this.#updateStorage({tasks: [], projects: [], activeProject: null});
    }

    static getStorage() {
        return JSON.parse(localStorage.getItem(this.#APP_NAME));
    }

    static addToStorage(property, value) {
        const currentStorage = this.getStorage();
        currentStorage[property].push(value);

        this.#updateStorage(currentStorage);
    }
    
    static removeFromStorage(property, id) {
        const currentStorage = this.getStorage();
        currentStorage[property] = currentStorage[property].filter(item => item.id !== id);
        
        this.#updateStorage(currentStorage);
    }

    static editItem(property, id, value) {
        const currentStorage = this.getStorage();
        currentStorage[property] = currentStorage[property].map((item => {
            if(item.id === id) {
                item = {...item, ...value};
            }
            return item;
        }));

        this.#updateStorage(currentStorage);
    }

    static setActiveProject(id) {
        const currentStorage = this.getStorage();
        currentStorage.activeProject = currentStorage.projects.filter(proj => proj.id === id)[0];

        this.#updateStorage(currentStorage);
    }

    static getActiveProject() {
        return this.getStorage().activeProject;
    }

    static #updateStorage(value) {
         localStorage.setItem(this.#APP_NAME, JSON.stringify(value));
    }
}