<script setup lang="ts">
import type { Game } from '@/types'
import Card from 'primevue/card'
import Menubar from 'primevue/menubar'
import Skeleton from 'primevue/skeleton'
import Paginator from 'primevue/paginator'

import Navbar from '@/components/Navbar.vue'

import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const games = ref<Game[]>([])

// Pagination of games
const currentPage = ref(0)

const tester = ref(true)

const router = useRouter()
const route = useRoute()

const onPageChange = (event: { first: number; rows: number; page: number; pageCount: number }) => {
  currentPage.value = event.page
}

const paginatedGames = computed(() => {
  const start = currentPage.value * 9
  const end = start + 9
  return games.value.slice(start, end)
})

console.log(route.params.category)
const { result, loading } = useQuery(gql`
  query getGames {
    gamesByCategory(category: "${route.params.category}") {
      id
      title
      short_description
      thumbnail
      genre
      platform
    }
  }
`)

watch(result, (newValue: { gamesByCategory: Game[] }) => {
  console.log(newValue)
  games.value = newValue.gamesByCategory
})
</script>

<template>
  <main>
    <Navbar />
    <div class="items-container">
      <!-- Loading State -->
      <Card v-if="loading" v-for="index in 9" :key="index" class="Card" style="width: 25rem">
        <template #header>
          <Skeleton width="22rem" height="8rem"></Skeleton>
        </template>
        <template #title>
          <Skeleton
            width="22rem"
            height="2.5rem"
            style="margin-bottom: 10px; margin: auto"
          ></Skeleton>
        </template>
        <template #content>
          <Skeleton width="22rem" height="5rem" style="margin-top: 15px"></Skeleton>
        </template>
      </Card>
      <Card v-else class="Card" v-for="game in paginatedGames" :key="game.id" style="width: 25rem">
        <template #header>
          <img :src="game.thumbnail" />
        </template>
        <template #title>{{ game.title }}</template>
        <template #content>
          <p style="padding: 0">
            {{ game.short_description }}
          </p>
        </template>
      </Card>
    </div>

    <Paginator :rows="9" :totalRecords="games.length" @page="onPageChange"> </Paginator>
  </main>
</template>
