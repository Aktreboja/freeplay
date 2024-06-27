<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import Menu from 'primevue/menu'

const menu = ref()

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/'
  },
  {
    label: 'All Games',
    route: '/games'
  },
  {
    label: 'Browse Free Games',
    items: [
      {
        label: 'MOBA',
        route: '/games/MOBA'
      },
      {
        label: 'Shooter',
        route: '/games/shooter'
      },
      {
        label: 'MMORPG',
        route: '/games/mmorpg'
      },
      {
        label: 'Battle Royale',
        route: '/games/battle-royale'
      },
      {
        label: 'Strategy',
        route: '/games/strategy'
      },
      {
        label: 'Fantasy',
        route: '/games/fantasy'
      },
      {
        label: 'Sci-Fi',
        route: '/games/sci-fi'
      },
      {
        label: 'Card Games',
        route: '/games/card'
      },
      {
        label: 'Racing',
        route: '/games/racing'
      },
      {
        label: 'Fighting',
        route: '/games/fighting'
      },
      {
        label: 'Social',
        route: '/games/social'
      },
      {
        label: 'Sports',
        route: '/games/sports'
      }
    ]
  }
])
</script>

<template>
  <Menubar :model="items" style="padding: 10px 1em">
    <template #item="{ item, props, hasSubmenu }">
      <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <div style="display: flex; align-items: center">
          <span :class="item.icon" />
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <p>{{ item.label }}</p>
          </a>
        </div>
      </RouterLink>
      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
        <span class="ml-2">{{ item.label }}</span>
        <span class="pi pi-angle-down" />
      </a>
    </template>
  </Menubar>
</template>
