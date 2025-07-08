/**
 * Sistema de Gerenciamento de Treinos
 * Controla a visualização dos treinos por dia da semana
 */

class WorkoutManager {
  constructor() {
    this.workouts = this.loadWorkouts()
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
    this.updateDayCards()
    this.updateStatistics()
    this.setupEventListeners()
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Botões de visualizar treino
    const viewButtons = document.querySelectorAll('.view-day-btn')
    viewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const day = e.target.dataset.day
        this.navigateToDay(day)
      })
    })

    // Click nos cards dos dias
    const dayCards = document.querySelectorAll('.day-card')
    dayCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Só navega se não clicou no botão
        if (!e.target.classList.contains('view-day-btn')) {
          const day = card.dataset.day
          this.navigateToDay(day)
        }
      })
    })
  }

  /**
   * Atualiza os cards dos dias
   */
  updateDayCards() {
    Object.keys(this.dayNames).forEach(day => {
      this.updateDayCard(day)
    })
  }

  /**
   * Atualiza um card específico do dia
   */
  updateDayCard(day) {
    const exercises = this.workouts[day] || []
    const countElement = document.getElementById(`count-${day}`)
    const previewElement = document.getElementById(`preview-${day}`)
    const dayCard = document.querySelector(`[data-day="${day}"]`)

    // Atualiza contador
    const exerciseCount = exercises.length
    countElement.textContent = exerciseCount === 0 
      ? 'Nenhum exercício' 
      : `${exerciseCount} exercício${exerciseCount > 1 ? 's' : ''}`

    // Atualiza preview
    this.updateDayPreview(previewElement, exercises)

    // Atualiza classe do card
    if (exerciseCount > 0) {
      dayCard.classList.add('has-exercises')
    } else {
      dayCard.classList.remove('has-exercises')
    }
  }

  /**
   * Atualiza preview dos exercícios do dia
   */
  updateDayPreview(container, exercises) {
    container.innerHTML = ''

    if (exercises.length === 0) {
      container.innerHTML = '<p class="no-exercises">Nenhum exercício cadastrado</p>'
      return
    }

    // Mostra até 3 exercícios no preview
    const previewExercises = exercises.slice(0, 3)
    
    previewExercises.forEach(exercise => {
      const exerciseItem = document.createElement('div')
      exerciseItem.className = 'preview-exercise-item'
      exerciseItem.innerHTML = `
        <span class="exercise-name">${exercise.name}</span>
        <span class="exercise-muscle">${exercise.muscleGroup}</span>
      `
      container.appendChild(exerciseItem)
    })

    // Se há mais exercícios, mostra indicador
    if (exercises.length > 3) {
      const moreIndicator = document.createElement('div')
      moreIndicator.className = 'more-exercises'
      moreIndicator.textContent = `+${exercises.length - 3} mais`
      container.appendChild(moreIndicator)
    }
  }

  /**
   * Atualiza estatísticas
   */
  updateStatistics() {
    const totalExercises = this.getTotalExercises()
    const activeDays = this.getActiveDays()
    const muscleGroups = this.getUniqueMuscleGroups()

    document.getElementById('totalExercises').textContent = totalExercises
    document.getElementById('activeDays').textContent = activeDays
    document.getElementById('muscleGroups').textContent = muscleGroups
  }

  /**
   * Obtém total de exercícios
   */
  getTotalExercises() {
    return Object.values(this.workouts)
      .flat()
      .length
  }

  /**
   * Obtém número de dias com treino
   */
  getActiveDays() {
    return Object.keys(this.workouts)
      .filter(day => this.workouts[day] && this.workouts[day].length > 0)
      .length
  }

  /**
   * Obtém número de grupos musculares únicos
   */
  getUniqueMuscleGroups() {
    const allExercises = Object.values(this.workouts).flat()
    const muscleGroups = new Set(
      allExercises.map(exercise => exercise.muscleGroup)
    )
    return muscleGroups.size
  }

  /**
   * Navega para a página de exercícios do dia
   */
  navigateToDay(day) {
    const exercises = this.workouts[day] || []
    
    if (exercises.length === 0) {
      this.showToast('Este dia não possui exercícios cadastrados', 'info')
      return
    }

    // Salva o dia selecionado para a próxima página
    localStorage.setItem('gymplanner_selected_day', day)
    
    // Navega para página de exercícios do dia
    window.location.href = `day-workout.html?day=${day}`
  }

  /**
   * Sistema de notificações toast
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

  /**
   * Atualiza dados quando a página fica visível
   */
  handleVisibilityChange() {
    if (!document.hidden) {
      this.workouts = this.loadWorkouts()
      this.updateDayCards()
      this.updateStatistics()
    }
  }
}

// CSS adicional para os estilos específicos
const workoutStyles = `
  .days-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .day-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    border: 2px solid #e5e7eb;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .day-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.1);
    border-color: #d1d5db;
  }

  .day-card.has-exercises {
    border-color: #10b981;
    background: linear-gradient(135deg, #f0fdf4, #ffffff);
  }

  .day-card.has-exercises:hover {
    box-shadow: 0 12px 25px rgba(16, 185, 129, 0.2);
  }

  .day-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .day-header h3 {
    margin: 0;
    color: #374151;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .exercise-count {
    background: #f3f4f6;
    color: #6b7280;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .day-card.has-exercises .exercise-count {
    background: #dcfce7;
    color: #16a34a;
  }

  .day-preview {
    min-height: 80px;
    margin-bottom: 1rem;
  }

  .preview-exercise-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .preview-exercise-item:last-child {
    border-bottom: none;
  }

  .preview-exercise-item .exercise-name {
    font-weight: 500;
    color: #374151;
    font-size: 0.9rem;
  }

  .preview-exercise-item .exercise-muscle {
    font-size: 0.75rem;
    color: #6b7280;
    background: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
  }

  .more-exercises {
    text-align: center;
    color: #10b981;
    font-size: 0.85rem;
    font-weight: 500;
    margin-top: 0.5rem;
  }

  .no-exercises {
    text-align: center;
    color: #9ca3af;
    font-style: italic;
    padding: 1rem 0;
    margin: 0;
  }

  .view-day-btn {
    width: 100%;
    background: #f3f4f6;
    color: #374151;
    border: none;
    padding: 0.75rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .view-day-btn:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
  }

  .day-card.has-exercises .view-day-btn {
    background: #10b981;
    color: white;
  }

  .day-card.has-exercises .view-day-btn:hover {
    background: #059669;
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    text-align: center;
  }

  .stat-card h3 {
    margin: 0 0 0.5rem 0;
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #10b981;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .header .page-title {
    margin: 0;
    color: #374151;
    font-size: 2rem;
    font-weight: 700;
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
    .days-container {
      grid-template-columns: 1fr;
    }
    
    .stats-container {
      grid-template-columns: 1fr;
    }
    
    .header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }
    
    .header .btn-secondary {
      width: 100%;
    }
  }
`

// Adiciona estilos
const styleSheet = document.createElement('style')
styleSheet.textContent = workoutStyles
document.head.appendChild(styleSheet)

// Inicializa quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const workoutManager = new WorkoutManager()
  
  // Atualiza dados quando a página fica visível
  document.addEventListener('visibilitychange', () => {
    workoutManager.handleVisibilityChange()
  })
})

// Funções globais para debug
window.viewWorkouts = () => {
  const workouts = JSON.parse(localStorage.getItem('gymplanner_workouts') || '{}')
  console.log('Treinos:', workouts)
  return workouts
}

window.clearWorkouts = () => {
  localStorage.removeItem('gymplanner_workouts')
  location.reload()
}
