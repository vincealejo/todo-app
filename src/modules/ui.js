export default class UI {
    static app = document.querySelector('#app');
    static taskContainer = document.querySelector("#task-container");

    static displayTasks(tasks) {
        
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

        const optButton = document.createElement("button");
        optButton.className = "option-button";
        optButton.innerText = ":";

        const optButtonCont = document.createElement("div");
        const innerHeader1 = document.createElement("div");
        const innerHeader2 = document.createElement("div");
        
        const showDescButton = document.createElement("button");
        showDescButton.className = "show-description-button";
        showDescButton.innerText = "V";
        
        const descriptionCont = document.createElement("section");
        descriptionCont.className = "description-containter";
        
        innerHeader1.append(due);
        innerHeader2.append(title, optButtonCont);
        optButtonCont.append(optButton);

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