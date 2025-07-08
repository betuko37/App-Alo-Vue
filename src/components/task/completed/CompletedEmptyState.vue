<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  buttonText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'No hay tareas completadas',
  description: 'Las tareas que completes aparecerán aquí',
  buttonText: 'Ver Tareas Activas',
})

const emit = defineEmits<{
  (e: 'goToActive'): void
}>()

const handleGoToActive = () => {
  emit('goToActive')
}
</script>

<template>
  <div class="text-center q-pa-xl">
    <q-icon name="task_alt" size="80px" color="white" />
    <h4 class="text-h6 text-white q-mt-md q-mb-sm">{{ title }}</h4>
    <p class="text-white q-mb-lg">{{ description }}</p>
    <q-btn @click="handleGoToActive" :label="buttonText" color="info" size="lg" rounded />
  </div>
</template>
