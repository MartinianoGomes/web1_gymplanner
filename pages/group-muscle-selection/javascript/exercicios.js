document.addEventListener("DOMContentLoaded", () => {
  const selectedMuscleGroupsDiv = document.getElementById("selectedMuscleGroups")
  const muscleGroupSelect = document.getElementById("muscleGroupSelect")
  const exerciseSelect = document.getElementById("exerciseSelect")
  const addExerciseBtn = document.getElementById("addExerciseBtn")
  const exercisesList = document.getElementById("exercisesList")
  const backBtn = document.getElementById("backBtn")
  const finishWorkoutBtn = document.getElementById("finishWorkoutBtn")

  const exercisesByMuscle = {
    peito: [
      "Supino reto com barra",
      "Supino inclinado com halteres",
      "Flexão de braço",
      "Crucifixo com halteres",
      "Supino declinado",
      "Peck deck",
      "Paralelas",
      "Pullover"
    ],
    gluteo: [
      "Agachamento livre",
      "Agachamento búlgaro",
      "Stiff",
      "Hip thrust",
      "Afundo",
      "Cadeira abdutora",
      "Elevação pélvica",
      "Agachamento sumo"
    ],
    trapezio: [
      "Encolhimento com barra",
      "Encolhimento com halteres",
      "Remada alta",
      "Face pull",
      "Elevação lateral posterior",
      "Remada curvada pegada fechada"
    ],
    biceps: [
      "Rosca direta com barra",
      "Rosca alternada com halteres",
      "Rosca martelo",
      "Rosca concentrada",
      "Rosca no cabo",
      "Rosca 21",
      "Rosca scott",
      "Rosca inversa"
    ],
    panturrilha: [
      "Elevação de panturrilha em pé",
      "Elevação de panturrilha sentado",
      "Elevação no leg press",
      "Elevação unilateral",
      "Panturrilha no smith",
      "Caminhada na ponta dos pés"
    ],
    abdomen: [
      "Abdominal tradicional",
      "Prancha",
      "Abdominal bicicleta",
      "Elevação de pernas",
      "Russian twist",
      "Mountain climber",
      "Abdominal canivete",
      "Prancha lateral"
    ],
    quadriceps: [
      "Agachamento livre",
      "Leg press",
      "Extensão de pernas",
      "Afundo",
      "Agachamento hack",
      "Agachamento frontal",
      "Passada",
      "Agachamento búlgaro"
    ],
    triceps: [
      "Tríceps testa",
      "Tríceps francês",
      "Mergulho entre bancos",
      "Tríceps corda",
      "Tríceps supinado",
      "Paralelas",
      "Tríceps coice",
      "Supino fechado"
    ],
    costas: [
      "Puxada frontal",
      "Remada curvada",
      "Puxada alta",
      "Remada unilateral",
      "Barra fixa",
      "Pulldown",
      "Remada baixa",
      "Levantamento terra"
    ],
    posterior: [
      "Stiff",
      "Mesa flexora",
      "Stiff unilateral",
      "Good morning",
      "Cadeira flexora",
      "Levantamento terra romeno",
      "Nordic curl"
    ]
  }

  let selectedMuscleGroups = []
  let addedExercises = []

  init()

  function init() {
    if (!loadSelectedMuscleGroups()) {
      return 
    }
    setupEventListeners()
    updateUI()
  }

  function loadSelectedMuscleGroups() {
    try {
      const currentWorkout = JSON.parse(localStorage.getItem("gymplanner_current_workout") || "null")
      
      if (!currentWorkout || !currentWorkout.muscleGroups || currentWorkout.muscleGroups.length === 0) {
        showError("Nenhum grupo muscular encontrado. Redirecionando para a primeira tela...")
        setTimeout(() => {
          window.location.href = "index.html"
        }, 3000)
        return false
      }

      selectedMuscleGroups = currentWorkout.muscleGroups
      displaySelectedMuscleGroups()
      populateMuscleGroupSelect()
      
      showSuccess("Dados carregados com sucesso! Selecione os exercícios.")
      return true

    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      showError("Erro ao carregar os dados. Redirecionando...")
      setTimeout(() => {
        window.location.href = "index.html"
      }, 3000)
      return false
    }
  }

  function displaySelectedMuscleGroups() {
    const html = `
      <h3>Grupos Musculares Selecionados:</h3>
      <div class="muscle-tags">
        ${selectedMuscleGroups.map(group => 
          `<span class="muscle-tag">${group.name}</span>`
        ).join('')}
      </div>
    `
    selectedMuscleGroupsDiv.innerHTML = html
  }

  function populateMuscleGroupSelect() {
    muscleGroupSelect.innerHTML = '<option value="">Selecione um grupo muscular</option>'
    
    selectedMuscleGroups.forEach(group => {
      const option = document.createElement("option")
      option.value = group.id
      option.textContent = group.name
      muscleGroupSelect.appendChild(option)
    })
  }

  function setupEventListeners() {
    muscleGroupSelect.addEventListener("change", handleMuscleGroupChange)
    exerciseSelect.addEventListener("change", handleExerciseChange)
    addExerciseBtn.addEventListener("click", handleAddExercise)
    backBtn.addEventListener("click", handleBack)
    finishWorkoutBtn.addEventListener("click", handleFinishWorkout)
  }

  function handleMuscleGroupChange() {
    const selectedMuscle = muscleGroupSelect.value
    
    if (!selectedMuscle) {
      exerciseSelect.innerHTML = '<option value="">Primeiro selecione um grupo muscular</option>'
      exerciseSelect.disabled = true
      addExerciseBtn.disabled = true
      return
    }

    const exercises = exercisesByMuscle[selectedMuscle] || []
    exerciseSelect.innerHTML = '<option value="">Selecione um exercício</option>'
    
    exercises.forEach(exercise => {
      const option = document.createElement("option")
      option.value = exercise
      option.textContent = exercise
      exerciseSelect.appendChild(option)
    })

    exerciseSelect.disabled = false
    addExerciseBtn.disabled = true
  }

  function handleExerciseChange() {
    addExerciseBtn.disabled = !exerciseSelect.value
  }

  function handleAddExercise() {
    const selectedMuscle = muscleGroupSelect.value
    const selectedExercise = exerciseSelect.value
    
    if (!selectedMuscle || !selectedExercise) {
      showError("Selecione um grupo muscular e um exercício!")
      return
    }

    const exerciseExists = addedExercises.some(ex => 
      ex.name === selectedExercise && ex.muscleGroup === selectedMuscle
    )

    if (exerciseExists) {
      showError("Este exercício já foi adicionado!")
      return
    }

    const exercise = {
      id: Date.now(),
      name: selectedExercise,
      muscleGroup: selectedMuscle,
      muscleGroupName: selectedMuscleGroups.find(g => g.id === selectedMuscle)?.name || selectedMuscle
    }

    addedExercises.push(exercise)
    updateExercisesList()
    
    exerciseSelect.value = ""
    addExerciseBtn.disabled = true
    
    showSuccess("Exercício adicionado com sucesso!")
  }

  function updateExercisesList() {
    if (addedExercises.length === 0) {
      exercisesList.innerHTML = '<p class="empty-message">Nenhum exercício adicionado ainda</p>'
      finishWorkoutBtn.disabled = true
      return
    }

    const html = addedExercises.map(exercise => `
      <div class="exercise-item">
        <div class="exercise-info">
          <div class="exercise-name">${exercise.name}</div>
          <span class="exercise-muscle">${exercise.muscleGroupName}</span>
        </div>
        <button class="remove-exercise-btn" onclick="removeExercise(${exercise.id})">
          Remover
        </button>
      </div>
    `).join('')

    exercisesList.innerHTML = html
    finishWorkoutBtn.disabled = false
  }

  function handleBack() {
    const hasExercises = addedExercises.length > 0
    let confirmMessage = "Tem certeza que deseja voltar?"
    
    if (hasExercises) {
      confirmMessage = `Você tem ${addedExercises.length} exercício(s) adicionado(s). Tem certeza que deseja voltar? Os exercícios serão perdidos.`
    }
    
    const confirm = window.confirm(confirmMessage)
    if (confirm) {
      window.location.href = "index.html"
    }
  }

  function handleFinishWorkout() {
    if (addedExercises.length === 0) {
      showError("Adicione pelo menos um exercício para finalizar o treino!")
      return
    }

    const completeWorkout = {
      id: Date.now(),
      name: `Treino ${new Date().toLocaleDateString('pt-BR')}`,
      muscleGroups: selectedMuscleGroups,
      exercises: addedExercises,
      createdAt: new Date().toISOString(),
      totalExercises: addedExercises.length
    }

    try {
      const existingWorkouts = JSON.parse(localStorage.getItem("gymplanner_workouts") || "[]")
      existingWorkouts.push(completeWorkout)
      localStorage.setItem("gymplanner_workouts", JSON.stringify(existingWorkouts))

      localStorage.removeItem("gymplanner_current_workout")

      showSuccess(`Treino finalizado com sucesso! ${addedExercises.length} exercícios salvos.`)
      
      muscleGroupSelect.disabled = true
      exerciseSelect.disabled = true
      addExerciseBtn.disabled = true
      finishWorkoutBtn.disabled = true

      setTimeout(() => {
        createBackToStartButton()
      }, 2000)

    } catch (error) {
      showError("Erro ao salvar o treino. Tente novamente.")
      console.error("Erro ao salvar:", error)
    }
  }

  function createBackToStartButton() {
    const buttonContainer = document.createElement("div")
    buttonContainer.style.cssText = `
      text-align: center;
      margin-top: 1rem;
    `

    const backButton = document.createElement("button")
    backButton.textContent = "Criar Novo Treino"
    backButton.className = "submit-btn"
    backButton.onclick = () => {
      window.location.href = "index.html"
    }

    buttonContainer.appendChild(backButton)
    finishWorkoutBtn.parentNode.insertBefore(buttonContainer, finishWorkoutBtn.nextSibling)
  }

  window.removeExercise = (exerciseId) => {
    const exerciseName = addedExercises.find(ex => ex.id === exerciseId)?.name
    addedExercises = addedExercises.filter(ex => ex.id !== exerciseId)
    updateExercisesList()
    showSuccess(`"${exerciseName}" removido!`)
  }

  function updateUI() {
    finishWorkoutBtn.disabled = addedExercises.length === 0
  }

  function showSuccess(message) {
    showToast(message, "success")
  }

  function showError(message) {
    showToast(message, "error")
  }

  function showToast(message, type = "success") {
    const existingToast = document.querySelector(".toast-message")
    if (existingToast) {
      existingToast.remove()
    }

    const toast = document.createElement("div")
    toast.className = `toast-message ${type === "error" ? "toast-error" : ""}`
    toast.textContent = message

    document.body.appendChild(toast)

    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.remove()
      }
    }, 4000)
  }

  window.viewCurrentWorkout = () => {
    console.log("Grupos musculares:", selectedMuscleGroups)
    console.log("Exercícios adicionados:", addedExercises)
    return { selectedMuscleGroups, addedExercises }
  }

  window.viewAllWorkouts = () => {
    const workouts = JSON.parse(localStorage.getItem("gymplanner_workouts") || "[]")
    console.log("Todos os treinos salvos:", workouts)
    return workouts
  }

  window.clearAllData = () => {
    localStorage.removeItem("gymplanner_current_workout")
    localStorage.removeItem("gymplanner_workouts")
    console.log("Todos os dados limpos")
    location.reload()
  }
})