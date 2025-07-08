<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import { ref } from 'vue'
import type { Task } from '@/interfaces/task'
import { useRouter } from 'vue-router'
import HeaderComponent from '@/components/task/HeaderComponent.vue'
import TitleInput from '@/components/task/create/TitleInput.vue'
import DescriptionInput from '@/components/task/create/DescriptionInput.vue'
import DateInput from '@/components/task/create/DateInput.vue'
import ActionButton from '@/components/task/create/ActionButton.vue'
import { showSuccess, showError } from '@/utils/sweetAlert'
import { isNotEmpty } from '@/utils/validation'

const router = useRouter()
const taskStore = useTaskStore()

const task = ref({
  id: '',
  title: '',
  description: '',
  completed: false,
  scheduledFor: '',
  expiresAt: '',
  createdAt: new Date(),
})

const addTask = () => {
  if (!isNotEmpty(task.value.title)) {
    showError('Error', 'El título es requerido')
    return
  }

  // Convertir fechas de string a Date
  const taskToAdd: Task = {
    ...task.value,
    scheduledFor: task.value.scheduledFor ? new Date(task.value.scheduledFor) : null,
    expiresAt: task.value.expiresAt ? new Date(task.value.expiresAt) : null,
  }

  taskStore.addTask(taskToAdd)
  showSuccess('¡Éxito!', 'Tarea creada correctamente')
  router.push('/tasks')
}
</script>

<template>
  <q-page class="full-height bg-custom-primary">
    <!-- Header móvil -->
    <HeaderComponent />

    <!-- Contenido principal -->
    <div class="q-pa-lg">
      <!-- Campo de título -->
      <TitleInput v-model="task.title" placeholder="¿Qué necesitas hacer?" />

      <!-- Separador -->
      <q-separator class="q-mb-md" color="white" />

      <!-- Campo de descripción -->
      <DescriptionInput
        v-model="task.description"
        placeholder="Agrega detalles sobre tu tarea..."
        label="Descripción"
      />

      <!-- Fecha programada -->
      <DateInput
        v-model="task.scheduledFor"
        label="Programar para"
        placeholder="Selecciona fecha"
      />

      <!-- Fecha de expiración -->
      <DateInput
        v-model="task.expiresAt"
        label="Expira el"
        placeholder="Selecciona fecha de expiración"
      />

      <!-- Botón de acción -->
      <ActionButton label="Crear Tarea" :disabled="!task.title.trim()" @click="addTask" />
    </div>
  </q-page>
</template>
