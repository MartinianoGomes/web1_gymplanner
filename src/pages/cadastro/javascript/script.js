document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Captura os valores dos campos
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validações
    if (!name || !email || !password || !confirmPassword) {
      showMessage("Por favor, preencha todos os campos.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("As senhas não coincidem. Por favor, tente novamente.", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("A senha deve ter pelo menos 6 caracteres.", "error");
      return;
    }

    // Verifica se o email já está cadastrado
    const existingUsers = JSON.parse(
      localStorage.getItem("gymplanner_users") || "[]"
    );
    const emailExists = existingUsers.some((user) => user.email === email);

    if (emailExists) {
      showMessage("Este email já está cadastrado. Por favor, use outro email.", "error");
      return;
    }

    // Cria objeto com os dados do usuário
    const userData = {
      id: Date.now(), // ID único baseado no timestamp
      name: name,
      email: email,
      password: password, // Em um app real, a senha deveria ser criptografada
      registrationDate: new Date().toISOString(),
    };

    // Adiciona o novo usuário à lista existente
    existingUsers.push(userData);

    // Salva no localStorage
    try {
      localStorage.setItem("gymplanner_users", JSON.stringify(existingUsers));

      // Também salva os dados do usuário atual separadamente
      localStorage.setItem("gymplanner_current_user", JSON.stringify(userData));

      // Mostra mensagem de sucesso
      showMessage("Cadastro realizado com sucesso! Redirecionando para o login...", "success");

      // Limpa o formulário
      form.reset();

      setTimeout(() => {
        // Substitua pela URL da sua página principal/dashboard
        window.location.href = '../login/login.html';
      }, 2000);
    } catch (error) {
      showMessage("Erro ao salvar os dados. Por favor, tente novamente.", "error");
      console.error("Erro ao salvar no localStorage:", error);
    }
  });

  // function logout() {
  //   // Limpa o usuário atual do localStorage
  //   localStorage.removeItem("gymplanner_current_user");
  //   // Redireciona para a página de login ou página inicial
  //   window.location.href = '../login/login.html';
  // }

  function showMessage(message, type = "error") {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector(".message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Cria nova mensagem
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Estilos da mensagem
    messageDiv.style.cssText = `
        padding: 10px;
        margin-bottom: 15px;
        border-radius: 6px;
        font-size: 14px;
        text-align: center;
        ${type === "error"
        ? "background-color: #ffebee; color: #c62828; border: 1px solid #ef5350;"
        : "background-color: #e8f5e8; color: #2e7d32; border: 1px solid #4caf50;"
      }
    `;

    // Insere a mensagem antes do formulário
    const form = document.querySelector("form");
    form.parentNode.insertBefore(messageDiv, form);

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }

  // Função para visualizar dados salvos (para debug)
  window.viewSavedData = () => {
    const users = JSON.parse(localStorage.getItem("gymplanner_users") || "[]");
    const currentUser = JSON.parse(
      localStorage.getItem("gymplanner_current_user") || "null"
    );

    console.log("Todos os usuários:", users);
    console.log("Usuário atual:", currentUser);

    return {
      allUsers: users,
      currentUser: currentUser,
    };
  };

  // Função para limpar dados salvos (para debug)
  window.clearSavedData = () => {
    localStorage.removeItem("gymplanner_users");
    localStorage.removeItem("gymplanner_current_user");
    console.log("Dados limpos do localStorage");
  };
});