<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import HeaderComponent from '@/components/task/HeaderComponent.vue'
import TaskList from '@/components/task/list/TaskList.vue'
import EmptyState from '@/components/task/list/EmptyState.vue'
import TaskStats from '@/components/task/list/TaskStats.vue'
import { confirmDeleteTask } from '@/utils/sweetAlert'

const router = useRouter()
const taskStore = useTaskStore()

const tasks = computed(() => taskStore.getTasks().filter((task) => !task.completed))

const goToCreateTask = () => {
  router.push('/create-task')
}

const toggleTask = (taskId: string) => {
  taskStore.toggleTask(taskId)
}

const deleteTask = async (taskId: string) => {
  const task = taskStore.getTaskById(taskId)

  if (task && (await confirmDeleteTask(task.title))) {
    taskStore.deleteTask(taskId)
  }
}

const goToCompletedTasks = () => {
  router.push('/completed')
}
</script>

<template>
  <q-page class="full-height bg-custom-primary">
    <!-- Header móvil -->
    <HeaderComponent />

    <!-- Contenido principal -->
    <div class="q-pa-lg">
      <!-- Estadísticas -->
      <TaskStats
        v-if="taskStore.getTasks().length > 0"
        :tasks="taskStore.getTasks()"
        @viewCompleted="goToCompletedTasks"
      />

      <!-- Estado vacío -->
      <EmptyState v-if="tasks.length === 0" @create="goToCreateTask" />

      <!-- Lista de tareas -->
      <TaskList v-else :tasks="tasks" @toggle="toggleTask" @delete="deleteTask" />
    </div>
  </q-page>
</template>
