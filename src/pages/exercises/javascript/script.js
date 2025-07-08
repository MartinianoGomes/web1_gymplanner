/**
 * Sistema de Gerenciamento de Exercícios
 * Filtra exercícios dinamicamente baseado no grupo muscular selecionado
 */

class ExerciseManager {
  constructor() {
    this.selectedExercises = JSON.parse(localStorage.getItem("gymplanner_selected_exercises") || "[]")
    this.currentMuscleGroup = this.loadSelectedMuscleGroup()
    this.exerciseDatabase = this.initializeExerciseDatabase()
    this.init()
  }

  /**
   * Carrega dados do grupo muscular selecionado
   */
  loadSelectedMuscleGroup() {
    const saved = localStorage.getItem('gymplanner_selected_muscle_group')
    return saved ? JSON.parse(saved) : null
  }

  /**
   * Base de dados completa de exercícios
   */
  initializeExerciseDatabase() {
    return {
      // PEITO
      supino_reto: {
        id: 'supino_reto',
        name: 'Supino Reto',
        description: 'Exercício fundamental para desenvolvimento do peitoral, realizado com barra em banco horizontal.',
        muscleGroup: 'peito',
        difficulty: 'intermediario',
        equipment: 'barra'
      },
      supino_inclinado: {
        id: 'supino_inclinado',
        name: 'Supino Inclinado',
        description: 'Variação do supino que enfatiza a porção superior do peitoral.',
        muscleGroup: 'peito',
        difficulty: 'intermediario',
        equipment: 'barra'
      },
      crucifixo: {
        id: 'crucifixo',
        name: 'Crucifixo',
        description: 'Exercício de isolamento para peitoral usando halteres ou cabos.',
        muscleGroup: 'peito',
        difficulty: 'iniciante',
        equipment: 'halteres'
      },
      flexao: {
        id: 'flexao',
        name: 'Flexão de Braço',
        description: 'Exercício clássico usando peso corporal para fortalecer peito, ombros e tríceps.',
        muscleGroup: 'peito',
        difficulty: 'iniciante',
        equipment: 'peso_corporal'
      },
      supino_declinado: {
        id: 'supino_declinado',
        name: 'Supino Declinado',
        description: 'Variação que trabalha a porção inferior do peitoral.',
        muscleGroup: 'peito',
        difficulty: 'avancado',
        equipment: 'barra'
      },
      crossover: {
        id: 'crossover',
        name: 'Crossover',
        description: 'Exercício em polia que proporciona ótima contração do peitoral.',
        muscleGroup: 'peito',
        difficulty: 'intermediario',
        equipment: 'cabo'
      },

      // GLÚTEO
      agachamento: {
        id: 'agachamento',
        name: 'Agachamento',
        description: 'Exercício fundamental para glúteos e quadríceps, pode ser feito livre ou com peso.',
        muscleGroup: 'gluteo',
        difficulty: 'iniciante',
        equipment: 'peso_corporal'
      },
      hip_thrust: {
        id: 'hip_thrust',
        name: 'Hip Thrust',
        description: 'Exercício específico para ativação e fortalecimento dos glúteos.',
        muscleGroup: 'gluteo',
        difficulty: 'intermediario',
        equipment: 'halteres'
      },
      bulgaro: {
        id: 'bulgaro',
        name: 'Agachamento Búlgaro',
        description: 'Agachamento unilateral que intensifica o trabalho de glúteos e quadríceps.',
        muscleGroup: 'gluteo',
        difficulty: 'intermediario',
        equipment: 'halteres'
      },
      stiff: {
        id: 'stiff',
        name: 'Stiff',
        description: 'Levantamento terra com pernas rígidas, excelente para glúteos e posteriores.',
        muscleGroup: 'gluteo',
        difficulty: 'intermediario',
        equipment: 'barra'
      },
      coice: {
        id: 'coice',
        name: 'Coice de Glúteo',
        description: 'Exercício de isolamento para glúteos, pode ser feito em quatro apoios.',
        muscleGroup: 'gluteo',
        difficulty: 'iniciante',
        equipment: 'peso_corporal'
      },
      abducao_quadril: {
        id: 'abducao_quadril',
        name: 'Abdução de Quadril',
        description: 'Exercício para glúteo médio, importante para estabilidade do quadril.',
        muscleGroup: 'gluteo',
        difficulty: 'iniciante',
        equipment: 'elastico'
      },

      // TRÍCEPS
      triceps_frances: {
        id: 'triceps_frances',
        name: 'Tríceps Francês',
        description: 'Exercício clássico de isolamento para tríceps, executado deitado.',
        muscleGroup: 'triceps',
        difficulty: 'intermediario',
        equipment: 'halteres'
      },
      triceps_testa: {
        id: 'triceps_testa',
        name: 'Tríceps Testa',
        description: 'Variação do tríceps francês com movimento até a testa.',
        muscleGroup: 'triceps',
        difficulty: 'intermediario',
        equipment: 'barra'
      },
      triceps_corda: {
        id: 'triceps_corda',
        name: 'Tríceps na Corda',
        description: 'Exercício em polia alta usando corda, ótimo para definição.',
        muscleGroup: 'triceps',
        difficulty: 'iniciante',
        equipment: 'cabo'
      },
      mergulho: {
        id: 'mergulho',
        name: 'Mergulho',
        description: 'Exercício com peso corporal para tríceps e peito.',
        muscleGroup: 'triceps',
        difficulty: 'intermediario',
        equipment: 'peso_corporal'
      },
      triceps_coice: {
        id: 'triceps_coice',
        name: 'Tríceps Coice',
        description: 'Exercício unilateral de isolamento para tríceps.',
        muscleGroup: 'triceps',
        difficulty: 'iniciante',
        equipment: 'halteres'
      },
      supino_fechado: {
        id: 'supino_fechado',
        name: 'Supino Pegada Fechada',
        description: 'Variação do supino que enfatiza o trabalho de tríceps.',
        muscleGroup: 'triceps',
        difficulty: 'intermediario',
        equipment: 'barra'
      },

      // BÍCEPS
      rosca_direta: {
        id: 'rosca_direta',
        name: 'Rosca Direta',
        description: 'Exercício fundamental para desenvolvimento dos bíceps.',
        muscleGroup: 'biceps',
        difficulty: 'iniciante',
        equipment: 'barra'
      },
      rosca_martelo: {
        id: 'rosca_martelo',
        name: 'Rosca Martelo',
        description: 'Variação que trabalha bíceps e antebraços com pegada neutra.',
        muscleGroup: 'biceps',
        difficulty: 'iniciante',
        equipment: 'halteres'
      },
      rosca_concentrada: {
        id: 'rosca_concentrada',
        name: 'Rosca Concentrada',
        description: 'Exercício de isolamento máximo para bíceps.',
        muscleGroup: 'biceps',
        difficulty: 'intermediario',
        equipment: 'halteres'
      },
      rosca_alternada: {
        id: 'rosca_alternada',
        name: 'Rosca Alternada',
        description: 'Rosca executada alternando os braços para maior concentração.',
        muscleGroup: 'biceps',
        difficulty: 'iniciante',
        equipment: 'halteres'
      },
      rosca_scott: {
        id: 'rosca_scott',
        name: 'Rosca Scott',
        description: 'Exercício no banco scott para isolamento total dos bíceps.',
        muscleGroup: 'biceps',
        difficulty: 'intermediario',
        equipment: 'barra'
      },
      rosca_cabo: {
        id: 'rosca_cabo',
        name: 'Rosca no Cabo',
        description: 'Rosca usando polia, mantém tensão constante no músculo.',
        muscleGroup: 'biceps',
        difficulty: 'intermediario',
        equipment: 'cabo'
      },

      // COSTAS
      puxada_frente: {
        id: 'puxada_frente',
        name: 'Puxada pela Frente',
        description: 'Exercício fundamental para desenvolvimento do latíssimo do dorso.',
        muscleGroup: 'costas',
        difficulty: 'iniciante',
        equipment: 'cabo'
      },
      remada_curvada: {
        id: 'remada_curvada',
        name: 'Remada Curvada',
        description: 'Exercício composto excelente para espessura das costas.',
        muscleGroup: 'costas',
        difficulty: 'intermediario',
        equipment: 'barra'
      },
      pull_down: {
        id: 'pull_down',
        name: 'Pull Down',
        description: 'Variação da puxada com pegada fechada.',
        muscleGroup: 'costas',
        difficulty: 'iniciante',
        equipment: 'cabo'
      },
      remada_cavalinho: {
        id: 'remada_cavalinho',
        name: 'Remada Cavalinho',
        description: 'Remada sentado usando cabo, ótima para meio trapézio.',
        muscleGroup: 'costas',
        difficulty: 'iniciante',
        equipment: 'cabo'
      },
      pullover: {
        id: 'pullover',
        name: 'Pullover',
        description: 'Exercício que trabalha latíssimo e serrátil anterior.',
        muscleGroup: 'costas',
        difficulty: 'intermediario',
        equipment: 'halteres'
      },
      levantamento_terra: {
        id: 'levantamento_terra',
        name: 'Levantamento Terra',
        description: 'Exercício fundamental que trabalha toda a cadeia posterior.',
        muscleGroup: 'costas',
        difficulty: 'avancado',
        equipment: 'barra'
      },

      // OMBROS
      desenvolvimento_militar: {
        id: 'desenvolvimento_militar',
        name: 'Desenvolvimento Militar',
        description: 'Exercício fundamental para desenvolvimento dos deltoides.',
        muscleGroup: 'ombro',
        difficulty: 'intermediario',
        equipment: 'barra'
      },
      elevacao_lateral: {
        id: 'elevacao_lateral',
        name: 'Elevação Lateral',
        description: 'Isolamento para deltoide médio, criando largura nos ombros.',
        muscleGroup: 'ombro',
        difficulty: 'iniciante',
        equipment: 'halteres'
      },
      elevacao_frontal: {
        id: 'elevacao_frontal',
        name: 'Elevação Frontal',
        description: 'Exercício para deltoide anterior.',
        muscleGroup: 'ombro',
        difficulty: 'iniciante',
        equipment: 'halteres'
      },
      desenvolvimento_halteres: {
        id: 'desenvolvimento_halteres',
        name: 'Desenvolvimento com Halteres',
        description: 'Variação com maior amplitude de movimento.',
        muscleGroup: 'ombro',
        difficulty: 'intermediario',
        equipment: 'halteres'
      },
      crucifixo_inverso: {
        id: 'crucifixo_inverso',
        name: 'Crucifixo Inverso',
        description: 'Exercício para deltoide posterior e meio trapézio.',
        muscleGroup: 'ombro',
        difficulty: 'intermediario',
        equipment: 'halteres'
      },

      // PERNAS (Quadríceps, Posterior, Panturrilha)
      agachamento_livre: {
        id: 'agachamento_livre',
        name: 'Agachamento Livre',
        description: 'Exercício rei para membros inferiores.',
        muscleGroup: 'quadriceps',
        difficulty: 'intermediario',
        equipment: 'barra'
      },
      leg_press: {
        id: 'leg_press',
        name: 'Leg Press',
        description: 'Exercício seguro para quadríceps em máquina.',
        muscleGroup: 'quadriceps',
        difficulty: 'iniciante',
        equipment: 'maquina'
      },
      extensao_quadriceps: {
        id: 'extensao_quadriceps',
        name: 'Extensão de Quadríceps',
        description: 'Isolamento para quadríceps na cadeira extensora.',
        muscleGroup: 'quadriceps',
        difficulty: 'iniciante',
        equipment: 'maquina'
      },
      mesa_flexora: {
        id: 'mesa_flexora',
        name: 'Mesa Flexora',
        description: 'Isolamento para posterior de coxa.',
        muscleGroup: 'posterior',
        difficulty: 'iniciante',
        equipment: 'maquina'
      },
      stiff_romeno: {
        id: 'stiff_romeno',
        name: 'Stiff Romeno',
        description: 'Levantamento terra romeno para posteriores.',
        muscleGroup: 'posterior',
        difficulty: 'intermediario',
        equipment: 'barra'
      },
      elevacao_pe: {
        id: 'elevacao_pe',
        name: 'Elevação na Ponta dos Pés',
        description: 'Exercício básico para panturrilhas.',
        muscleGroup: 'panturrilha',
        difficulty: 'iniciante',
        equipment: 'peso_corporal'
      },
      panturrilha_sentado: {
        id: 'panturrilha_sentado',
        name: 'Panturrilha Sentado',
        description: 'Exercício específico para sóleo.',
        muscleGroup: 'panturrilha',
        difficulty: 'iniciante',
        equipment: 'maquina'
      },

      // ABDÔMEN
      abdominal_tradicional: {
        id: 'abdominal_tradicional',
        name: 'Abdominal Tradicional',
        description: 'Exercício clássico para reto abdominal.',
        muscleGroup: 'abdomen',
        difficulty: 'iniciante',
        equipment: 'peso_corporal'
      },
      prancha: {
        id: 'prancha',
        name: 'Prancha',
        description: 'Exercício isométrico para core completo.',
        muscleGroup: 'abdomen',
        difficulty: 'iniciante',
        equipment: 'peso_corporal'
      },
      abdominal_bike: {
        id: 'abdominal_bike',
        name: 'Abdominal Bicicleta',
        description: 'Exercício dinâmico para oblíquos.',
        muscleGroup: 'abdomen',
        difficulty: 'intermediario',
        equipment: 'peso_corporal'
      },
      elevacao_pernas: {
        id: 'elevacao_pernas',
        name: 'Elevação de Pernas',
        description: 'Exercício para abdômen inferior.',
        muscleGroup: 'abdomen',
        difficulty: 'intermediario',
        equipment: 'peso_corporal'
      },

      // TRAPÉZIO
      encolhimento: {
        id: 'encolhimento',
        name: 'Encolhimento de Ombros',
        description: 'Exercício específico para trapézio superior.',
        muscleGroup: 'trapezio',
        difficulty: 'iniciante',
        equipment: 'halteres'
      },
      remada_alta: {
        id: 'remada_alta',
        name: 'Remada Alta',
        description: 'Exercício composto para trapézio e deltoides.',
        muscleGroup: 'trapezio',
        difficulty: 'intermediario',
        equipment: 'barra'
      },

      // ANTEBRAÇO
      rosca_punho: {
        id: 'rosca_punho',
        name: 'Rosca de Punho',
        description: 'Exercício específico para flexores do antebraço.',
        muscleGroup: 'antebraco',
        difficulty: 'iniciante',
        equipment: 'halteres'
      },
      farmer_walk: {
        id: 'farmer_walk',
        name: 'Farmer Walk',
        description: 'Caminhada com peso para força de pegada.',
        muscleGroup: 'antebraco',
        difficulty: 'intermediario',
        equipment: 'halteres'
      }
    }
  }

