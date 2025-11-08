import getTommorowDate from "./getTommorowDate";

export default class UI {
    static #taskContainer = document.querySelector(".task-container");
    static #projectContainer = document.querySelector(".project-container");
    static #createTaskFormButton = document.querySelector("#create-task-form-button");
    static #createTaskButton = document.querySelector(".create-task-button");
    static #getTasksFunction = null;
    static #getProjectsFunction = null;
    static #deleteTaskFunction = null;
    static #editTaskFunction = null;
    static #deleteProjectFunction = null;
    static #editProjectFunction = null;
    static #createTaskFunction = null;

    static init() {
        this.displayTasks(this.#getTasksFunction());
        this.displayProjects(this.#getProjectsFunction());

        //set tommorow's date on due input
        const tommorowDate = getTommorowDate();
        document.querySelector("#due-input").value = tommorowDate;

        // opens the create task form modal
        this.#createTaskFormButton.addEventListener("click" ,() => {
            document.querySelector(".create-task-form").showModal();
        })
        
        // creates task, close create task form modal, display tasks
        this.#createTaskButton.addEventListener("click", (e) => {
            e.preventDefault();
            const title = document.querySelector("#title-input").value;
            const description = document.querySelector("#description-input").value;
            const due = document.querySelector("#due-input").value;
            const priority = document.querySelector("#priority-input").value;
            
            if(title === "") return;
            this.#createTaskFunction({title, description, due, priority});

            document.querySelector(".create-task-form").close();

            // clears input values
            document.querySelector("#title-input").value = ""; 
            document.querySelector("#description-input").value = ""; 
            document.querySelector("#due-input").value = "";
            document.querySelector("#priority-input").value = "regular"; 
            
            this.displayTasks(this.#getTasksFunction());
        });

        // close create task form modal
        document.querySelector(".close-task-form-button").addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(".create-task-form").close();
        })

    }


    static setDeleteTaskFunction(fn) {
        this.#deleteTaskFunction = fn;
    }

    static setEditTaskFunction(fn) {
        this.#editTaskFunction = fn;
    }

    static setDeleteProjectFunction(fn) {
        this.#deleteProjectFunction = fn;
    }

    static setEditProjectFunction(fn) {
        this.#editProjectFunction = fn;
    }

    static setGetTasksFunction(fn) {
        this.#getTasksFunction = fn;
    }

    static setGetProjectsFunction(fn) {
        this.#getProjectsFunction = fn;
    }

    static setCreateTaskFunction(fn) {
        this.#createTaskFunction = fn;
    }
 
    static displayTasks(tasks) {
        this.#taskContainer.innerHTML = "";
        tasks.forEach((t) => {
            const taskEl = this.#createTaskElement(t);
            this.#taskContainer.append(taskEl);
        })
    }

    static displayProjects(projects) {
        this.#projectContainer.innerHTML = "";
        projects.forEach((p) => {
            const projectEl = this.#createProjectElement(p);
            this.#projectContainer.append(projectEl);
        })
    }

    static #createProjectElement(project) {
        const container = document.createElement("li");
        container.className = "project";

        const button = document.createElement("button");
        button.className = "project-name-button";
        button.innerText = project.name;
        button.dataset.id = project.id;

        container.append(button);

        return container;
    }

    static #createTaskElement(task) {
        const container = document.createElement("arcticle");
        container.className = "task";

        const header = document.createElement("header");
        
        const title = document.createElement("p");
        title.className = "title";
        title.innerText = task.title;
        
        const priority = document.createElement('p');
        priority.className = "priority";
        priority.innerText = task.priority;

        const due = document.createElement("span");
        due.className = "due";
        due.innerText = task.due;
        
        const descriptionText = document.createElement("p");
        descriptionText.className = "description";
        descriptionText.innerText = task.description;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "X";
        deleteButton.name = "delete";

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerText = "E";
        editButton.name = "edit";

        const buttonCont = document.createElement("div");

        // set the task id into the buttons container
        buttonCont.dataset.id = task.id;

        const innerHeader1 = document.createElement("div");
        const innerHeader2 = document.createElement("div");
        
        const showDescButton = document.createElement("button");
        showDescButton.className = "show-description-button";
        showDescButton.innerText = "V";
        
        const descriptionCont = document.createElement("section");
        descriptionCont.className = "description-containter";
        
        innerHeader1.append(due, buttonCont);
        innerHeader2.append(title);
        buttonCont.append(editButton, deleteButton);

        container.append(header, showDescButton, descriptionCont);
        header.append(innerHeader1, innerHeader2);
        descriptionCont.append(descriptionText);


        buttonCont.addEventListener("click", (e) => {
            if(e.target.name === "delete") {
                console.log("ran");
                this.#deleteTaskFunction(buttonCont.dataset.id);
            } else if(e.target.name === "edit") {
                this.#editTaskFunction(buttonCont.dataset.id);
            }
            this.displayTasks(this.#getTasksFunction());
        })

        return container;

    }
}