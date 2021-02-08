class Data {
    constructor() {
        this.storageExists = this.checkIfStorageExists();
    }

    checkIfStorageExists() {
        if(localStorage.getItem("itemsData")) {
            return true;
        } else {
            return false;
        }
    }
    
    // const load = () => {
    //     let loadedSave = JSON.parse(localStorage.getItem("projects"));
    //     loadedSave.forEach((project) => {
    //       let loadedProject = Project(project.title, project.favourite);
    //       addProject(loadedProject);
    //       project.tasks.forEach((task) => {
    //         let loadedToDoItem = ToDoItem(
    //           task.title,
    //           task.description,
    //           task.dueDate,
    //           task.priority,
    //           task.notes,
    //           task.checklist
    //         );
    //         loadedToDoItem.setComplete(task.completed);
    //         loadedToDoItem.setCompletionDate(task.completionDate);
    //         loadedToDoItem.setCreationDate(task.creationDate);
    //         loadedProject.addTask(loadedToDoItem, false);
    //       });
    //     });
    //   };

    getData() {
        for (const key in library) {
            library[key] = JSON.parse(localStorage.getItem(`${key}Data`));
        }
        
        for (const key in library.users) {
            library.users[key] = JSON.parse(localStorage.getItem(`${key}Data`));
        }

    }

    setData() {
        for (const key in library) {
            localStorage.setItem(`${key}Data`, JSON.stringify(library[key]));
        }

        for (const key in library.users) {
            localStorage.setItem(`${key}Data`, JSON.stringify(library.users[key]));
        }
    }
}