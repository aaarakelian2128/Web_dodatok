// js/controllers/AuthController.js
export class AuthController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindRegister(this.handleRegister.bind(this));

        if (window.location.pathname.includes('login.html')) {
            this.view.bindLogin(this.handleLogin.bind(this));
        }

        if (window.location.pathname.includes('profile.html')) {
            this.view.displayProfile(this.model.getUserData());
            this.view.bindLogout(this.handleLogout.bind(this));
        }
    }

    handleLogin(email, password) {
        if (this.model.login(email, password)) {
            window.location.href = 'profile.html';
        } else {
            alert('Невірний Email або пароль!');
        }
    }

    handleRegister(userData) {
        this.model.registerUser(userData);
        alert('Ви успішно зареєстровані!');
        window.location.href = 'profile.html';
    }

    handleLogout() {
        this.model.logout();
        window.location.href = 'login.html';
    }
}