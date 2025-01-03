<template>
	<div class="container">
		<div class="right-box">
			<UserProfile />
			<RandomPosts />
		</div>
	</div>
</template>

<script setup>
import UserProfile from "./components/UserProfile.vue";
import RandomPosts from "./components/RandomPosts.vue";


</script>

<style scoped lang="scss">
.container {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
