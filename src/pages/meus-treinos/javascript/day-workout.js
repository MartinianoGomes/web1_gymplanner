/**
 * Sistema de Gerenciamento de Treino Diário
 * Controla exercícios de um dia específico com seleção e exclusão
 */

class DayWorkoutManager {
  constructor() {
    this.currentDay = this.getCurrentDay()
    this.workouts = this.loadWorkouts()
    this.selectedExercises = new Set()
    this.dayNames = {
      segunda: 'Segunda-feira',
      terca: 'Terça-feira', 
      quarta: 'Quarta-feira',
      quinta: 'Quinta-feira',
      sexta: 'Sexta-feira',
      sabado: 'Sábado',
      domingo: 'Domingo'
    }
    this.init()
  }

  /**
   * Obtém o dia atual da URL ou localStorage
   */
  getCurrentDay() {
    const urlParams = new URLSearchParams(window.location.search)
    const dayFromUrl = urlParams.get('day')
    const dayFromStorage = localStorage.getItem('gymplanner_selected_day')
    
    return dayFromUrl || dayFromStorage || 'segunda'
  }

  /**
   * Carrega treinos do localStorage
   */
  loadWorkouts() {
    return JSON.parse(localStorage.getItem('gymplanner_workouts') || '{}')
  }

  /**
   * Salva treinos no localStorage
   */
  saveWorkouts() {
    localStorage.setItem('gymplanner_workouts', JSON.stringify(this.workouts))
  }

  /**
   * Inicializa o sistema
   */
  init() {
    this.updatePageTitle()
    this.renderExercises()
    this.setupEventListeners()
    this.updateUI()
  }

  /**
   * Atualiza título da página
   */
  updatePageTitle() {
    const titleElement = document.getElementById('dayTitle')
    const dayName = this.dayNames[this.currentDay] || 'Treino'
    titleElement.textContent = `Treino - ${dayName}`
    document.title = `${dayName} - GymPlanner`
  }

  /**
   * Renderiza lista de exercícios
   */
  renderExercises() {
    const container = document.getElementById('exercisesList')
    const emptyState = document.getElementById('emptyState')
    const exercises = this.workouts[this.currentDay] || []

    if (exercises.length === 0) {
      container.style.display = 'none'
      emptyState.style.display = 'block'
      return
    }

    container.style.display = 'block'
    emptyState.style.display = 'none'
    container.innerHTML = ''

    exercises.forEach((exercise, index) => {
      const exerciseCard = this.createExerciseCard(exercise, index)
      container.appendChild(exerciseCard)
    })

    this.animateCardsEntry()
  }

  /**
   * Cria card de exercício
   */
  createExerciseCard(exercise, index) {
    const card = document.createElement('div')
    card.className = 'workout-exercise-card'
    card.dataset.exerciseId = exercise.id
    card.dataset.exerciseIndex = index

    const difficultyColors = {
      iniciante: '#10b981',
      intermediario: '#f59e0b', 
      avancado: '#ef4444'
    }

    card.innerHTML = `
      <div class="exercise-checkbox">
        <input type="checkbox" class="exercise-selector" data-exercise-id="${exercise.id}">
      </div>
      <div class="exercise-content">
        <h3 class="exercise-name">${exercise.name}</h3>
        <p class="exercise-description">${exercise.description}</p>
        <div class="exercise-tags">
          <span class="tag tag-difficulty" style="background-color: ${difficultyColors[exercise.difficulty] || '#6b7280'}">
            ${exercise.difficulty ? exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1) : 'Normal'}
          </span>
          <span class="tag tag-muscle">${exercise.muscleGroup || 'Geral'}</span>
          <span class="tag tag-equipment">${this.formatEquipment(exercise.equipment || exercise.aparelho)}</span>
        </div>
        <div class="exercise-meta">
          <span class="added-date">Adicionado em ${this.formatDate(exercise.addedAt)}</span>
        </div>
      </div>
      <div class="exercise-actions">
        <button class="action-btn complete-btn" data-action="complete" data-exercise-id="${exercise.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="action-btn delete-btn" data-action="delete" data-exercise-id="${exercise.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `

    // Marca como completado se necessário
    if (exercise.completed) {
      card.classList.add('completed')
    }

    return card
  }

