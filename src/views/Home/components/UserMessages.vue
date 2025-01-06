<template>
    <div>
        我的消息
    </div>
</template>

<script setup>
import { computed, reactive, ref, watch, nextTick, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
const state = reactive({
});
const actions = {}
const props = defineProps({
    videoId: String,
    videoUrl: String
});
const emits = defineEmits(['eventChange']);
onMounted(() => {
})
watch(
    () => { },
    () => {
    },
);
</script>

<style scoped lang='scss'></style>