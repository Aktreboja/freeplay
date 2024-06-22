<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/'
  }
])
</script>

<template>
  <Menubar :model="items">
    <template #item="{ route, icon, label }">
      <RouterLink :to="route">
        <span :class="icon" />
        <span>{{ label }}</span>
      </RouterLink>
    </template>
  </Menubar>
</template>
