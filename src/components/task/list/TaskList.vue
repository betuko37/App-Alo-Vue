<script setup lang="ts">
import type { Task } from '@/interfaces/task'
import TaskCard from './TaskCard.vue'

interface Props {
  tasks: Task[]
}

interface Emits {
  (e: 'toggle', taskId: string): void
  (e: 'delete', taskId: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleToggle = (taskId: string) => {
  emit('toggle', taskId)
}

const handleDelete = (taskId: string) => {
  emit('delete', taskId)
}
</script>

<template>
  <div class="q-col-gutter-md">
    <div v-for="task in tasks" :key="task.id" class="q-mb-md">
      <TaskCard :task="task" @toggle="handleToggle" @delete="handleDelete" />
    </div>
  </div>
</template>
