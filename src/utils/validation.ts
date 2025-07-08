// Función para validar si un string no está vacío
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0
}

// Función para validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Función para validar fecha
export const isValidDate = (date: string): boolean => {
  const dateObj = new Date(date)
  return !isNaN(dateObj.getTime())
}

// Función para validar que una fecha no sea anterior a hoy
export const isDateNotPast = (date: string): boolean => {
  const dateObj = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dateObj >= today
}

// Función para validar que la fecha de expiración sea posterior a la fecha programada
export const isExpirationAfterScheduled = (
  scheduledDate: string,
  expirationDate: string,
): boolean => {
  if (!scheduledDate || !expirationDate) return true
  const scheduled = new Date(scheduledDate)
  const expiration = new Date(expirationDate)
  return expiration > scheduled
}
