export default class Project {
    constructor(name, id) {
        this.name = name;
        this.tasks = [];
        this.id = id;
    }


    addTask(task) {
        this.tasks.push(task);
    }
}