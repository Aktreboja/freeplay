<script setup lang="ts">
import InputText from 'primevue/inputtext'

import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref, watch } from 'vue'

import Chip from 'primevue/chip'

const games = ref([])

let value = ref('')

// Sample GraphQL calls
const { result } = useQuery(gql`
  query getGames {
    games {
      title
      id
    }
  }
`)

// Watch for upcoming results, almost similar to a useEffect
watch(result, (newValue) => {
  games.value = newValue.games
})
</script>

<template>
  <head>
    <meta charset="UTF-8" />
    <title>Free Games Web Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <main>
    <RouterView />
  </main>
</template>
