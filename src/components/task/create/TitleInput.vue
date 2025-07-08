<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '¿Qué necesitas hacer?',
})

const emit = defineEmits<Emits>()

const title = ref(props.modelValue)

watch(title, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(
  () => props.modelValue,
  (newValue) => {
    title.value = newValue
  },
)
</script>

<template>
  <div class="q-mb-md">
    <q-input
      v-model="title"
      :placeholder="placeholder"
      borderless
      class="text-h5 text-weight-medium full-width"
      style="font-size: 1.5rem; min-height: 50px; color: white"
      autofocus
      dark
    />
  </div>
</template>
