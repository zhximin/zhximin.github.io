<template>
    <ul class="user-tools">
        <li class="calendar"><i class="iconfont icon-hanbao"></i>日历</li>
        <li class="clock"><i class="iconfont icon-kele"></i>时钟</li>
        <li class="ImageCollection"><i class="iconfont icon-shutiao"></i>照片墙</li>
        <li><i class="iconfont icon-nuomici"></i>投稿总评论数<em>0</em>条</li>
    </ul>
</template>

<script>
export default {
    name: "UserTools",
};
</script>

<style scoped>
.user-tools {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    list-style: none;
}

.user-tools li {
    cursor: pointer;
    font-size: 1rem;
}
</style>
