<script setup lang="ts">
import type { Game } from '@/types'
import Card from 'primevue/card'
import MultiSelect from 'primevue/multiselect'
import Skeleton from 'primevue/skeleton'
import Paginator from 'primevue/paginator'
import Button from 'primevue/button'

import Navbar from '@/components/Navbar.vue'

import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const games = ref<Game[]>([])

// Pagination of games
const currentPage = ref(0)

const loading = ref(true)

const route = useRoute()

const onPageChange = (event: { first: number; rows: number; page: number; pageCount: number }) => {
  loading.value = true

  setTimeout(() => {
    currentPage.value = event.page
    loading.value = false
  }, 500)
}

const selectedFilters = ref()

const filterOptions = ref([
  { name: 'Alphabetical', code: 'alphabetical' },
  { name: 'Release Date', code: 'release-date' },
  { name: 'Popularity', code: 'popularity' }
])

const paginatedGames = computed(() => {
  const start = currentPage.value * 9
  const end = start + 9
  // return filteredGames.value.slice(start, end)
  return games.value.slice(start, end)
})



const filteredGames = computed(() => {
  if (!selectedFilters.value || selectedFilters.value.length === 0) {
    return games.value;
  }
  
  // Add your filtering logic here
  return games.value.filter(game => {
    return selectedFilters.value.some(filter => {
      switch (filter.code) {
        case 'alphabetical':
          return true; // Implement alphabetical filtering logic
        case 'release-date':
          return true; // Implement release date filtering logic
        case 'popularity':
          return true; // Implement popularity filtering logic
        default:
          return true;
      }
    });
  });
});

const { result, refetch } = useQuery(
  gql`
    query getGames($category: String!) {
      gamesByCategory(category: $category) {
        id
        title
        short_description
        thumbnail
        genre
        platform
        game_url
      }
    }
  `,
  {
    category: route.params.category
  }
)

const handleClick = (url: string) => {
  window.open(url, '_blank')
}

// Watch for changes in route.params.category to refetch the data
watch(
  () => route.params.category,
  (newCategory) => {
    loading.value = true
    refetch({ category: newCategory })
  }
)



watch(result, (newValue: { gamesByCategory: Game[] }) => {
  setTimeout(() => {
    games.value = newValue.gamesByCategory
    loading.value = false
  }, 600)
})
</script>

<template>
  <main>
    <Navbar />
    <section class="section">
      <MultiSelect
        v-model="selectedFilters"
        :options="filterOptions"
        optionLabel="name"
        :maxSelectedLabels="3"
        display="chip"
        filter
        placeholder="Filter By..."
        style="margin-top: 30px; margin-bottom: -20px"
      />

      <div class="items-container">
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
          </template>
          <template #content>
            <p style="padding: 0">
              {{ game.short_description }}
            </p>
          </template>

          <template #footer>
            <div class="Card-footer">
              <Button
                severity="Primary"
                outlined
                label="Explore"
                @click="handleClick(game.game_url)"
              />
            </div>
          </template>
        </Card>
      </div>
    </section>

    <Paginator :rows="9" :totalRecords="games.length" @page="onPageChange"> </Paginator>
  </main>
</template>