  /**
   * Inicializa o sistema
   */
  init() {
    this.updatePageTitle()
    this.renderFilteredExercises()
    this.setupEventListeners()
    this.restoreSelectedExercises()
  }

  /**
   * Atualiza título da página baseado no grupo selecionado
   */
  updatePageTitle() {
    const titleElement = document.querySelector('.page-title')
    if (this.currentMuscleGroup && titleElement) {
      titleElement.textContent = `Exercícios - ${this.currentMuscleGroup.groupName}`
    }
  }

  /**
   * Renderiza exercícios filtrados pelo grupo muscular
   */
  renderFilteredExercises() {
    const container = document.querySelector('.exercises-list')
    if (!container) {
      console.error('Container de exercícios não encontrado')
      return
    }

    // Limpa container
    container.innerHTML = ''

    // Obtém exercícios do grupo atual
    const exercises = this.getFilteredExercises()

    if (exercises.length === 0) {
      this.renderEmptyState(container)
      return
    }

    // Renderiza cada exercício
    exercises.forEach((exercise, index) => {
      const exerciseCard = this.createExerciseCard(exercise, index)
      container.appendChild(exerciseCard)
    })

    // Adiciona animações
    this.animateCardsEntry()
  }

  /**
   * Obtém exercícios filtrados pelo grupo atual
   */
  getFilteredExercises() {
    if (!this.currentMuscleGroup) {
      // Se não há grupo selecionado, mostra alguns exercícios padrão
      return Object.values(this.exerciseDatabase).slice(0, 6)
    }

    // Filtra exercícios pelo grupo selecionado
    const groupExercises = this.currentMuscleGroup.exercises || []
    
    return groupExercises
      .map(exerciseId => this.exerciseDatabase[exerciseId])
      .filter(exercise => exercise) // Remove undefined
  }

