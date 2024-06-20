<script setup lang="ts">
    import { ref } from 'vue'

    // @ts-ignore
    const props = defineProps<{
    text: string,
    classes?: string
    }>()

    const styles = ref(props.classes)
</script>

<template>
    <p v-if="classes" :class="styles">{{ text }}</p>
    <p v-else :style ="{ color: 'red' }">{{ text }}</p>
</template>
