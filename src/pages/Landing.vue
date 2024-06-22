<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
const router = useRouter()

const goToGames = (category: string) => {
  router.push(`/games/${category}`)
}

const goToPlatform = (platform: string) => {
  router.push(`/games/platform/${platform}`)
}
</script>

<template>
  <head>
    <title></title>
  </head>
  <main>
    <h1>Free Games Demo</h1>
    <p class="text-base">
      A web application focused on providing you with Free games to play, for whenever you get bored
    </p>
    <p style="margin-bottom: 10px">Powered by the FreetoGame API</p>
    <div>
      <Button
        severity="outlined"
        style="margin: 0px 6px"
        @click="goToGames('shooter')"
        label="Go to Games"
      />
      <Button
        severity="outlined"
        style="margin: 0px 6px"
        @click="goToPlatform('PC')"
        label="Browse PC Games"
      />
    </div>
  </main>
</template>
