<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!email.value) {
    errorMessage.value = 'Por favor ingresa tu email'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const result = await auth.login(email.value)

    if (result.success) {
      // Redirigir a home después del login exitoso
      router.push('/')
    } else {
      errorMessage.value = result.error || 'Error en el login'
    }
  } catch {
    errorMessage.value = 'Error inesperado'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="col-12 col-sm-8 col-md-6 col-lg-4">
    <q-card class="q-pa-lg shadow-custom-lg">
      <q-card-section class="text-center">
        <h2 class="text-h4 q-mb-md text-black">Iniciar Sesión</h2>
        <p class="text-grey-6">Ingresa tus credenciales para continuar</p>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleLogin">
          <q-input
            v-model="email"
            label="Email"
            type="email"
            outlined
            class="q-mb-md"
            :rules="[(val) => !!val || 'Email es requerido']"
            autofocus
          />

          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            outlined
            class="q-mb-md"
            :rules="[(val) => !!val || 'Contraseña es requerida']"
          />

          <!-- Mensaje de error -->
          <div v-if="errorMessage" class="q-mb-md">
            <q-banner class="bg-negative text-white">
              {{ errorMessage }}
            </q-banner>
          </div>

          <q-btn
            type="submit"
            label="Iniciar Sesión"
            size="lg"
            class="full-width custom-btn bg-custom-primary text-white"
            :loading="loading"
            :disable="loading"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>


