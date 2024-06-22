<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ref, watch } from 'vue'
import type { Game } from '@/types'
import gql from 'graphql-tag'
import { useRoute } from 'vue-router'
import Card from 'primevue/card'

const route = useRoute()

const platform = route.params.platform.toString()

const games = ref<Game[]>([])

const { result } = useQuery(gql`
        query getPcGames {
            gamesByPlatform(platform: "${platform.toLowerCase()}") {
                id
                title
                short_description
                thumbnail
                genre
                platform
            }
        }
    `)

watch(result, (newValue: { gamesByPlatform: Game[] }) => {
  games.value = newValue.gamesByPlatform
})
</script>

<template>
  <main>
    <h1>Platform Games</h1>
    <div class="items-container">
      <Card class="Card" v-for="game in games" :key="game.id" style="width: 25rem">
        <template #header>
          <img :src="game.thumbnail" />
        </template>
        <template #title>{{ game.title }}</template>
        <template>
            
        </template>
        <template #content>
          <p style="padding: 0">
            {{ game.short_description }}
          </p>
        </template>
      </Card>
    </div>
  </main>
</template>
