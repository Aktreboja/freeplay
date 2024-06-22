import './assets/main.css'

import { createApp, provide, h } from 'vue'

import router from './router'

// Primevue Setup
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

// Apollo Client setup
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App)
})
app.use(router).use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
