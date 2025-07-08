<script setup lang="ts">
import type { Task } from '@/interfaces/task'
import { formatShortDate } from '@/utils/dateUtils'

interface Props {
  task: Task
}

interface Emits {
  (e: 'toggle', taskId: string): void
  (e: 'delete', taskId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleToggle = () => {
  emit('toggle', props.task.id)
}

const handleDelete = () => {
  emit('delete', props.task.id)
}
</script>

<template>
  <q-card class="shadow-custom">
    <q-card-section class="q-pa-md">
      <!-- Header de la tarea -->
      <div class="row items-center justify-between q-mb-sm">
        <h6
          class="q-ma-none text-weight-medium text-black"
          :class="{ 'text-strike text-grey-5': task.completed }"
        >
          {{ task.title }}
        </h6>
        <q-checkbox
          :model-value="task.completed"
          @update:model-value="handleToggle"
          color="positive"
          size="md"
        />
      </div>

      <!-- Descripción -->
      <p
        v-if="task.description"
        class="text-grey-6 q-mb-sm"
        :class="{ 'text-strike': task.completed }"
      >
        {{ task.description }}
      </p>

      <!-- Información de fechas -->
      <div class="row items-center justify-between q-mt-md">
        <div class="text-caption text-grey-6">
          <div v-if="task.scheduledFor">
            <q-icon name="schedule" size="xs" />
            {{ formatShortDate(new Date(task.scheduledFor)) }}
          </div>
          <div v-if="task.expiresAt" class="q-mt-xs">
            <q-icon name="timer_off" size="xs" />
            Expira: {{ formatShortDate(new Date(task.expiresAt)) }}
          </div>
        </div>
        <q-btn @click="handleDelete" icon="delete" color="negative" flat round size="sm" />
      </div>

      <!-- Estado completado -->
      <div v-if="task.completed" class="q-mt-sm">
        <q-chip color="positive" text-color="white" size="sm" icon="check_circle">
          Completada
        </q-chip>
      </div>
    </q-card-section>
  </q-card>
</template>
