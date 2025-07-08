import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options.ts'

import App from './App.vue'
import router from './router'
import { useTaskStore } from './stores/useTaskStore'

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(createPinia())
app.use(router)

// Inicializar tareas desde localStorage
const taskStore = useTaskStore()
taskStore.initializeTasks()

app.mount('#app')
