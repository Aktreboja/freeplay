import './assets/main.css'

import { createApp, provide, h } from 'vue'

import router from './router'

// Primevue Setup
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { RiWindowsFill, RiComputerLine } from 'oh-vue-icons/icons'

// Apollo Client setup
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

//
const httpLink = createHttpLink({
  // @ts-ignore
  uri: import.meta.env.VITE_APOLLO_CLIENT_URL || 'http://localhost:3000/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

addIcons(RiWindowsFill, RiComputerLine)

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App)
})

app.component('v-icon', OhVueIcon)

app.use(router).use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
})

app.mount('#app')
