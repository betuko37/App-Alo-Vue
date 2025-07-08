<script setup lang="ts">
import type { Task } from '@/interfaces/task'
import { formatShortDate } from '@/utils/dateUtils'

interface Props {
  task: Task
}

interface Emits {
  (e: 'restore', taskId: string): void
  (e: 'delete', taskId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleRestore = () => {
  emit('restore', props.task.id)
}

const handleDelete = () => {
  emit('delete', props.task.id)
}
</script>

<template>
  <q-card class="shadow-custom bg-grey-1">
    <q-card-section class="q-pa-md">
      <!-- Header de la tarea completada -->
      <div class="row items-center justify-between q-mb-sm">
        <h6 class="q-ma-none text-weight-medium text-grey-7 text-strike">
          {{ task.title }}
        </h6>
        <q-chip color="positive" text-color="white" size="sm" icon="check_circle">
          Completada
        </q-chip>
      </div>

      <!-- Descripción -->
      <p v-if="task.description" class="text-grey-6 q-mb-sm text-strike">
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
            Expiraba: {{ formatShortDate(new Date(task.expiresAt)) }}
          </div>
          <div class="q-mt-xs">
            <q-icon name="check_circle" size="xs" />
            Completada el {{ formatShortDate(new Date(task.createdAt)) }}
          </div>
        </div>
        <div class="row q-gutter-xs">
          <q-btn
            @click="handleRestore"
            icon="undo"
            color="info"
            flat
            round
            size="sm"
            title="Restaurar tarea"
          />
          <q-btn
            @click="handleDelete"
            icon="delete"
            color="negative"
            flat
            round
            size="sm"
            title="Eliminar permanentemente"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
