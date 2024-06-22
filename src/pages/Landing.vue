<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Navbar from '@/components/Navbar.vue'

const router = useRouter()

const goToGames = (category: string) => {
  router.push(`/games/${category}`)
}

const goToPlatform = (platform: string) => {
  router.push(`/games/platform/${platform}`)
}
</script>

<template>
  <main style="border: 1px solid black">
    <Navbar />
    <section class="section" style="height: 100vh">
      <h1 class="text-title primary-title">Free Games Demo</h1>
      <p class="text-base primary-base" style="width: 80%; margin: 16px 0px">
        A web application focused on providing you with Free games to play, for whenever you get
        bored
      </p>
      <p style="margin-bottom: 10px" class="primary-base text-sm">Powered by the FreetoGame API</p>
      <div>
        <Button
          severity="Secondary"
          text
          size="large"
          style="margin: 0px 6px"
          @click="goToGames('shooter')"
          label="Go to Games"
        />
        <Button
          severity="Contrast"
          size="large"
          style="margin: 0px 6px"
          @click="goToPlatform('PC')"
          label="Browse PC Games"
        />
      </div>
    </section>
  </main>
</template>
