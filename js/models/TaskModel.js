// js/models/TaskModel.js
export class TaskModel {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    _commit() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTask(title, description) {
        const newTask = {
            id: Date.now(),
            title: title,
            description: description,
            status: 'В процесі' 
        };
        this.tasks.push(newTask);
        this._commit();
    }

    toggleTaskStatus(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                task.status = task.status === 'В процесі' ? 'Готово' : 'В процесі';
            }
            return task;
        });
        this._commit();
    }

    getTaskDescription(id) {
        const task = this.tasks.find(t => t.id === id);
        return task ? task.description : 'Опис відсутній';
    }
}
