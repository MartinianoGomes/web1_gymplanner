document.addEventListener("DOMContentLoaded", () => {
  // Array para armazenar exercícios selecionados
  const selectedExercises = JSON.parse(localStorage.getItem("gymplanner_selected_exercises") || "[]")

  // Inicializa a página
  initializePage()

  function initializePage() {
    // Restaura seleções anteriores
    selectedExercises.forEach((exerciseId) => {
      const card = document.querySelector(`[data-exercise-id="${exerciseId}"]`)
      if (card) {
        const button = card.querySelector(".selector-btn")
        button.classList.add("active")
        card.classList.add("selected")
      }
    })

    // Adiciona event listeners para os cards
    const exerciseCards = document.querySelectorAll(".exercise-card")
    exerciseCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        // Evita duplo clique se clicar diretamente no botão
        if (e.target.classList.contains("selector-btn")) return

        const button = card.querySelector(".selector-btn")
        const exerciseId = Number.parseInt(card.dataset.exerciseId)
        toggleExercise(button, exerciseId)
      })
    })
  }
})

function toggleExercise(button, exerciseId) {
  const card = button.closest(".exercise-card")
  const isSelected = button.classList.contains("active")

  // Adiciona animação de clique
  button.style.transform = "scale(0.9)"
  setTimeout(() => {
    button.style.transform = ""
  }, 150)

  if (isSelected) {
    // Remove seleção
    button.classList.remove("active")
    card.classList.remove("selected")
    removeFromSelected(exerciseId)
    showToast(`Exercício removido da seleção`, "info")
  } else {
    // Adiciona seleção
    button.classList.add("active")
    card.classList.add("selected")
    addToSelected(exerciseId)
    showToast(`Exercício adicionado à seleção`, "success")
  }

  // Salva no localStorage
  saveSelectedExercises()
}

function addToSelected(exerciseId) {
  const selectedExercises = JSON.parse(localStorage.getItem("gymplanner_selected_exercises") || "[]")
  if (!selectedExercises.includes(exerciseId)) {
    selectedExercises.push(exerciseId)
    localStorage.setItem("gymplanner_selected_exercises", JSON.stringify(selectedExercises))
  }
}

function removeFromSelected(exerciseId) {
  let selectedExercises = JSON.parse(localStorage.getItem("gymplanner_selected_exercises") || "[]")
  selectedExercises = selectedExercises.filter((id) => id !== exerciseId)
  localStorage.setItem("gymplanner_selected_exercises", JSON.stringify(selectedExercises))
}

function saveSelectedExercises() {
  const selectedButtons = document.querySelectorAll(".selector-btn.active")
  const selectedIds = Array.from(selectedButtons).map((button) => {
    return Number.parseInt(button.closest(".exercise-card").dataset.exerciseId)
  })

  localStorage.setItem("gymplanner_selected_exercises", JSON.stringify(selectedIds))
}

function addExercise() {
  showToast("Funcionalidade de adicionar exercício em desenvolvimento", "info")

  // Simula adição de novo exercício
  setTimeout(() => {
    // Aqui você poderia abrir um modal ou navegar para uma página de criação
    console.log("Abrir modal/página para adicionar exercício")
  }, 500)
}

function goBack() {
  // Adiciona animação de saída
  document.body.style.opacity = "0.8"

  setTimeout(() => {
    // Simula navegação de volta
    showToast("Voltando...", "info")

    // Em uma aplicação real, você faria:
    // window.history.back() ou window.location.href = 'previous-page.html'
    console.log("Navegando de volta")

    // Restaura opacidade
    document.body.style.opacity = "1"
  }, 200)
}

function showToast(message, type = "success") {
  // Remove toast existente
  const existingToast = document.querySelector(".toast-message")
  if (existingToast) {
    existingToast.remove()
  }

  // Cria novo toast
  const toast = document.createElement("div")
  toast.className = "toast-message"

  // Define cor baseada no tipo
  switch (type) {
    case "success":
      toast.style.backgroundColor = "#10b981"
      break
    case "info":
      toast.style.backgroundColor = "#3b82f6"
      break
    case "warning":
      toast.style.backgroundColor = "#f59e0b"
      break
    case "error":
      toast.style.backgroundColor = "#ef4444"
      break
    default:
      toast.style.backgroundColor = "#10b981"
  }

  toast.innerHTML = `<p><span>${message}</span></p>`

  // Adiciona ao body
  document.body.appendChild(toast)

  // Remove após 3 segundos
  setTimeout(() => {
    if (toast && toast.parentNode) {
      toast.style.animation = "slideOutRight 0.3s ease-in"
      setTimeout(() => {
        toast.remove()
      }, 300)
    }
  }, 3000)
}

// Função para debug - visualizar exercícios selecionados
window.viewSelectedExercises = () => {
  const selected = JSON.parse(localStorage.getItem("gymplanner_selected_exercises") || "[]")
  console.log("Exercícios selecionados:", selected)
  return selected
}

// Função para debug - limpar seleções
window.clearSelectedExercises = () => {
  localStorage.removeItem("gymplanner_selected_exercises")
  location.reload()
}

// Adiciona animação de saída para slideOutRight
const style = document.createElement("style")
style.textContent = `
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)
