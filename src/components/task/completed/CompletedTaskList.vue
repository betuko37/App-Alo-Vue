<script setup lang="ts">
import type { Task } from '@/interfaces/task'
import CompletedTaskCard from './CompletedTaskCard.vue'

interface Props {
  tasks: Task[]
}

interface Emits {
  (e: 'restore', taskId: string): void
  (e: 'delete', taskId: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleRestore = (taskId: string) => {
  emit('restore', taskId)
}

const handleDelete = (taskId: string) => {
  emit('delete', taskId)
}
</script>

<template>
  <div class="q-col-gutter-md">
    <div v-for="task in tasks" :key="task.id" class="q-mb-md">
      <CompletedTaskCard :task="task" @restore="handleRestore" @delete="handleDelete" />
    </div>
  </div>
</template>