  /**
   * Cria card de exercício
   */
  createExerciseCard(exercise, index) {
    const isSelected = this.selectedExercises.includes(exercise.id)
    
    const card = document.createElement('div')
    card.className = 'exercise-card'
    card.dataset.exerciseId = exercise.id
    
    if (isSelected) {
      card.classList.add('selected')
    }

    const difficultyColors = {
      iniciante: '#10b981',
      intermediario: '#f59e0b', 
      avancado: '#ef4444'
    }

    card.innerHTML = `
      <div class="exercise-content">
        <h3 class="exercise-name">${exercise.name}</h3>
        <p class="exercise-description">${exercise.description}</p>
        <div class="exercise-tags">
          <span class="tag tag-difficulty" style="background-color: ${difficultyColors[exercise.difficulty]}">
            ${exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
          </span>
          <span class="tag tag-muscle">${this.currentMuscleGroup?.groupName || exercise.muscleGroup}</span>
          <span class="tag tag-equipment">${this.formatEquipment(exercise.equipment)}</span>
        </div>
      </div>
      <div class="exercise-indicator ${isSelected ? 'filled' : 'empty'}">
        ${isSelected ? `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        ` : ''}
      </div>
    `

    return card
  }

  /**
   * Formata nome do equipamento
   */
  formatEquipment(equipment) {
    const equipmentNames = {
      peso_corporal: 'Peso Corporal',
      halteres: 'Halteres',
      barra: 'Barra',
      cabo: 'Cabo/Polia',
      maquina: 'Máquina',
      elastico: 'Elástico'
    }

    return equipmentNames[equipment] || equipment
  }

