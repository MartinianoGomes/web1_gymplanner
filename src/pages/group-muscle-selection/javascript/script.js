/**
 * Sistema de Seleção de Grupos Musculares
 * Gerencia a navegação e filtros para a página de exercícios
 */

class MuscleGroupSelector {
  constructor() {
    this.muscleGroups = this.initializeMuscleGroups()
    this.init()
  }

  /**
   * Inicializa os dados dos grupos musculares
   */
  initializeMuscleGroups() {
    return {
      peito: {
        name: 'Peito',
        exercises: ['supino_reto', 'supino_inclinado', 'crucifixo', 'flexao', 'supino_declinado', 'crossover']
      },
      gluteo: {
        name: 'Glúteo',
        exercises: ['agachamento', 'hip_thrust', 'bulgaro', 'stiff', 'coice', 'abducao_quadril']
      },
      trapezio: {
        name: 'Trapézio',
        exercises: ['encolhimento', 'remada_alta', 'desenvolvimento_arnold', 'face_pull', 'upright_row']
      },
      biceps: {
        name: 'Bíceps',
        exercises: ['rosca_direta', 'rosca_martelo', 'rosca_concentrada', 'rosca_alternada', 'rosca_scott', 'rosca_cabo']
      },
      panturrilha: {
        name: 'Panturrilha',
        exercises: ['elevacao_pe', 'panturrilha_sentado', 'panturrilha_leg_press', 'caminhada_pontas']
      },
      abdomen: {
        name: 'Abdômen',
        exercises: ['abdominal_tradicional', 'prancha', 'abdominal_bike', 'elevacao_pernas', 'russian_twist', 'mountain_climber']
      },
      quadriceps: {
        name: 'Quadríceps',
        exercises: ['agachamento_livre', 'leg_press', 'extensao_quadriceps', 'hack_squat', 'afundo', 'passada']
      },
      triceps: {
        name: 'Tríceps',
        exercises: ['triceps_frances', 'triceps_testa', 'triceps_corda', 'mergulho', 'triceps_coice', 'supino_fechado']
      },
      costas: {
        name: 'Costas',
        exercises: ['puxada_frente', 'remada_curvada', 'pull_down', 'remada_cavalinho', 'pullover', 'levantamento_terra']
      },
      posterior: {
        name: 'Posterior de Coxa',
        exercises: ['mesa_flexora', 'stiff_romeno', 'good_morning', 'nordic_curl', 'cadeira_flexora']
      },
      ombro: {
        name: 'Ombro',
        exercises: ['desenvolvimento_militar', 'elevacao_lateral', 'elevacao_frontal', 'desenvolvimento_halteres', 'crucifixo_inverso']
      },
      antebraco: {
        name: 'Antebraço',
        exercises: ['rosca_punho', 'farmer_walk', 'extensao_punho', 'pinça', 'rotacao_punho']
      }
    }
  }

  /**
   * Inicializa os event listeners
   */
  init() {
    this.setupEventListeners()
    this.addLoadingAnimation()
  }

  /**
   * Configura os event listeners para os cards
   */
  setupEventListeners() {
    const muscleCards = document.querySelectorAll('.muscle-card')
    
    muscleCards.forEach(card => {
      this.setupCardInteraction(card)
    })
  }

