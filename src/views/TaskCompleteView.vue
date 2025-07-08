<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import HeaderComponent from '@/components/task/HeaderComponent.vue'
import CompletedTaskList from '@/components/task/completed/CompletedTaskList.vue'
import CompletedEmptyState from '@/components/task/completed/CompletedEmptyState.vue'
import { confirmDeleteTask } from '@/utils/sweetAlert'
import { showSuccess } from '@/utils/sweetAlert'

const router = useRouter()
const taskStore = useTaskStore()

// Filtrar solo tareas completadas
const completedTasks = computed(() => taskStore.getTasks().filter((task) => task.completed))

const goToActiveTasks = () => {
  router.push('/tasks')
}

const restoreTask = (taskId: string) => {
  taskStore.toggleTask(taskId)
  showSuccess('¡Restaurada!', 'La tarea ha sido restaurada a activa')
}

const deleteTask = async (taskId: string) => {
  const task = taskStore.getTaskById(taskId)

  if (task && (await confirmDeleteTask(task.title))) {
    taskStore.deleteTask(taskId)
  }
}
</script>

<template>
  <q-page class="full-height bg-custom-primary">
    <!-- Header móvil -->
    <HeaderComponent />

    <!-- Contenido principal -->
    <div class="q-pa-lg">
      <!-- Estado vacío -->
      <CompletedEmptyState v-if="completedTasks.length === 0" @goToActive="goToActiveTasks" />

      <!-- Lista de tareas completadas -->
      <CompletedTaskList
        v-else
        :tasks="completedTasks"
        @restore="restoreTask"
        @delete="deleteTask"
      />
    </div>
  </q-page>
</template>
