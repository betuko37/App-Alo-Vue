<script setup lang="ts">
interface Props {
  label: string
  disabled?: boolean
  loading?: boolean
  color?: string
  size?: string
  rounded?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false,
  color: 'positive',
  size: 'lg',
  rounded: true,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div class="q-pa-md">
    <q-btn
      @click="handleClick"
      :label="label"
      :color="color"
      :size="size"
      :class="{ 'full-width': true }"
      :disable="disabled"
      :loading="loading"
      :rounded="rounded"
    />
  </div>
</template>
