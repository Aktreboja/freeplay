import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Landing from '@/pages/Landing.vue'
import Games from '@/pages/Games.vue'
import PlatformGames from '@/pages/PlatformGames.vue'

// Initializing the routes directly
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'landing', component: Landing },
  { path: '/games/:category', name: 'games', component: Games },
  { path: '/games/platform/:platform', name: 'platform', component: PlatformGames }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
