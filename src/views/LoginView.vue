<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import FormLogin from '@/components/login/FormLogin.vue'

const router = useRouter()
const auth = useAuthStore()

// Verificar si ya está autenticado al cargar el componente
onMounted(() => {
  if (auth.isLoggedIn) {
    console.log('Usuario ya autenticado, redirigiendo a home')
    router.push('/')
  }
})
</script>

<template>
  <q-page class="flex flex-center items-center justify-center">
    <FormLogin />
  </q-page>
</template>

<style scoped></style>
