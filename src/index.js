import "./styles.css";
import TODO_APP from "./modules/todo-app.js";
import UI from "./modules/ui.js";

// Initializations
TODO_APP.init();
UI.setDeleteTaskFunction(TODO_APP.deleteTask);
UI.setEditTaskFunction(TODO_APP.editTask);
UI.setGetTasksFunction(TODO_APP.getTasks);
UI.setGetProjectsFunction(TODO_APP.getProjects);
UI.setCreateTaskFunction(TODO_APP.createTask.bind(TODO_APP));

UI.init();

// TODO_APP.createTask({title: "task two", description: "desc two", due: "due two", priority: "0"});`