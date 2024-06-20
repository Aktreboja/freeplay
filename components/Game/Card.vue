<script setup lang="ts">
    import type { Game } from '@/types/types';
    import { nextTick, onMounted, ref } from 'vue';

    const props = defineProps<{
        game: Game
    }>()


    const container = ref<HTMLElement | null>()
    const firstChild = ref<HTMLElement | null>()

    const g = ref<Game>()

    g.value = props.game


    const setContainerWidth = () => {
        if (container.value && firstChild.value) {
            const firstChildWidth = firstChild.value.offsetWidth
            container.value.style.width = `${firstChildWidth}px`
        }
    }

    onMounted(async () => {
        await nextTick()
        setContainerWidth()
    })

</script>

<template>
    <div v-if="g !== undefined" class="gameCard" ref="container">
        <img :src="g.thumbnail" ref="firstChild"/>
        <h3>{{ g.title }}</h3>
        <p>{{ g.short_description }}</p>
        <p>{{ g.platform }}</p>
        <button>Explore</button>
    </div>

</template>