  /**
   * Formata nome do equipamento
   */
  formatEquipment(equipment) {
    const equipmentNames = {
      'peso_corporal': 'Peso Corporal',
      'halteres': 'Halteres',
      'barra': 'Barra',
      'cabo': 'Cabo/Polia',
      'maquina': 'Máquina',
      'elastico': 'Elástico',
      'Peso corporal': 'Peso Corporal',
      'Banco e barra': 'Banco e Barra',
      'Banco inclinado e halteres': 'Banco Inclinado',
      'Banco e halteres': 'Banco e Halteres',
      'Barras paralelas': 'Paralelas',
      'Crossover (cabos)': 'Crossover',
      'Banco e halter': 'Banco',
      'Banco declinado e barra': 'Banco Declinado'
    }

    return equipmentNames[equipment] || equipment || 'Equipamento'
  }

  /**
   * Formata data
   */
  formatDate(timestamp) {
    if (!timestamp) return 'Data não disponível'
    
    const date = new Date(timestamp)
    return date.toLocaleDateString('pt-BR')
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Seleção de exercícios
    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('exercise-selector')) {
        this.handleExerciseSelection(e.target)
      }
    })

    // Ações nos exercícios
    document.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')
      if (action) {
        const actionType = action.dataset.action
        const exerciseId = action.dataset.exerciseId
        this.handleExerciseAction(actionType, exerciseId)
      }
    })

    // Botões do header
    document.getElementById('selectAllBtn').addEventListener('click', () => {
      this.toggleSelectAll()
    })

    document.getElementById('deleteSelectedBtn').addEventListener('click', () => {
      this.showDeleteConfirmation()
    })

    // Modal de confirmação
    this.setupModalEvents()
  }

  /**
   * Manipula seleção de exercícios
   */
  handleExerciseSelection(checkbox) {
    const exerciseId = checkbox.dataset.exerciseId
    const card = checkbox.closest('.workout-exercise-card')

    if (checkbox.checked) {
      this.selectedExercises.add(exerciseId)
      card.classList.add('selected')
    } else {
      this.selectedExercises.delete(exerciseId)
      card.classList.remove('selected')
    }

    this.updateSelectionUI()
  }

  /**
   * Manipula ações nos exercícios
   */
  handleExerciseAction(action, exerciseId) {
    switch (action) {
      case 'complete':
        this.toggleExerciseCompletion(exerciseId)
        break
      case 'delete':
        this.deleteExercise(exerciseId)
        break
    }
  }

  /**
   * Alterna conclusão do exercício
   */
  toggleExerciseCompletion(exerciseId) {
    const exercises = this.workouts[this.currentDay] || []
    const exercise = exercises.find(ex => ex.id === exerciseId)
    
    if (exercise) {
      exercise.completed = !exercise.completed
      this.saveWorkouts()
      
      const card = document.querySelector(`[data-exercise-id="${exerciseId}"]`)
      if (exercise.completed) {
        card.classList.add('completed')
        this.showToast(`${exercise.name} marcado como concluído`, 'success')
      } else {
        card.classList.remove('completed')
        this.showToast(`${exercise.name} desmarcado`, 'info')
      }
    }
  }

  /**
   * Exclui exercício individual
   */
  deleteExercise(exerciseId) {
    const exercises = this.workouts[this.currentDay] || []
    const exercise = exercises.find(ex => ex.id === exerciseId)
    
    if (exercise) {
      this.workouts[this.currentDay] = exercises.filter(ex => ex.id !== exerciseId)
      this.saveWorkouts()
      this.renderExercises()
      this.updateUI()
      this.showToast(`${exercise.name} removido do treino`, 'info')
    }
  }

  /**
   * Alterna seleção de todos os exercícios
   */
  toggleSelectAll() {
    const checkboxes = document.querySelectorAll('.exercise-selector')
    const allSelected = this.selectedExercises.size === checkboxes.length

    checkboxes.forEach(checkbox => {
      const exerciseId = checkbox.dataset.exerciseId
      const card = checkbox.closest('.workout-exercise-card')

      if (allSelected) {
        // Desmarca todos
        checkbox.checked = false
        card.classList.remove('selected')
        this.selectedExercises.delete(exerciseId)
      } else {
        // Marca todos
        checkbox.checked = true
        card.classList.add('selected')
        this.selectedExercises.add(exerciseId)
      }
    })

    this.updateSelectionUI()
  }

  /**
   * Mostra modal de confirmação de exclusão
   */
  showDeleteConfirmation() {
    if (this.selectedExercises.size === 0) {
      this.showToast('Selecione pelo menos um exercício para excluir', 'warning')
      return
    }

    const modal = document.getElementById('confirmModal')
    const exercisesList = document.getElementById('confirmExercisesList')
    
    // Lista exercícios selecionados
    this.displaySelectedExercisesForDeletion(exercisesList)
    
    modal.style.display = 'flex'
    document.body.style.overflow = 'hidden'
  }

  /**
   * Exibe exercícios selecionados no modal de confirmação
   */
  displaySelectedExercisesForDeletion(container) {
    container.innerHTML = ''
    
    const exercises = this.workouts[this.currentDay] || []
    const selectedExerciseData = exercises.filter(ex => this.selectedExercises.has(ex.id))
    
    selectedExerciseData.forEach(exercise => {
      const item = document.createElement('div')
      item.className = 'confirm-exercise-item'
      item.innerHTML = `
        <span class="exercise-name">${exercise.name}</span>
        <span class="exercise-muscle">${exercise.muscleGroup}</span>
      `
      container.appendChild(item)
    })
  }

  /**
   * Configura eventos do modal
   */
  setupModalEvents() {
    const modal = document.getElementById('confirmModal')
    const closeBtn = document.getElementById('closeConfirmModal')
    const cancelBtn = document.getElementById('cancelDelete')
    const confirmBtn = document.getElementById('confirmDelete')

    [closeBtn, cancelBtn].forEach(btn => {
      btn.addEventListener('click', () => this.closeDeleteConfirmation())
    })

    confirmBtn.addEventListener('click', () => this.confirmDelete())

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeDeleteConfirmation()
      }
    })
  }

  /**
   * Fecha modal de confirmação
   */
  closeDeleteConfirmation() {
    const modal = document.getElementById('confirmModal')
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }

  /**
   * Confirma exclusão dos exercícios selecionados
   */
  confirmDelete() {
    const exercises = this.workouts[this.currentDay] || []
    const remainingExercises = exercises.filter(ex => !this.selectedExercises.has(ex.id))
    
    this.workouts[this.currentDay] = remainingExercises
    this.saveWorkouts()
    
    const deletedCount = this.selectedExercises.size
    this.selectedExercises.clear()
    
    this.closeDeleteConfirmation()
    this.renderExercises()
    this.updateUI()
    
    this.showToast(`${deletedCount} exercício${deletedCount > 1 ? 's' : ''} removido${deletedCount > 1 ? 's' : ''} do treino`, 'success')
  }

  /**
   * Atualiza interface baseada na seleção
   */
  updateSelectionUI() {
    const deleteBtn = document.getElementById('deleteSelectedBtn')
    const selectAllBtn = document.getElementById('selectAllBtn')
    const selectedCount = this.selectedExercises.size
    
    // Botão de excluir
    deleteBtn.disabled = selectedCount === 0
    deleteBtn.textContent = selectedCount === 0 
      ? 'Excluir Selecionados' 
      : `Excluir ${selectedCount} Selecionado${selectedCount > 1 ? 's' : ''}`
    
    // Botão de selecionar todos
    const totalExercises = document.querySelectorAll('.exercise-selector').length
    selectAllBtn.textContent = selectedCount === totalExercises 
      ? 'Desmarcar Todos' 
      : 'Selecionar Todos'
  }

  /**
   * Atualiza UI geral
   */
  updateUI() {
    const exercises = this.workouts[this.currentDay] || []
    const countElement = document.getElementById('exerciseCount')
    
    const exerciseCount = exercises.length
    countElement.textContent = exerciseCount === 0 
      ? 'Nenhum exercício' 
      : `${exerciseCount} exercício${exerciseCount > 1 ? 's' : ''}`
    
    this.updateSelectionUI()
  }

  /**
   * Animação de entrada dos cards
   */
  animateCardsEntry() {
    const cards = document.querySelectorAll('.workout-exercise-card')
    
    cards.forEach((card, index) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(20px)'
      
      setTimeout(() => {
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, index * 100)
    })
  }

  /**
   * Sistema de notificações
   */
  showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast-message')
    if (existingToast) {
      existingToast.remove()
    }

    const toast = document.createElement('div')
    toast.className = 'toast-message'
    
    const colors = {
      success: '#10b981',
      info: '#3b82f6',
      warning: '#f59e0b',
      error: '#ef4444'
    }

    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
      max-width: 350px;
    `

    toast.textContent = message
    document.body.appendChild(toast)

    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.style.animation = 'slideOutRight 0.3s ease-in'
        setTimeout(() => toast.remove(), 300)
      }
    }, 3000)
  }
}

// CSS para a página de treino diário
const dayWorkoutStyles = `
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f3f4f6;
    color: #374151;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
  }

  .back-btn:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
  }

  .header-info .page-title {
    margin: 0;
    color: #374151;
    font-size: 1.75rem;
    font-weight: 700;
  }

  .header-info .exercise-count {
    margin: 0;
    color: #6b7280;
    font-size: 0.9rem;
  }

  .header-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .btn-danger {
    background: #ef4444;
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-danger:hover:not(:disabled) {
    background: #dc2626;
    transform: translateY(-1px);
  }

  .btn-danger:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
  }

  .workout-exercise-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    border: 2px solid #e5e7eb;
    margin-bottom: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .workout-exercise-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }

  .workout-exercise-card.selected {
    border-color: #3b82f6;
    background: linear-gradient(135deg, #eff6ff, #ffffff);
  }

  .workout-exercise-card.completed {
    border-color: #10b981;
    background: linear-gradient(135deg, #f0fdf4, #ffffff);
    opacity: 0.8;
  }

  .workout-exercise-card.completed .exercise-name {
    text-decoration: line-through;
    color: #6b7280;
  }

  .exercise-checkbox {
    margin-top: 0.25rem;
  }

  .exercise-selector {
    width: 18px;
    height: 18px;
    accent-color: #3b82f6;
  }

  .exercise-content {
    flex: 1;
  }

  .exercise-name {
    margin: 0 0 0.5rem 0;
    color: #374151;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .exercise-description {
    margin: 0 0 1rem 0;
    color: #6b7280;
    line-height: 1.5;
  }

  .exercise-meta {
    margin-top: 0.75rem;
  }

  .added-date {
    font-size: 0.8rem;
    color: #9ca3af;
  }

  .exercise-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-btn {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .complete-btn {
    background: #f0fdf4;
    color: #16a34a;
  }

  .complete-btn:hover {
    background: #dcfce7;
    transform: scale(1.05);
  }

  .delete-btn {
    background: #fef2f2;
    color: #dc2626;
  }

  .delete-btn:hover {
    background: #fee2e2;
    transform: scale(1.05);
  }

  .confirm-exercise-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: #f9fafb;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }

  .confirm-exercise-item .exercise-name {
    font-weight: 500;
    color: #374151;
  }

  .confirm-exercise-item .exercise-muscle {
    font-size: 0.85rem;
    color: #6b7280;
    background: #e5e7eb;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
  }

  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      align-items: stretch;
    }
    
    .header-left {
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
    }
    
    .header-actions {
      flex-direction: column;
    }
    
    .workout-exercise-card {
      flex-direction: column;
      gap: 1rem;
    }
    
    .exercise-actions {
      flex-direction: row;
      justify-content: center;
    }
  }
`

// Adiciona estilos
const styleSheet = document.createElement('style')
styleSheet.textContent = dayWorkoutStyles
document.head.appendChild(styleSheet)

// Inicializa quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new DayWorkoutManager()
})

// Funções globais para debug
window.viewDayWorkout = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const day = urlParams.get('day') || localStorage.getItem('gymplanner_selected_day')
  const workouts = JSON.parse(localStorage.getItem('gymplanner_workouts') || '{}')
  console.log(`Treino do dia ${day}:`, workouts[day])
  return workouts[day]
}
