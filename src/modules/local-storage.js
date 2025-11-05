import Project from "../class/Project";

export default class Storage {
    static #APP_NAME = "todo-app";
    
    static init() {
        this.#initStorage();
    }

    static #initStorage() {
        if(localStorage.getItem(this.#APP_NAME)) return;
        localStorage.setItem(this.#APP_NAME, JSON.stringify({tasks: [], projects: []}))
    }

    static getStorage() {
        return JSON.parse(localStorage.getItem(this.#APP_NAME));
    }

    static updateStorage(property, value) {
        const currentStorage = this.getStorage();
        currentStorage[property].push(value);

        localStorage.setItem(this.#APP_NAME, JSON.stringify(currentStorage));
    }
}