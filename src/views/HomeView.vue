<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/useTaskStore'
import { computed } from 'vue'

const router = useRouter()
const taskStore = useTaskStore()

// Estadísticas de tareas
const taskStats = computed(() => {
  const allTasks = taskStore.getTasks()
  const activeTasks = allTasks.filter((task) => !task.completed)
  const completedTasks = allTasks.filter((task) => task.completed)

  return {
    total: allTasks.length,
    active: activeTasks.length,
    completed: completedTasks.length,
  }
})

const goToCreateTask = () => {
  router.push('/create-task')
}

const goToTasks = () => {
  router.push('/tasks')
}

const goToCompleted = () => {
  router.push('/completed')
}
</script>

<template>
  <q-page class="full-height bg-custom-primary">
    <!-- Contenedor principal con padding uniforme -->
    <div class="q-pa-lg">
      <!-- Header con saludo -->
      <div class="text-center q-mb-xl">
        <div class="q-mb-lg">
          <q-icon name="favorite" size="80px" color="pink" class="q-mb-lg" />
          <h2 class="text-h3 text-white text-weight-bold q-ma-none q-mb-sm">¡Hola mi niña! 😍</h2>
          <p class="text-h6 text-white q-ma-none">Tu gestor de tareas personal</p>
        </div>
      </div>

      <!-- Tarjetas de estadísticas -->
      <div class="q-mb-xl">
        <div class="row q-col-gutter-md justify-center">
          <div class="col-4">
            <q-card class="bg-custom-secondary text-white text-center shadow-custom">
              <q-card-section class="q-pa-md">
                <div class="text-h4 text-weight-bold">{{ taskStats.total }}</div>
                <div class="text-caption">Total</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card class="bg-info text-white text-center shadow-custom">
              <q-card-section class="q-pa-md">
                <div class="text-h4 text-weight-bold">{{ taskStats.active }}</div>
                <div class="text-caption">Activas</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card class="bg-positive text-white text-center shadow-custom">
              <q-card-section class="q-pa-md">
                <div class="text-h4 text-weight-bold">{{ taskStats.completed }}</div>
                <div class="text-caption">Completadas</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Botones de acción principales -->
      <div class="q-mb-xl">
        <div class="row q-col-gutter-md justify-center">
          <div class="col-12 col-sm-8 col-md-6">
            <q-btn
              @click="goToCreateTask"
              icon="add"
              label="Crear Nueva Tarea"
              class="full-width bg-custom-secondary text-white"
              size="lg"
              rounded
              unelevated
              no-caps
            />
          </div>
        </div>

        <div class="row q-col-gutter-md justify-center q-mt-md">
          <div class="col-6 col-sm-4 col-md-3">
            <q-btn
              @click="goToTasks"
              icon="list"
              label="Ver Tareas"
              class="full-width bg-info text-white"
              size="lg"
              rounded
              unelevated
              no-caps
            />
          </div>
          <div class="col-6 col-sm-4 col-md-3">
            <q-btn
              @click="goToCompleted"
              icon="task_alt"
              label="Completadas"
              class="full-width bg-positive text-white"
              size="lg"
              rounded
              unelevated
              no-caps
              :disable="taskStats.completed === 0"
            />
          </div>
        </div>
      </div>

      <!-- Mensaje motivacional -->
      <div class="text-center">
        <q-card class="bg-custom-secondary text-white shadow-custom">
          <q-card-section class="q-pa-xl">
            <q-icon name="star" size="50px" color="yellow" class="q-mb-lg" />
            <h5 class="text-h6 q-ma-none q-mb-md">¡Tú puedes con todo, Gordita! 💪</h5>
            <p class="text-body1 q-ma-none">Organiza tus tareas y mantén el control de tu día</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
