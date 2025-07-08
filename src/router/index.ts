import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CreateTaskView from '../views/CreateTaskView.vue'
import TasksView from '../views/TasksView.vue'
import TaskCompleteView from '../views/TaskCompleteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/create-task',
      name: 'create-task',
      component: CreateTaskView,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: { requiresAuth: true },
    },
    {
      path: '/completed',
      name: 'completed',
      component: TaskCompleteView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // Verificar si hay un token válido al cargar la aplicación
  if (!auth.isAuthenticated) {
    auth.checkAuth()
  }

  if (to.meta.requiresAuth) {
    if (!auth.isLoggedIn) {
      console.log('Acceso denegado: Usuario no autenticado')
      next('/login')
      return
    }
  }

  if (to.path === '/login' && auth.isLoggedIn) {
    console.log('Usuario ya logueado, redirigiendo a home')
    next('/')
    return
  }

  next()
})

export default router
