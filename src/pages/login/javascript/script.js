// Função para validar login
function validateLogin(email, password) {
    // Recupera os usuários cadastrados do localStorage
    const users = JSON.parse(localStorage.getItem('gymplanner_users')) || [];
    
    // Procura por um usuário com email e senha correspondentes
    const user = users.find(user => 
        user.email === email && user.password === password
    );
    
    return user;
}

// Função para fazer login
function login(email, password) {
    const user = validateLogin(email, password);
    
    if (user) {
        // Salva o usuário logado no localStorage
        localStorage.setItem('gymplanner_current_user', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            loginTime: new Date().toISOString()
        }));
        
        return { success: true, user: user };
    } else {
        return { success: false, message: 'Email ou senha incorretos' };
    }
}

// Função para mostrar mensagens de erro/sucesso
function showMessage(message, type = 'error') {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Cria nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Estilos da mensagem
    messageDiv.style.cssText = `
        padding: 10px;
        margin-bottom: 15px;
        border-radius: 6px;
        font-size: 14px;
        text-align: center;
        ${type === 'error' ? 
            'background-color: #ffebee; color: #c62828; border: 1px solid #ef5350;' : 
            'background-color: #e8f5e8; color: #2e7d32; border: 1px solid #4caf50;'
        }
    `;
    
    // Insere a mensagem antes do formulário
    const form = document.querySelector('form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Função para verificar se já está logado
function checkIfLoggedIn() {
    const currentUser = localStorage.getItem('gymplanner_current_user');
    if (currentUser) {
        // Se já estiver logado, redireciona para dashboard (ou página principal)
        // window.location.href = '../dashboard/dashboard.html';
        console.log('Usuário já está logado:', JSON.parse(currentUser));
    }
}

// Event listener para o formulário
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se já está logado
    checkIfLoggedIn();
    
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Validações básicas
        if (!email || !password) {
            showMessage('Por favor, preencha todos os campos');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Por favor, insira um email válido');
            return;
        }
        
        // Tenta fazer login
        const loginResult = login(email, password);
        
        if (loginResult.success) {
            showMessage('Login realizado com sucesso! Redirecionando...', 'success');
            
            // Redireciona após 2 segundos
            setTimeout(() => {
                // Substitua pela URL da sua página principal/dashboard
                window.location.href = '../meus-treinos/meus-treinos.html';
            }, 2000);
        } else {
            showMessage(loginResult.message);
            // Limpa os campos
            passwordInput.value = '';
        }
    });
});

// Função auxiliar para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para logout (pode ser usada em outras páginas)
function logout() {
    localStorage.removeItem('gymplanner_current_user');
    window.location.href = '../login/login.html';
}

// Função para obter usuário atual (pode ser usada em outras páginas)
function getCurrentUser() {
    const currentUser = localStorage.getItem('gymplanner_current_user');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Função para verificar se está autenticado (pode ser usada em outras páginas)
function isAuthenticated() {
    return getCurrentUser() !== null;
}