  /**
   * Renderiza estado vazio
   */
  renderEmptyState(container) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">💪</div>
        <h3>Nenhum exercício encontrado</h3>
        <p>Selecione um grupo muscular para ver exercícios específicos.</p>
        <button onclick="window.history.back()" class="btn-secondary">
          Voltar à Seleção
        </button>
      </div>
    `
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Delega eventos para cards dinâmicos
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.exercise-card')
      if (card) {
        this.handleExerciseToggle(card)
      }
    })

    // Botão de adicionar exercícios
    const addBtn = document.getElementById('addExercisesBtn')
    if (addBtn) {
      addBtn.addEventListener('click', () => this.openDaySelectionModal())
    }

    // Modal events
    this.setupModalEvents()
  }

  /**
   * Configura eventos do modal
   */
  setupModalEvents() {
    const modal = document.getElementById('daySelectionModal')
    const closeBtn = document.getElementById('closeModal')
    const cancelBtn = document.getElementById('cancelModal')
    const confirmBtn = document.getElementById('confirmAddExercises')

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDaySelectionModal())
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.closeDaySelectionModal())
    }

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => this.confirmAddExercises())
    }

    // Fechar modal clicando fora
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeDaySelectionModal()
        }
      })
    }
  }

  /**
   * Abre modal de seleção de dias
   */
  openDaySelectionModal() {
    if (this.selectedExercises.length === 0) {
      this.showToast('Selecione pelo menos um exercício primeiro', 'warning')
      return
    }

    const modal = document.getElementById('daySelectionModal')
    const exercisesList = document.getElementById('selectedExercisesList')

    // Mostra exercícios selecionados
    this.displaySelectedExercisesInModal(exercisesList)

    // Mostra modal
    modal.style.display = 'flex'
    document.body.style.overflow = 'hidden'
  }

  /**
   * Fecha modal de seleção de dias
   */
  closeDaySelectionModal() {
    const modal = document.getElementById('daySelectionModal')
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'

    // Limpa seleções de dias
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach(cb => cb.checked = false)
  }

  /**
   * Mostra exercícios selecionados no modal
   */
  displaySelectedExercisesInModal(container) {
    container.innerHTML = ''

    if (this.selectedExercises.length === 0) {
      container.innerHTML = '<p class="no-exercises">Nenhum exercício selecionado</p>'
      return
    }

    const selectedExerciseData = this.selectedExercises.map(id => this.exerciseDatabase[id]).filter(ex => ex)
    
    selectedExerciseData.forEach(exercise => {
      const exerciseItem = document.createElement('div')
      exerciseItem.className = 'selected-exercise-item'
      exerciseItem.innerHTML = `
        <span class="exercise-name">${exercise.name}</span>
        <span class="exercise-muscle">${exercise.muscleGroup}</span>
      `
      container.appendChild(exerciseItem)
    })
  }

  /**
   * Confirma adição de exercícios aos dias selecionados
   */
  confirmAddExercises() {
    const selectedDays = this.getSelectedDays()
    
    if (selectedDays.length === 0) {
      this.showToast('Selecione pelo menos um dia da semana', 'warning')
      return
    }

    // Salva exercícios nos dias selecionados
    this.saveExercisesToDays(selectedDays)
    
    // Limpa seleções de exercícios
    this.clearExerciseSelections()
    
    // Fecha modal
    this.closeDaySelectionModal()
    
    // Feedback
    const daysText = selectedDays.join(', ')
    this.showToast(`Exercícios adicionados para: ${daysText}`, 'success')
  }

  /**
   * Obtém dias selecionados no modal
   */
  getSelectedDays() {
    const checkboxes = document.querySelectorAll('#daySelectionModal input[type="checkbox"]:checked')
    return Array.from(checkboxes).map(cb => cb.value)
  }

  /**
   * Salva exercícios nos dias selecionados
   */
  saveExercisesToDays(selectedDays) {
    const workouts = JSON.parse(localStorage.getItem('gymplanner_workouts') || '{}')
    const exerciseData = this.selectedExercises.map(id => this.exerciseDatabase[id]).filter(ex => ex)
    
    selectedDays.forEach(day => {
      if (!workouts[day]) {
        workouts[day] = []
      }
      
      // Adiciona exercícios (evita duplicatas)
      exerciseData.forEach(exercise => {
        const exists = workouts[day].some(ex => ex.id === exercise.id)
        if (!exists) {
          workouts[day].push({
            ...exercise,
            addedAt: Date.now(),
            completed: false
          })
        }
      })
    })

    localStorage.setItem('gymplanner_workouts', JSON.stringify(workouts))
  }

  /**
   * Limpa seleções de exercícios
   */
  clearExerciseSelections() {
    this.selectedExercises = []
    this.saveSelectedExercises()
    
    // Remove visual selection
    const cards = document.querySelectorAll('.exercise-card')
    cards.forEach(card => {
      card.classList.remove('selected')
      const indicator = card.querySelector('.exercise-indicator')
      indicator.classList.remove('filled')
      indicator.classList.add('empty')
      indicator.innerHTML = ''
    })
  }

  /**
   * Manipula seleção/desseleção de exercício
   */
  handleExerciseToggle(card) {
    const exerciseId = card.dataset.exerciseId
    const indicator = card.querySelector('.exercise-indicator')
    const isSelected = this.selectedExercises.includes(exerciseId)

    // Animação de clique
    card.style.transform = 'scale(0.98)'
    setTimeout(() => {
      card.style.transform = ''
    }, 150)

    if (isSelected) {
      // Remove seleção
      this.removeExerciseSelection(exerciseId, card, indicator)
    } else {
      // Adiciona seleção
      this.addExerciseSelection(exerciseId, card, indicator)
    }

    this.saveSelectedExercises()
  }

  /**
   * Adiciona exercício à seleção
   */
  addExerciseSelection(exerciseId, card, indicator) {
    this.selectedExercises.push(exerciseId)
    card.classList.add('selected')
    indicator.classList.remove('empty')
    indicator.classList.add('filled')
    indicator.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
    
    const exercise = this.exerciseDatabase[exerciseId]
    this.showToast(`${exercise.name} adicionado à seleção`, 'success')
  }

  /**
   * Remove exercício da seleção
   */
  removeExerciseSelection(exerciseId, card, indicator) {
    this.selectedExercises = this.selectedExercises.filter(id => id !== exerciseId)
    card.classList.remove('selected')
    indicator.classList.remove('filled')
    indicator.classList.add('empty')
    indicator.innerHTML = ''
    
    const exercise = this.exerciseDatabase[exerciseId]
    this.showToast(`${exercise.name} removido da seleção`, 'info')
  }

  /**
   * Restaura exercícios previamente selecionados
   */
  restoreSelectedExercises() {
    this.selectedExercises.forEach(exerciseId => {
      const card = document.querySelector(`[data-exercise-id="${exerciseId}"]`)
      if (card) {
        card.classList.add('selected')
        const indicator = card.querySelector('.exercise-indicator')
        indicator.classList.remove('empty')
        indicator.classList.add('filled')
      }
    })
  }

  /**
   * Salva exercícios selecionados
   */
  saveSelectedExercises() {
    localStorage.setItem('gymplanner_selected_exercises', JSON.stringify(this.selectedExercises))
  }

  /**
   * Animação de entrada dos cards
   */
  animateCardsEntry() {
    const cards = document.querySelectorAll('.exercise-card')
    
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

// CSS adicional para melhor experiência
const additionalStyles = `
  .exercise-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .exercise-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }

  .exercise-card.selected {
    border-left: 4px solid #10b981;
    background: linear-gradient(135deg, #f0fdf4, #ffffff);
  }

  .tag-difficulty {
    color: white;
    font-weight: 600;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #374151;
  }

  .empty-state p {
    margin-bottom: 2rem;
  }

  .btn-secondary {
    background: #f3f4f6;
    color: #374151;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-secondary:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
  }

  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease-out;
  }

  .modal-content {
    background: white;
    border-radius: 16px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    animation: slideInUp 0.3s ease-out;
  }

  .modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-header h2 {
    margin: 0;
    color: #374151;
    font-size: 1.5rem;
  }

  .close-modal {
    background: none;
    border: none;
    font-size: 2rem;
    color: #9ca3af;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
  }

  .close-modal:hover {
    background: #f3f4f6;
    color: #374151;
  }

  .modal-body {
    padding: 1.5rem;
    max-height: 60vh;
    overflow-y: auto;
  }

  .modal-body p {
    margin-bottom: 1rem;
    color: #6b7280;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .day-option {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;
  }

  .day-option:hover {
    border-color: #10b981;
    background: #f0fdf4;
  }

  .day-option input[type="checkbox"] {
    margin-right: 0.75rem;
    width: 18px;
    height: 18px;
    accent-color: #10b981;
  }

  .day-option input[type="checkbox"]:checked + .day-label {
    font-weight: 600;
    color: #10b981;
  }

  .day-option:has(input:checked) {
    border-color: #10b981;
    background: #f0fdf4;
  }

  .day-label {
    font-size: 0.95rem;
    color: #374151;
    transition: all 0.2s;
  }

  .selected-exercises-preview {
    border-top: 1px solid #e5e7eb;
    padding-top: 1.5rem;
  }

  .selected-exercises-preview h3 {
    margin-bottom: 1rem;
    color: #374151;
    font-size: 1.1rem;
  }

  .selected-exercise-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background: #f9fafb;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

  .selected-exercise-item .exercise-name {
    font-weight: 500;
    color: #374151;
  }

  .selected-exercise-item .exercise-muscle {
    font-size: 0.85rem;
    color: #6b7280;
    background: #e5e7eb;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
  }

  .no-exercises {
    text-align: center;
    color: #9ca3af;
    font-style: italic;
    padding: 2rem;
  }

  .modal-footer {
    padding: 1.5rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .btn-primary {
    background: #10b981;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background: #059669;
    transform: translateY(-1px);
  }

  .btn-primary:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .modal-content {
      width: 95%;
      margin: 1rem;
    }
    
    .days-grid {
      grid-template-columns: 1fr;
    }
    
    .modal-footer {
      flex-direction: column-reverse;
    }
    
    .modal-footer button {
      width: 100%;
    }
  }
`

// Adiciona estilos
const styleSheet = document.createElement('style')
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)

// Inicializa sistema quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new ExerciseManager()
})

// Funções utilitárias globais para debug
window.viewSelectedExercises = () => {
  const selected = JSON.parse(localStorage.getItem("gymplanner_selected_exercises") || "[]")
  console.log("Exercícios selecionados:", selected)
  return selected
}

window.clearSelectedExercises = () => {
  localStorage.removeItem("gymplanner_selected_exercises")
  location.reload()
}

window.viewCurrentMuscleGroup = () => {
  const group = JSON.parse(localStorage.getItem('gymplanner_selected_muscle_group') || 'null')
  console.log("Grupo muscular atual:", group)
  return group
}
