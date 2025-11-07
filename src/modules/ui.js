export default class UI {
    static taskContainer = document.querySelector(".task-container");

    static displayTasks(tasks) {
        tasks.forEach((t) => {
            const taskEl = this.#createTask(t);
            this.taskContainer.append(taskEl);
        })
    }

    static #createTask(task) {
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

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerText = "E";

        const buttonCont = document.createElement("div");
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

        return container;

    }
}


// <article class="task">
//         <header>
//             <div>
//                 <p class="project-name">Example Project Name</p>
//                 <span class="due-date">12 / 11 / 06</span>
//             </div>
//             <div>
//                 <p class="title">Task Title</p>
//                 <div>
//                     <button class="option-button">:</button>
//                 </div>
//             </div>
//         </header>
//         <button class="show-description-button">V</button>
//         <section class="description">
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deserunt debitis ex minus neque mollitia numquam ducimus nam maxime eveniet.</p>
//         </section>
//     </article>