<script setup lang="ts">
    import { ref } from 'vue'

    // @ts-ignore
    const props = defineProps<{
    variant: string,
    text: string,
    classes?: string
    }>()

    const styles = ref(props.classes)
</script>

<template>

    <h1 v-if="variant == 'h1'">{{ text }}</h1>
    <h2 v-else-if="variant == 'h2'">{{ text }}</h2>
    <h3 v-else-if="variant == 'h3'">{{ text }}</h3>
    <h4 v-else-if="variant == 'h4'">{{ text }}</h4>
    <h5 v-else>{{ text }}</h5>

    <!-- <p v-if="classes" :class="styles">{{ text }}</p>
    <p v-else :style ="{ color: 'red' }">{{ text }}</p> -->
</template>
