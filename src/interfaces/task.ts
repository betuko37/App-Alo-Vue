export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  scheduledFor: Date | null // Fecha para programar la tarea
  expiresAt: Date | null // Fecha de expiración
  createdAt: Date
}
