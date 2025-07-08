document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm")
  const muscleCards = document.querySelectorAll(".muscle-card")
  const createWorkoutBtn = document.getElementById("createWorkoutBtn")
  const selectedGroupsDiv = document.getElementById("selectedGroups")
  const selectedGroupsList = document.getElementById("selectedGroupsList")
  
  const backButton = document.getElementById("backButton")
  backButton.addEventListener("click", handleBackButton)
  
  let selectedGroups = []

  muscleCards.forEach(card => {
    card.addEventListener("click", () => {
      const groupId = card.getAttribute("data-group")
      const groupName = card.querySelector(".muscle-label").textContent
      
      toggleMuscleGroup(groupId, groupName, card)
    })
  })

  createWorkoutBtn.addEventListener("click", handleCreateWorkout)

  function toggleMuscleGroup(groupId, groupName, cardElement) {
    const index = selectedGroups.findIndex(group => group.id === groupId)
    
    if (index > -1) {
      selectedGroups.splice(index, 1)
      cardElement.classList.remove("selected")
    } else {
      selectedGroups.push({ id: groupId, name: groupName })
      cardElement.classList.add("selected")
    }
    
    updateSelectedGroupsDisplay()
  }

  function updateSelectedGroupsDisplay() {
    if (selectedGroups.length === 0) {
      selectedGroupsDiv.style.display = "none"
      return
    }

    selectedGroupsDiv.style.display = "block"
    selectedGroupsList.innerHTML = ""

    selectedGroups.forEach(group => {
      const tag = document.createElement("span")
      tag.className = "selected-tag"
      tag.textContent = group.name
      selectedGroupsList.appendChild(tag)
    })
  }

  function handleCreateWorkout() {
    if (selectedGroups.length === 0) {
      showError("Selecione pelo menos um grupo muscular para criar o treino.")
      return
    }

    const currentWorkout = {
      muscleGroups: selectedGroups,
      createdAt: new Date().toISOString()
    }

    try {
      localStorage.setItem("gymplanner_current_workout", JSON.stringify(currentWorkout))
      showSuccess("Grupos selecionados! Clique no link abaixo para continuar.")
      
      createNavigationLink()

    } catch (error) {
      showError("Erro ao processar os dados. Tente novamente.")
      console.error("Erro ao salvar no localStorage:", error)
    }
  }

  function handleBackButton() {
    if (selectedGroups.length > 0) {
      const confirm = window.confirm("Você tem grupos musculares selecionados. Tem certeza que deseja voltar? A seleção será perdida.")
      if (!confirm) return
    }
    
    clearSelection()
    showSuccess("Seleção limpa!")
  }

  function createNavigationLink() {
    const existingLink = document.getElementById("nextStepLink")
    if (existingLink) {
      existingLink.remove()
    }

    const linkContainer = document.createElement("div")
    linkContainer.id = "nextStepLink"
    linkContainer.style.cssText = `
      text-align: center;
      margin: 1rem 0;
      padding: 1rem;
      background-color: #f0f9ff;
      border: 1px solid #0ea5e9;
      border-radius: 0.5rem;
    `

    const link = document.createElement("a")
    link.href = "exercicios.html"
    link.textContent = "Continuar para Seleção de Exercícios →"
    link.style.cssText = `
      color: #0ea5e9;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
    `

    link.addEventListener("mouseover", () => {
      link.style.textDecoration = "underline"
    })

    link.addEventListener("mouseout", () => {
      link.style.textDecoration = "none"
    })

    linkContainer.appendChild(link)
    createWorkoutBtn.parentNode.insertBefore(linkContainer, createWorkoutBtn.nextSibling)
  }

  function clearSelection() {
    selectedGroups = []
    muscleCards.forEach(card => {
      card.classList.remove("selected")
    })
    updateSelectedGroupsDisplay()
    
    const existingLink = document.getElementById("nextStepLink")
    if (existingLink) {
      existingLink.remove()
    }
  }

  function showSuccess(message) {
    const existingToast = document.querySelector(".toast-message")
    if (existingToast) {
      existingToast.remove()
    }

    const toast = document.createElement("div")
    toast.className = "toast-message"
    toast.textContent = message

    document.body.appendChild(toast)

    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.remove()
      }
    }, 6000)
  }

  function showError(message) {
    const existingToast = document.querySelector(".toast-message")
    if (existingToast) {
      existingToast.remove()
    }

    const toast = document.createElement("div")
    toast.className = "toast-message toast-error"
    toast.textContent = message
    toast.style.backgroundColor = "#ef4444"

    document.body.appendChild(toast)

    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.remove()
      }
    }, 4000)
  }

  window.viewSavedData = () => {
    const currentWorkout = JSON.parse(localStorage.getItem("gymplanner_current_workout") || "null")
    const allWorkouts = JSON.parse(localStorage.getItem("gymplanner_workouts") || "[]")

    console.log("Treino atual:", currentWorkout)
    console.log("Todos os treinos:", allWorkouts)

    return {
      currentWorkout: currentWorkout,
      allWorkouts: allWorkouts
    }
  }

  window.clearSavedData = () => {
    localStorage.removeItem("gymplanner_current_workout")
    localStorage.removeItem("gymplanner_workouts")
    console.log("Dados limpos do localStorage")
    
    clearSelection()
  }

  window.addEventListener("load", () => {
    const currentWorkout = JSON.parse(localStorage.getItem("gymplanner_current_workout") || "null")
    if (currentWorkout && currentWorkout.muscleGroups) {
      currentWorkout.muscleGroups.forEach(group => {
        const card = document.querySelector(`[data-group="${group.id}"]`)
        if (card) {
          card.classList.add("selected")
          selectedGroups.push(group)
        }
      })
      updateSelectedGroupsDisplay()
      createNavigationLink()
    }
  })
})