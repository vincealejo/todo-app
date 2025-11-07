import "./styles.css";
import TODO_APP from "./modules/todo-app.js";
import UI from "./modules/ui.js";

// this needs to be called first
TODO_APP.init();
// TODO_APP.createTask({title: "task two", description: "desc two", due: "due two", priority: "0"});
UI.displayTasks(TODO_APP.getTasks());