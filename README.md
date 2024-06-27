<!-- PROJECT LOGO -->
<br />
<h1 align="center"><i>Free Games Web application</i></h1>
<!-- ABOUT THE PROJECT -->

<span id="about-the-project"></span>
## About The Project

This project focuses on using a Vue.js frontend with a Express backend with GraphQL queries to fetch data from FreeToGame API

Current features include: 

1. Viewing Free games based on platform, genre, etc
2. GraphQL queries for data fetching
3. Responsive frontend with pagination and loading states

<h3 name = "built-with"> Built With</h3>

[![Vue][Vue.js]][Vue-url]
[![Tailwind][Tailwind]][Tailwind-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Express][Express]][Express-url]


## Getting Started

For this project, we will have the frontend and backend hosted separately. We will talk about how to setup both instances below

### Frontend Setup and Installation

To Get started with the frontend
### 1. Create a vue application
   ```sh
    cd './your_project_path.here'
    npm create vue@latest
   ```
   
   Vue will ask questions regarding your setup, make sure to say Yes on the following:
   
   1. Adding Vue Router
   2. ESLINT (For linting and checking)
   3. Prettier (to format your code as you work throughout the project)
  
    Once Vue-create has finished setting up your project, navigate to the directory of your new project and run the following:

    ```sh
        npm install 
        npm run dev
    ```


### 2. Install the following project dependencies
For this project, you will need to install the following packages

    ```sh
        npm install --save @apollo/client @vue/apollo-composable graphql-tag @primevue/themes
    ```

### Packages
   
#### GraphQL
 
1. @apollo/client
2. @vue/apollo-composable 
3. graphql-tag
    
##### Frontend Theming
    
1. @primevue/themes
    
### 3. Add in environment variables
   ```env
   // This will be the url from the backend, which we will setup later. 
    VITE_APOLLO_CLIENT_URL = "Apollo client url here"
   ```

### 4. Setting up the main.js/ts file

#### Vue-Router setup (if using)

```js
    import { createRouter, createWebHistory } from 'vue-router'
    import type { RouteRecordRaw } from 'vue-router'
    
    // component pages
    import Landing from '@/pages/Landing.vue'
    import Games from '@/pages/Games.vue'
    import PlatformGames from '@/pages/PlatformGames.vue'
    import Game from '@/pages/Game.vue'
    
    // Initializing the routes directly
    const routes: Array<RouteRecordRaw> = [
      { path: '/', name: 'landing', component: Landing },
      // { path: '/games/:category', name: 'games', component: Games },
      { path: '/games/platform/:platform', name: 'platform', component: PlatformGames },
      { path: '/game/:gameId', name: 'game', component: Game },
      { path: '/games', name: 'games', component: Games }
    ]

    const router = createRouter({
      history: createWebHistory(),
      routes
    })

    export default router
```

### App.vue Entry file

```html
<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <main>
    <!-- THIS HAS TO BE WITHIN A PAGE IN ORDER FOR VUE-ROUTER TO WORK! -->
    <RouterView />
  </main>
</template>
```

#### Base Setup (Vue) with Apollo GraphQL client

```js
    // Importing App.vue
    import App from './App.vue'
    
      // Apollo Client setup
    import { DefaultApolloClient } from '@vue/apollo-composable'
    import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
    
    const httpLink = createHttpLink({
      uri: import.meta.env.VITE_APOLLO_CLIENT_URL || 'http://localhost:3000/graphql'
    })

    const cache = new InMemoryCache()
    
    const apolloClient = new ApolloClient({
      link: httpLink,
      cache
    })
    
    const app = createApp({
        // Apollo client setup
        setup() {
            provide(DefaultApolloClient, apolloClient)
      },
      render: () => h(App)
    })
    
    app.mount('#app')
```

### Backend Setup and Installation

To get started with the backend

### 1. Create a server directory

At the root directory of the project, create the server directory:

```sh
    mkdir server
    cd server
```

### 2. Create the express app

Create a package.json file and download the dependencies needed

```sh
    npm init -y
    
    // Install dependencies
    npm install --save express dotenv graphql graphql-http ruru cors 
```

### 3. Create the index.js file

The most basic version of the app includes

```js
    const express = require('express')
    
    const app = express()

    const port = process.env.PORT || 3000
    
    app.listen(port)
```


## Roadmap

- [ ] Update UI, while adding in Dark mode functionality
- [ ] Write E2E tests in Cypress

<!-- CONTACT -->

## Contact

Aldrich Reboja - aktreboja@gmail.com

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/aktreboja
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=whi
[TypeScript-url]: https://www.typescriptlang.org/
[Tailwind]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[Express]: https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
