<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  label?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Agrega detalles sobre tu tarea...',
  label: 'Descripción',
})

const emit = defineEmits<Emits>()

const description = ref(props.modelValue)

watch(description, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(
  () => props.modelValue,
  (newValue) => {
    description.value = newValue
  },
)
</script>

<template>
  <div class="q-mb-md">
    <div class="text-subtitle2 text-white q-mb-sm">{{ label }}</div>
    <q-input
      v-model="description"
      :placeholder="placeholder"
      type="textarea"
      borderless
      autogrow
      rows="4"
      class="bg-white rounded-borders q-pa-md full-width"
      style="min-height: 100px"
    />
  </div>
</template>
