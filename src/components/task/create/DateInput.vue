<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
  label: string
  placeholder?: string
  type?: 'date' | 'datetime-local'
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Selecciona fecha',
  type: 'date',
})

const emit = defineEmits<Emits>()

const dateValue = ref(props.modelValue)

watch(dateValue, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(
  () => props.modelValue,
  (newValue) => {
    dateValue.value = newValue
  },
)
</script>

<template>
  <div class="q-mb-md">
    <div class="text-subtitle2 text-white q-mb-sm">{{ label }}</div>
    <q-input
      v-model="dateValue"
      :type="type"
      outlined
      class="bg-white rounded-borders"
      :placeholder="placeholder"
    />
  </div>
</template>
