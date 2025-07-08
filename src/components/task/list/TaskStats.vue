<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '@/interfaces/task'

interface Props {
  tasks: Task[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'viewCompleted'): void
}>()

const stats = computed(() => {
  const total = props.tasks.length
  const completed = props.tasks.filter((task) => task.completed).length
  const active = total - completed

  return {
    total,
    completed,
    active,
  }
})

const handleViewCompleted = () => {
  emit('viewCompleted')
}
</script>

<template>
  <div class="q-mb-lg">
    <q-card class="bg-custom-secondary text-white">
      <q-card-section class="q-pa-md">
        <div class="row items-center justify-between">
          <div class="text-center">
            <div class="text-h6">{{ stats.active }}</div>
            <div class="text-caption">Activas</div>
          </div>
          <div class="text-center">
            <div class="text-h6">{{ stats.completed }}</div>
            <div class="text-caption">Completadas</div>
          </div>
          <div class="text-center">
            <div class="text-h6">{{ stats.total }}</div>
            <div class="text-caption">Total</div>
          </div>
          <q-btn
            v-if="stats.completed > 0"
            @click="handleViewCompleted"
            icon="task_alt"
            color="info"
            flat
            round
            size="sm"
            title="Ver tareas completadas"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
