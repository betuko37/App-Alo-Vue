// Función para formatear fecha en formato corto
export const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  })
}

// Función para formatear fecha completa
export const formatFullDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Función para verificar si una fecha ha expirado
export const isExpired = (date: Date): boolean => {
  return new Date() > date
}

// Función para verificar si una fecha es hoy
export const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

// Función para verificar si una fecha es mañana
export const isTomorrow = (date: Date): boolean => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return date.toDateString() === tomorrow.toDateString()
}

// Función para obtener el texto relativo de una fecha
export const getRelativeDateText = (date: Date): string => {
  if (isToday(date)) return 'Hoy'
  if (isTomorrow(date)) return 'Mañana'
  if (isExpired(date)) return 'Expirada'
  return formatShortDate(date)
}
