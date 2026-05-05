// js/views/TaskView.js
export class TaskView {
    constructor() {
        this.inputTitle = document.querySelector('input[placeholder="Назва..."]');
        this.inputDescription = document.querySelector('textarea[placeholder="Опис..."]');
        this.addButton = document.querySelector('.btn-primary.w-100');
        this.taskTableBody = document.querySelector('table tbody');
    }

    _resetInput() {
        if (this.inputTitle) this.inputTitle.value = '';
        if (this.inputDescription) this.inputDescription.value = '';
    }

    displayTasks(tasks) {
        if (!this.taskTableBody) return;

        this.taskTableBody.innerHTML = ''; 

        if (tasks.length === 0) {
            this.taskTableBody.innerHTML = `<tr><td colspan="2" class="text-center">Список порожній</td></tr>`;
            return;
        }

        tasks.forEach(task => {
            const statusClass = task.status === 'Готово' ? 'bg-success' : 'bg-warning text-dark';
            const tr = document.createElement('tr');
            tr.id = task.id;
            tr.innerHTML = `
                <td style="cursor: pointer;" title="Показати опис">${task.title}</td>
                <td><span class="badge ${statusClass}" style="cursor: pointer;">${task.status}</span></td>
            `;
            this.taskTableBody.append(tr);
        });
    }

    bindAddTask(handler) {
        this.addButton?.addEventListener('click', e => {
            e.preventDefault();
            if (this.inputTitle.value && this.inputDescription.value) {
                handler(this.inputTitle.value, this.inputDescription.value);
                this._resetInput();
            }
        });
    }

    bindToggleStatus(handler) {
        this.taskTableBody?.addEventListener('click', e => {
            if (e.target.classList.contains('badge')) {
                handler(parseInt(e.target.closest('tr').id));
            }
        });
    }

    bindShowDescription(handler) {
        this.taskTableBody?.addEventListener('click', e => {
            if (e.target.tagName === 'TD' && !e.target.querySelector('.badge')) {
                handler(parseInt(e.target.closest('tr').id));
            }
        });
    }
}