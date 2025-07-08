import type { User } from '@/interfaces/user'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // ===== ESTADO REACTIVO =====
  // Estos son los datos que se mantienen en el store
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)

  // ===== GETTERS (VALORES COMPUTADOS) =====
  // Estos valores se calculan automáticamente basados en el estado
  const isLoggedIn = computed(() => isAuthenticated.value && user.value !== null)
  const userRole = computed(() => user.value?.role || 'guest')
  const userName = computed(() => user.value?.name || 'Usuario')

  // ===== ACCIONES (FUNCIONES) =====

  /**
   * Función para iniciar sesión
   * @param email - Email del usuario
   * @returns Promise con el resultado del login
   */
  const login = async (email: string) => {
    try {
      loading.value = true

      // Simular llamada a API (en un proyecto real, aquí iría tu API)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock de respuesta exitosa
      const mockUser: User = {
        id: 1,
        name: 'Juan Pérez',
        email: email,
        role: 'user',
      }

      // Generar token mock (en producción sería un JWT real)
      const mockToken = 'mock-jwt-token-' + Date.now()

      // Actualizar el estado del store
      user.value = mockUser
      token.value = mockToken
      isAuthenticated.value = true

      // Guardar en localStorage para persistencia
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_data', JSON.stringify(mockUser))

      console.log('✅ Login exitoso:', mockUser.name)
      return { success: true, user: mockUser }
    } catch (error) {
      console.error('❌ Error en login:', error)
      return { success: false, error: 'Error de autenticación' }
    } finally {
      loading.value = false
    }
  }

  /**
   * Función para cerrar sesión
   * Limpia todo el estado y localStorage
   */
  const logout = () => {
    // Limpiar estado del store
    user.value = null
    token.value = null
    isAuthenticated.value = false

    // Limpiar localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')

    console.log('👋 Usuario deslogueado')
  }

  /**
   * Verificar si hay una sesión válida al cargar la app
   * Se ejecuta al inicializar la aplicación
   */
  const checkAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user_data')

    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser) as User
        user.value = userData
        token.value = savedToken
        isAuthenticated.value = true
        console.log('🔐 Token encontrado, usuario autenticado automáticamente')
      } catch (error) {
        console.error('❌ Error al cargar datos de usuario:', error)
        logout() // Limpiar datos corruptos
      }
    } else {
      console.log('🔍 No se encontró token válido')
    }
  }

  /**
   * Actualizar perfil del usuario
   * @param userData - Datos parciales del usuario a actualizar
   */
  const updateProfile = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      localStorage.setItem('user_data', JSON.stringify(user.value))
      console.log('📝 Perfil actualizado')
    }
  }

  /**
   * Verificar permisos del usuario
   * @param permission - Permiso a verificar
   * @returns true si tiene el permiso, false si no
   */
  const hasPermission = (permission: string) => {
    if (!user.value) return false

    // Lógica simple de permisos basada en roles
    const rolePermissions = {
      admin: ['read', 'write', 'delete', 'manage'],
      user: ['read', 'write'],
      guest: ['read'],
    }

    const userPermissions = rolePermissions[userRole.value as keyof typeof rolePermissions] || []
    return userPermissions.includes(permission)
  }

  // ===== RETORNAR TODO LO NECESARIO =====
  return {
    // Estado reactivo
    isAuthenticated,
    user,
    token,
    loading,

    // Getters (valores computados)
    isLoggedIn,
    userRole,
    userName,

    // Acciones (funciones)
    login,
    logout,
    checkAuth,
    updateProfile,
    hasPermission,
  }
})
