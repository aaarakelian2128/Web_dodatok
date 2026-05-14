// js/controllers/TaskController.js
export class TaskController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindAddTask(this.handleAddTask.bind(this));
        this.view.bindToggleStatus(this.handleToggleStatus.bind(this));
        this.view.bindShowDescription(this.handleShowDescription.bind(this));

        this.onTaskListChanged(this.model.tasks);
    }

    onTaskListChanged(tasks) {
        this.view.displayTasks(tasks);
    }

    handleAddTask(title, description) {
        this.model.addTask(title, description);
        this.onTaskListChanged(this.model.tasks);
    }

    handleToggleStatus(id) {
        this.model.toggleTaskStatus(id);
        this.onTaskListChanged(this.model.tasks);
    }

    handleShowDescription(id) {
        const description = this.model.getTaskDescription(id);
        alert(`Опис завдання: \n${description}`); 
    }
}
