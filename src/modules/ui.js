import getTommorowDate from "./getTommorowDate";

export default class UI {
    static #taskContainer = document.querySelector(".task-container");
    static #projectContainer = document.querySelector(".project-container");
    static #createTaskFormButton = document.querySelector("#create-task-form-button");
    static #createTaskButton = document.querySelector(".create-task-button");
    static #createProjectFormButton = document.querySelector("#create-project-form-button");
    static #createProjectButton = document.querySelector(".create-project-button");
    static #getTasksFunction = null;
    static #getProjectsFunction = null;
    static #deleteTaskFunction = null;
    static #editTaskFunction = null;
    static #deleteProjectFunction = null;
    static #editProjectFunction = null;
    static #createTaskFunction = null;
    static #createProjectFunction = null;
    static #getActiveProjectFunction = null;
    static #setActiveProjectFunction = null;

    static #filter = null;

    static init() {
        this.displayTasks();
        this.displayProjects();
        this.#higlightActiveProject();
        
        //set tommorow's date on due input
        const tommorowDate = getTommorowDate();
        document.querySelector("#due-input").value = tommorowDate;

        // opens create task form modal
        this.#createTaskFormButton.addEventListener("click" ,() => {
            document.querySelector(".create-task-form").showModal();
        })
        
        // opens create project form modal
        this.#createProjectFormButton.addEventListener("click" , () => {
            document.querySelector(".create-project-form").showModal();
        });

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
            
            this.displayTasks();
        });

        // create project, close form modal, display projects
        this.#createProjectButton.addEventListener("click", (e) => {
            e.preventDefault();
            const name = document.querySelector("#project-name");

            if(name === "") return;
            this.#createProjectFunction(name.value);

            // clears input value
            name.value = "";
            
            this.displayProjects();
            this.#higlightActiveProject();
            document.querySelector(".create-project-form").close();
        })

        // close create task form modal
        document.querySelector(".close-task-form-button").addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(".create-task-form").close();
        });
        
        // close create task form modal
        document.querySelector(".close-project-form-button").addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(".create-project-form").close();
        });

        // filter buttons
        document.querySelector(".filter-buttons").addEventListener("click", (e) => {
            if(e.target.nodeName !== "BUTTON") return;
            const targetFilter = e.target.dataset.name;
            if(targetFilter === this.#filter) {
                this.#filter = null;
            } else {
                this.#filter = targetFilter;
            }
            
            this.displayTasks();
            this.#higlightActiveFilter();
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

    static setCreateProjectFunction(fn) {
        this.#createProjectFunction = fn;
    }

    static setSetActiveProjectFunction(fn) {
        this.#setActiveProjectFunction = fn;
    }

    static setGetActiveProjectFunction(fn) {
        this.#getActiveProjectFunction = fn;
    }
 
    static displayTasks() {
        const tasks = this.#getTasksFunction();
        this.#taskContainer.innerHTML = "";
        tasks.forEach((t) => {
            const activeProjectId = this.#getActiveProjectFunction().id;
            if(this.#filter !== null && t.priority !== this.#filter) return;
            if(t.projectId === activeProjectId || activeProjectId === "0") {
                const taskEl = this.#createTaskElement(t);
                this.#taskContainer.append(taskEl);
            }
        })
    }

    static displayProjects() {
        const projects = this.#getProjectsFunction();
        this.#projectContainer.innerHTML = "";
        projects.forEach((p) => {
            const projectEl = this.#createProjectElement(p);
            this.#projectContainer.append(projectEl);
        })
    }

    static #createProjectElement(project) {
        const container = document.createElement("li");
        container.className = "project";

        const projectElement = document.createElement("button");
        projectElement.className = "project-name-button";
        projectElement.innerText = project.name;
        projectElement.dataset.id = project.id;

        container.append(projectElement);
             
        if(project.id !== "0") {
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-project-button";
            deleteButton.innerText = "X"; 
            container.append(deleteButton);
            deleteButton.addEventListener("click", () => {
                this.#deleteProjectFunction(projectElement.dataset.id);
                this.displayProjects();
                this.#higlightActiveProject();
                this.displayTasks();
            })
        } 
    

        projectElement.addEventListener("click" , () => {
            this.#setActiveProjectFunction(projectElement.dataset.id);
            this.displayProjects();
            this.#higlightActiveProject();
            this.displayTasks();
        });
       

        return container;
    }

    static #higlightActiveProject() {
        const projects = [...this.#projectContainer.children];
        const projectId = this.#getActiveProjectFunction().id;


        projects.forEach((p) => {
            if(p.children[0].dataset.id === projectId) {
                p.classList.add("active");
            } else {
                p.classList.remove("active");
            }
        })
    }

    static #higlightActiveFilter() {
        [...document.querySelector(".filter-buttons").children].forEach((btn) => {
            if(btn.dataset.name === this.#filter) {
                btn.classList.toggle("active");
            } else {
                btn.classList.remove("active");
            }
        })
    }

    static #createTaskElement(task) {
        const container = document.createElement("article");
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
        descriptionCont.className = "description-containter hidden";
        
        innerHeader1.append(due, buttonCont);
        innerHeader2.append(title);
        buttonCont.append(editButton, deleteButton);

        container.append(header, showDescButton, descriptionCont);
        header.append(innerHeader1, innerHeader2);
        descriptionCont.append(descriptionText);


        buttonCont.addEventListener("click", (e) => {
            if(e.target.name === "delete") {
                this.#deleteTaskFunction(buttonCont.dataset.id);
            } else if(e.target.name === "edit") {
                this.#editTaskFunction(buttonCont.dataset.id);
            }
            this.displayTasks();
        });

        showDescButton.addEventListener("click", () => {
            descriptionCont.classList.toggle("hidden");
        })

        return container;

    }
}