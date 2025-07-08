<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

// Configuración del header según la ruta
const headerConfig = computed(() => {
  const path = route.path

  switch (path) {
    case '/create-task':
      return {
        title: 'Nueva Tarea',
        showBackButton: true,
        showActionButton: false,
        actionIcon: '',
        actionHandler: () => {},
      }
    case '/tasks':
      return {
        title: 'Mis Tareas',
        showBackButton: true,
        showActionButton: true,
        actionIcon: 'add',
        actionHandler: () => router.push('/create-task'),
      }
    case '/completed':
      return {
        title: 'Tareas Completadas',
        showBackButton: true,
        showActionButton: false,
        actionIcon: '',
        actionHandler: () => {},
      }
    default:
      return {
        title: 'App',
        showBackButton: true,
        showActionButton: false,
        actionIcon: '',
        actionHandler: () => {},
      }
  }
})

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="bg-custom-primary shadow-1">
    <div class="row items-center q-pa-md">
      <!-- Botón de regreso -->
      <q-btn
        v-if="headerConfig.showBackButton"
        @click="goBack"
        icon="arrow_back"
        flat
        round
        color="white"
        size="md"
      />
      <div v-else style="width: 40px"></div>

      <!-- Título centrado -->
      <div class="col text-center">
        <h6 class="q-ma-none text-weight-medium text-white">{{ headerConfig.title }}</h6>
      </div>

      <!-- Botón de acción -->
      <q-btn
        v-if="headerConfig.showActionButton"
        @click="headerConfig.actionHandler"
        :icon="headerConfig.actionIcon"
        flat
        round
        color="white"
        size="md"
      />
      <div v-else style="width: 40px"></div>
    </div>
  </div>
</template>
