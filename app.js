// js/app.js
import { TaskModel } from './models/TaskModel.js';
import { UserModel } from './models/UserModel.js';
import { TaskView } from './views/TaskView.js';
import { AuthView } from './views/AuthView.js';
import { TaskController } from './controllers/TaskController.js';
import { AuthController } from './controllers/AuthController.js';

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('workspace.html')) {
        new TaskController(new TaskModel(), new TaskView());
    } 
    else if (path.includes('register.html') || path.includes('profile.html') || path.includes('login.html')) {
        new AuthController(new UserModel(), new AuthView());
    }
});