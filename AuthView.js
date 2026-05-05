// js/views/AuthView.js
export class AuthView {
    constructor() {
        this.userName = document.getElementById('user-name-display');
        this.userAvatar = document.getElementById('user-avatar');
        this.userStatus = document.getElementById('user-status-display');
        this.infoList = document.getElementById('user-info-list');
        this.actions = document.getElementById('profile-actions');
        
        this.regForm = document.querySelector('form');
        this.regName = document.querySelector('input[placeholder="Прізвище Ім\'я"]');
        this.regDate = document.querySelector('input[type="date"]');
        this.regGender = document.querySelector('select.form-select');
        this.regEmail = document.querySelector('input[type="email"]');
        this.regPassword = document.getElementById('reg-password'); 
    }

    
    displayProfile(user) {
        if (!this.userName) return; 

        if (!user) {
            this.userName.textContent = 'Ви не увійшли';
            this.userAvatar.textContent = '?';
            this.userStatus.textContent = 'Доступ обмежено';
            this.infoList.innerHTML = `<p class="text-center text-muted py-3">Будь ласка, увійдіть у систему.</p>`;
            this.actions.innerHTML = `
                <a href="login.html" class="btn btn-primary">Увійти</a>
                <a href="register.html" class="btn btn-outline-secondary">Реєстрація</a>
            `;
            return;
        }

        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        this.userName.textContent = user.name;
        this.userAvatar.textContent = initials;
        this.userStatus.textContent = 'Активний користувач';

        this.infoList.innerHTML = `
            <div class="list-group-item px-0 border-0">
                <small class="text-muted d-block">Email</small>
                <span class="fw-medium text-break">${user.email}</span>
            </div>
            <div class="list-group-item px-0 border-0">
                <small class="text-muted d-block">Дата народження</small>
                <span class="fw-medium">${user.date}</span>
            </div>
            <div class="list-group-item px-0 border-0">
                <small class="text-muted d-block">Стать</small>
                <span class="fw-medium">${user.gender}</span>
            </div>
        `;

        this.actions.innerHTML = `
            <button class="btn btn-primary" type="button">Редагувати профіль</button>
            <button id="logout-btn-final" class="btn btn-outline-danger">Вийти з системи</button>
        `;
    }

    
    bindRegister(handler) {
        if (!this.regForm) return; 
        this.regForm.addEventListener('submit', e => {
            e.preventDefault();
            handler({
                name: this.regName.value,
                date: this.regDate.value,
                gender: this.regGender.value,
                email: this.regEmail.value,
                password: this.regPassword ? this.regPassword.value : '' 
            });
        });
    }

    
    bindLogin(handler) {
    const loginForm = document.querySelector('form');
    if (!loginForm || !window.location.pathname.includes('login.html')) return;

    loginForm.addEventListener('submit', e => {
        e.preventDefault(); 
        
        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');

        if (emailInput && passwordInput) {
            console.log("Спроба входу:", emailInput.value); 
            handler(emailInput.value, passwordInput.value);
        } else {
            console.error("Не знайдено поля Email або Password у формі входу!");
        }
    });
}

   
    bindLogout(handler) {
        this.actions?.addEventListener('click', e => {
            if (e.target.id === 'logout-btn-final') {
                e.preventDefault();
                handler();
            }
        });
    }
}