<script setup lang="ts">
  import { useRoute } from 'vue-router'

  import type { Game } from '@/types/types'

  const route = useRoute()

  const gameType = route.params.gameType

  // @ts-ignore
  useHead({
    title: `Free Games | ${gameType}`
  })

  // @ts-ignore
  const { data, pending, error, refresh, clear } = await useAsyncData<Game[]>(
    'games',
    () => $fetch(`${process.env.VUE_APP_FREE_TO_PLAY_BASE}/games?category=${gameType}`))
</script>

<template>
  <div class="container">
    <div v-if="pending">Loading...</div>
    <div v-else-if="error" class=" container flex flex-col flex-center">
      <h3>Error: {{ error.message }}</h3>
      <div>
        <NuxtLink to="/">Return to home page</NuxtLink>
      </div>
    </div>

    <main v-else class="container">
      <!-- <h4 style="{text-align: 'center'}">Showing {{ data.length }} results</h4> -->
      <div class="gameGrid">
        <GameCard v-for="game in data" :key="game.id" :game = "game"  />
      </div>
      <!-- <ul>
        <li v-for="game in data" :key="game.id">{{ game.title }}</li>
      </ul> -->
      <button @click="refresh">Refresh</button>
    </main>
  </div>
</template>