<script setup>


const description = ref("This web application is focused on finding your next free to play game!")

</script>

<template>
    <main>
        <nav>
            <div>
                Gamers
            </div>
        </nav>
        <h1>Free Games web application</h1>
        <p>{{ description }}</p>
        <NuxtLink to= "/games">Games</NuxtLink>
        <!-- <TypographyHeader />
        <TypographyBody text = "TEST" classes = "text-body"/> -->
        <TypographyHeader/>
    </main>
  </template>
  