document.addEventListener('DOMContentLoaded', function() {
            
            const tabs = document.querySelectorAll('.tab');
            const forms = document.querySelectorAll('.form');
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            const loginMessage = document.getElementById('login-message');
            const registerMessage = document.getElementById('register-message');
            const passwordToggles = document.querySelectorAll('.password-toggle');
            
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    
                    
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    
                    forms.forEach(form => form.classList.remove('active'));
                    document.getElementById(`${tabName}-form`).classList.add('active');
                    
                   
                    loginMessage.style.display = 'none';
                    registerMessage.style.display = 'none';
                });
            });
            
          
            
            
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                loginMessage.style.display = 'none';
                
                const username = document.getElementById('login-username').value.trim();
                const password = document.getElementById('login-password').value;
                
               
                const users = JSON.parse(localStorage.getItem('warThunderUsers')) || [];
                const user = users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    showMessage(loginMessage, `Добро пожаловать, ${username}!`, 'success');
                    
                   
                    
                    setTimeout(() => {
                         window.location.href='../html/index.html';
                    }, 1500);
                } else {
                    showMessage(loginMessage, 'Неверное имя пользователя или пароль!', 'error');
                }
            });
            
        
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                registerMessage.style.display = 'none';
                
                const username = document.getElementById('register-username').value.trim();
                const email = document.getElementById('register-email').value.trim();
                const password = document.getElementById('register-password').value;
                const confirmPassword = document.getElementById('register-confirm').value;
                
                
                if (password !== confirmPassword) {
                    showMessage(registerMessage, 'Пароли не совпадают!', 'error');
                    return;
                }
                
                if (password.length < 6) {
                    showMessage(registerMessage, 'Пароль должен быть не менее 6 символов!', 'error');
                    return;
                }
                
                if (username.length < 3) {
                    showMessage(registerMessage, 'Имя пользователя должно быть не менее 3 символов!', 'error');
                    return;
                }
                
                let users = JSON.parse(localStorage.getItem('warThunderUsers')) || [];
                const userExists = users.some(user => user.username === username);
                
                if (userExists) {
                    showMessage(registerMessage, 'Пользователь с таким именем уже существует!', 'error');
                    return;
                }
                
                
                const newUser = {
                    username: username,
                    email: email,
                    password: password,
                    registeredAt: new Date().toISOString()
                };
                
                users.push(newUser);
                localStorage.setItem('warThunderUsers', JSON.stringify(users));
                
                showMessage(registerMessage, `Аккаунт ${username} успешно создан!`, 'success');
                
                
                setTimeout(() => {
                    document.querySelector('.tab[data-tab="login"]').click();
                    document.getElementById('login-username').value = username;
                    document.getElementById('login-password').value = '';
                }, 2000);
            });
            
            
            function showMessage(element, text, type) {
                element.textContent = text;
                element.className = 'message ' + type;
                element.style.display = 'block';
                
                
                setTimeout(() => {
                    element.style.display = 'none';
                }, 5000);
            }
            
           
            
            
        });