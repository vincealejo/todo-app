export default class Task {
    constructor(title, description, due, priority, id, projectId) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.id = id;
        this.projectId = projectId;
    }
}