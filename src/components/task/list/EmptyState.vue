<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  buttonText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'No hay tareas',
  description: 'Crea tu primera tarea para comenzar',
  buttonText: 'Crear Tarea',
})

const emit = defineEmits<{
  (e: 'create'): void
}>()

const handleCreate = () => {
  emit('create')
}
</script>

<template>
  <div class="text-center q-pa-xl">
    <q-icon name="task_alt" size="80px" color="white" />
    <h4 class="text-h6 text-white q-mt-md q-mb-sm">{{ title }}</h4>
    <p class="text-white q-mb-lg">{{ description }}</p>
    <q-btn @click="handleCreate" :label="buttonText" color="positive" size="lg" rounded />
  </div>
</template>
