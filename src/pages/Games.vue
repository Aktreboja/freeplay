<script setup lang="ts">
import type { Game } from '@/types'
import Card from 'primevue/card'
import Select from 'primevue/select'
import Skeleton from 'primevue/skeleton'
import Paginator from 'primevue/paginator'
import Button from 'primevue/button'
import Navbar from '@/components/Navbar.vue'

import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ref, watch } from 'vue'

const games = ref<Game[]>([])

// Pagination of games
const currentPage = ref(0)

const loading = ref(true)

const onPageChange = (event: { first: number; rows: number; page: number; pageCount: number }) => {
  loading.value = true

  setTimeout(() => {
    currentPage.value = event.page
    loading.value = false
  }, 500)
}

const selectedCategory = ref('All')

const selectedSort = ref('relevance')

const sortOptions = ref([
  {
    label: 'Alphabetical'
  },
  {
    label: 'Relevance'
  },
  {
    label: 'Release Date'
  }
])

const menuOptions = ref([
  'All',
  'Shooter',
  'MOBA',
  'MMORPG',
  'Anime',
  'Battle Royale',
  'Strategy',
  'Card Games',
  'Fighting',
  'Social',
  'Sports'
])

const filteredGames = computed(() => {
  if (selectedCategory.value === 'All') {
    return games.value
  }

  // Add your filtering logic here
  return games.value.filter((game) => {
    return game.genre == selectedCategory.value
  })
})

const paginatedGames = computed(() => {
  const start = currentPage.value * 9
  const end = start + 9
  // return filteredGames.value.slice(start, end)
  return filteredGames.value.slice(start, end)
})

const { result } = useQuery(gql`
  query getGames {
    games {
      id
      title
      short_description
      thumbnail
      genre
      platform
      game_url
    }
  }
`)

const handleClick = (url: string) => {
  window.open(url, '_blank')
}

// Watch for changes in route.params.category to refetch the data
watch(filteredGames, (query) => {
  loading.value = true
  setTimeout(() => (loading.value = false), 500)
})

watch(result, (newValue: { games: Game[] }) => {
  setTimeout(() => {
    games.value = newValue.games
    loading.value = false
    console.log(newValue.games)
  }, 600)
})

document.title = 'Free Games Demo | All Games'
</script>

<template>
  <section class="container">
    <Navbar />
    <section class="section">
      <div class="menu-container">
        <div>
          <div>
            <p>View By:</p>
            <Select
              v-model="selectedCategory"
              :options="menuOptions"
              placeholder="Select a category"
              style="margin-left: 10px; width: 200px"
            >
            </Select>
          </div>

          <div>
            <p>Sort By:</p>
            <Select
              v-model="selectedSort"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Select a sort"
              style="margin-left: 10px; width: 200px"
            >
            </Select>
          </div>
        </div>
      </div>

      <main class="items-container">
        <!-- Loading State -->
        <Card v-if="loading" v-for="index in 9" :key="index" class="Card" style="width: 21rem">
          <template #header>
            <Skeleton width="18rem" height="10rem"></Skeleton>
          </template>
          <template #title>
            <Skeleton
              width="18rem"
              height="2.5rem"
              style="margin-bottom: 10px; margin: auto"
            ></Skeleton>
          </template>
          <template #content>
            <Skeleton width="18rem" height="5rem" style="margin-top: 15px"></Skeleton>
          </template>
        </Card>
        <Card
          v-else
          class="Card"
          v-for="game in paginatedGames"
          :key="game.id"
          style="width: 21rem"
        >
          <template #header>
            <img :src="game.thumbnail" style="width: 100%; padding: 5px 10px" />
          </template>
          <template #title>
            <h4 style="font-weight: 500">{{ game.title }}</h4>
            <section>
              <p class="Card-genre" v-if="selectedCategory === 'All'">
                {{ game.genre }}
              </p>
            </section>
          </template>
          <template #content>
            <p style="padding: 0">
              {{ game.short_description }}
            </p>
          </template>

          <template #footer>
            <section class="Card-footer">
              <div>
                <v-icon
                  v-if="game.platform == 'PC (Windows)'"
                  name="ri-windows-fill"
                  fill="white"
                  scale="1.5"
                  title="PC (Windows)"
                />
                <v-icon
                  v-else
                  name="ri-computer-line"
                  fill="white"
                  scale="1.5"
                  title="Web Browser"
                />

                <Button
                  severity="Primary"
                  outlined
                  label="Explore"
                  style="width: 100% !important"
                  @click="handleClick(game.game_url)"
                />
              </div>
            </section>
          </template>
        </Card>
      </main>
      <p style="margin-bottom: 15px">{{ filteredGames.length }} Total results</p>
      <Paginator :rows="9" :totalRecords="games.length" @page="onPageChange" style="width: 100%">
      </Paginator>
    </section>
  </section>
</template>
