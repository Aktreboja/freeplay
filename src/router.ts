import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Landing from '@/pages/Landing.vue'
import Games from '@/pages/Games.vue'
import PlatformGames from '@/pages/PlatformGames.vue'
import Game from '@/pages/Game.vue'

// Initializing the routes directly
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'landing', component: Landing },
  // { path: '/games/:category', name: 'games', component: Games },
  { path: '/games/platform/:platform', name: 'platform', component: PlatformGames },
  { path: '/game/:gameId', name: 'game', component: Game },
  { path: '/games', name: 'games', component: Games }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
