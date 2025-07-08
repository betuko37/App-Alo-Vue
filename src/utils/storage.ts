import type { Task } from '@/interfaces/task'

// Clave para almacenar las tareas en localStorage
const TASKS_STORAGE_KEY = 'tasks'

// Función para guardar tareas en localStorage
export const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Error al guardar tareas en localStorage:', error)
  }
}

// Función para cargar tareas desde localStorage
export const loadTasksFromStorage = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY)
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson)
      // Convertir las fechas de string a Date
      return tasks.map((task: Record<string, unknown>) => ({
        ...task,
        createdAt: new Date(task.createdAt as string),
        scheduledFor: task.scheduledFor ? new Date(task.scheduledFor as string) : null,
        expiresAt: task.expiresAt ? new Date(task.expiresAt as string) : null,
      })) as Task[]
    }
    return []
  } catch (error) {
    console.error('Error al cargar tareas desde localStorage:', error)
    return []
  }
}

// Función para limpiar todas las tareas del storage
export const clearTasksFromStorage = () => {
  try {
    localStorage.removeItem(TASKS_STORAGE_KEY)
  } catch (error) {
    console.error('Error al limpiar tareas del localStorage:', error)
  }
}

// Función para exportar tareas como JSON
export const exportTasks = (tasks: Task[]) => {
  try {
    const dataStr = JSON.stringify(tasks, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tareas_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error al exportar tareas:', error)
  }
}

// Función para importar tareas desde JSON
export const importTasks = (file: File): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const tasks = JSON.parse(e.target?.result as string) as Task[]
        resolve(tasks)
      } catch {
        reject(new Error('Formato de archivo inválido'))
      }
    }
    reader.onerror = () => reject(new Error('Error al leer el archivo'))
    reader.readAsText(file)
  })
}
