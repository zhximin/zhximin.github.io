<template>
    <div class="random-posts">
        <h3>随机文案</h3>
        <ul class="user-new-post">
            <li v-for="(post, index) in posts" :key="index">{{ post }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "RandomPosts",
    data() {
        return {
            posts: [
                "喜欢稳定,不急不忙,也不懒散。",
                "从黎明到黄昏,阳光充足,胜过一切的诗。",
                "世人皆如满天星,而你却如皎皎白月。",
                "月色尤其温柔,人间皆是浪漫。",
            ],
        };
    },
};
</script>

<style scoped>
.random-posts {
    margin-top: 1rem;
    background: #fff;
    padding: 1rem;
    border-radius: 5px;
}

.random-posts ul {
    list-style: none;
    padding: 0;
}
</style>
