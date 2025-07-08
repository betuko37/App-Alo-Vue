import Swal from 'sweetalert2'

// Configuración por defecto para SweetAlert2
const defaultConfig = {
  confirmButtonColor: '#d33',
  cancelButtonColor: '#3085d6',
  reverseButtons: true,
}

// Función para confirmar eliminación de tareas
export const confirmDeleteTask = async (taskTitle: string) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Quieres eliminar la tarea "${taskTitle}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    ...defaultConfig,
  })

  if (result.isConfirmed) {
    return true
  }

  return false
}

// Función para mostrar notificación de éxito
export const showSuccess = (title: string, message: string) => {
  Swal.fire(title, message, 'success')
}

// Función para mostrar notificación de error
export const showError = (title: string, message: string) => {
  Swal.fire(title, message, 'error')
}

// Función para mostrar notificación de información
export const showInfo = (title: string, message: string) => {
  Swal.fire(title, message, 'info')
}
