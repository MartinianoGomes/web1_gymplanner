document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm")
  const errorMessage = document.getElementById("errorMessage")
  const errorText = document.getElementById("errorText")

  form.addEventListener("submit", (e) => {
    e.preventDefault() // Previne o comportamento padrão do formulário

    // Captura os valores dos campos
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm-password").value

    // Esconde mensagens anteriores
    errorMessage.style.display = "none"

    // Validações
    if (!name || !email || !password || !confirmPassword) {
      showError("Por favor, preencha todos os campos.")
      return
    }

    if (password !== confirmPassword) {
      showError("As senhas não coincidem.")
      return
    }

    if (password.length < 6) {
      showError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    // Verifica se o email já está cadastrado
    const existingUsers = JSON.parse(localStorage.getItem("gymplanner_users") || "[]")
    const emailExists = existingUsers.some((user) => user.email === email)

    if (emailExists) {
      showError("Este e-mail já está cadastrado.")
      return
    }

    // Cria objeto com os dados do usuário
    const userData = {
      id: Date.now(), // ID único baseado no timestamp
      name: name,
      email: email,
      password: password, // Em um app real, a senha deveria ser criptografada
      registrationDate: new Date().toISOString(),
    }

    // Adiciona o novo usuário à lista existente
    existingUsers.push(userData)

    // Salva no localStorage
    try {
      localStorage.setItem("gymplanner_users", JSON.stringify(existingUsers))

      // Também salva os dados do usuário atual separadamente
      localStorage.setItem("gymplanner_current_user", JSON.stringify(userData))

      // Mostra mensagem de sucesso
      showSuccess()

      // Limpa o formulário
      form.reset()
    } catch (error) {
      showError("Erro ao salvar os dados. Tente novamente.")
      console.error("Erro ao salvar no localStorage:", error)
    }
  })

  function showSuccess() {
    // Remove a mensagem existente se houver
    const existingToast = document.querySelector(".toast-message")
    if (existingToast) {
      existingToast.remove()
    }

    // Cria a mensagem flutuante
    const toast = document.createElement("div")
    toast.className = "toast-message"
    toast.textContent = "Cadastro realizado com sucesso!"

    // Adiciona ao body para garantir que apareça
    document.body.appendChild(toast)

    // Remove a mensagem após 4 segundos
    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.remove()
      }
    }, 4000)
  }

  function showError(message) {
    errorText.textContent = message
    errorMessage.style.display = "block"
    // Esconde a mensagem após 5 segundos
    setTimeout(() => {
      errorMessage.style.display = "none"
    }, 5000)
  }

  // Função para visualizar dados salvos (para debug)
  window.viewSavedData = () => {
    const users = JSON.parse(localStorage.getItem("gymplanner_users") || "[]")
    const currentUser = JSON.parse(localStorage.getItem("gymplanner_current_user") || "null")

    console.log("Todos os usuários:", users)
    console.log("Usuário atual:", currentUser)

    return {
      allUsers: users,
      currentUser: currentUser,
    }
  }

  // Função para limpar dados salvos (para debug)
  window.clearSavedData = () => {
    localStorage.removeItem("gymplanner_users")
    localStorage.removeItem("gymplanner_current_user")
    console.log("Dados limpos do localStorage")
  }
})