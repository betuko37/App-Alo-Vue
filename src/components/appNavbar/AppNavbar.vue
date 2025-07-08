<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const logout = () => {
  authStore.logout()
  router.push('/login')
}

</script>

<template>
  <q-header v-if="user">
    <q-toolbar>
      <q-toolbar-title class="text-body2">App de Alondrita</q-toolbar-title>
      <q-btn size="sm" @click="logout" v-if="user" flat dense icon="logout" label="Cerrar sesión" />
    </q-toolbar>
  </q-header>
</template>