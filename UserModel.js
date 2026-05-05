// js/models/UserModel.js
export class UserModel {
    constructor() {
        this.allUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    registerUser(userData) {
        const exists = this.allUsers.find(u => u.email === userData.email);
        if (!exists) {
            this.allUsers.push(userData);
            localStorage.setItem('registeredUsers', JSON.stringify(this.allUsers));
        }
        this.currentUser = userData;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    login(email, password) {
        const user = this.allUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        }
        return false;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    getUserData() {
        return this.currentUser;
    }
}