<script setup lang="ts">
import AppNavbar from '@/components/appNavbar/AppNavbar.vue'
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <AppNavbar  class="bg-custom-primary text-white"/>
    <q-page-container class="bg-custom-primary text-white">
      <router-view  />
    </q-page-container>
  </q-layout>
</template>