  /**
   * Configura interação individual do card
   */
  setupCardInteraction(card) {
    // Efeito hover
    card.addEventListener('mouseenter', () => {
      this.addHoverEffect(card)
    })

    card.addEventListener('mouseleave', () => {
      this.removeHoverEffect(card)
    })

    // Click handler
    card.addEventListener('click', (e) => {
      e.preventDefault()
      this.handleMuscleGroupSelection(card)
    })

    // Teclado (acessibilidade)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        this.handleMuscleGroupSelection(card)
      }
    })

    // Torna o card focusável
    card.setAttribute('tabindex', '0')
    card.setAttribute('role', 'button')
  }

  /**
   * Adiciona efeito visual de hover
   */
  addHoverEffect(card) {
    card.style.transform = 'translateY(-8px) scale(1.02)'
    card.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)'
    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  /**
   * Remove efeito visual de hover
   */
  removeHoverEffect(card) {
    card.style.transform = 'translateY(0) scale(1)'
    card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
  }

  /**
   * Manipula a seleção do grupo muscular
   */
  handleMuscleGroupSelection(card) {
    const muscleGroup = card.dataset.group
    
    if (!muscleGroup || !this.muscleGroups[muscleGroup]) {
      this.showError('Grupo muscular não encontrado')
      return
    }

    // Animação de seleção
    this.animateSelection(card)

    // Salva seleção
    this.saveSelectedMuscleGroup(muscleGroup)

    // Navega para exercícios
    setTimeout(() => {
      this.navigateToExercises(muscleGroup)
    }, 600)
  }

  /**
   * Animação de seleção do card
   */
  animateSelection(card) {
    // Adiciona classe de selecionado
    card.classList.add('selected')
    
    // Animação de pulso
    card.style.animation = 'pulse 0.6s ease-in-out'
    
    // Efeito ripple
    this.createRippleEffect(card)

    // Remove outros cards gradualmente
    const allCards = document.querySelectorAll('.muscle-card')
    allCards.forEach(otherCard => {
      if (otherCard !== card) {
        setTimeout(() => {
          otherCard.style.opacity = '0.3'
          otherCard.style.transform = 'scale(0.95)'
        }, 200)
      }
    })
  }

  /**
   * Cria efeito ripple no card
   */
  createRippleEffect(card) {
    const ripple = document.createElement('div')
    ripple.className = 'ripple-effect'
    
    const rect = card.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = (rect.width / 2 - size / 2) + 'px'
    ripple.style.top = (rect.height / 2 - size / 2) + 'px'
    
    card.style.position = 'relative'
    card.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  /**
   * Salva o grupo muscular selecionado
   */
  saveSelectedMuscleGroup(muscleGroup) {
    const selectionData = {
      group: muscleGroup,
      groupName: this.muscleGroups[muscleGroup].name,
      exercises: this.muscleGroups[muscleGroup].exercises,
      timestamp: Date.now()
    }

    localStorage.setItem('gymplanner_selected_muscle_group', JSON.stringify(selectionData))
    
    // Também limpa exercícios previamente selecionados
    localStorage.removeItem('gymplanner_selected_exercises')
  }

  /**
   * Navega para a página de exercícios
   */
  navigateToExercises(muscleGroup) {
    const groupName = this.muscleGroups[muscleGroup].name
    
    // Feedback visual
    this.showSuccessMessage(`Carregando exercícios de ${groupName}...`)
    
    // Adiciona transição de saída
    document.body.style.opacity = '0.8'
    
    setTimeout(() => {
      window.location.href = '../exercises/exercises.html'
    }, 800)
  }

  /**
   * Adiciona animações de carregamento inicial
   */
  addLoadingAnimation() {
    const cards = document.querySelectorAll('.muscle-card')
    
    cards.forEach((card, index) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px)'
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, index * 100)
    })
  }

  /**
   * Mostra mensagem de sucesso
   */
  showSuccessMessage(message) {
    this.showToast(message, 'success')
  }

  /**
   * Mostra mensagem de erro
   */
  showError(message) {
    this.showToast(message, 'error')
  }

  /**
   * Sistema de notificações toast
   */
  showToast(message, type = 'success') {
    // Remove toast existente
    const existingToast = document.querySelector('.toast-message')
    if (existingToast) {
      existingToast.remove()
    }

    // Cria novo toast
    const toast = document.createElement('div')
    toast.className = 'toast-message'
    
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6',
      warning: '#f59e0b'
    }

    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type] || colors.success};
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

    // Remove após 3 segundos
    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.style.animation = 'slideOutRight 0.3s ease-in'
        setTimeout(() => toast.remove(), 300)
      }
    }, 3000)
  }
}

// CSS para animações
const styles = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

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

  .muscle-card.selected {
    border: 2px solid #10b981;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }

  .muscle-card.selected .muscle-label {
    color: white;
    font-weight: 600;
  }

  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  .muscle-card:focus {
    outline: 3px solid #10b981;
    outline-offset: 2px;
  }
`

// Adiciona estilos ao head
const styleSheet = document.createElement('style')
styleSheet.textContent = styles
document.head.appendChild(styleSheet)

// Inicializa quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new MuscleGroupSelector()
})

// Export para uso em outros scripts se necessário
window.MuscleGroupSelector = MuscleGroupSelector
