<template>
	<a-tabs v-model:activeKey="state.activeKey" default-active-key="1" class="user-center-tabs">
		<a-tab-pane key="1" tab="个人中心">
			<UserProfile />
		</a-tab-pane>
		<a-tab-pane key="2" tab="我的消息">
			<UserMessages />
		</a-tab-pane>
		<a-tab-pane key="3" tab="我的设置">
			<UserSettings />
		</a-tab-pane>
		<a-tab-pane key="4" tab="帮助中心">
			<HelpCenter />
		</a-tab-pane>
	</a-tabs>
</template>

<script setup>
import { computed, reactive, ref, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserProfile from "./components/UserProfile.vue";
import UserMessages from "./components/UserMessages.vue";
import UserSettings from "./components/UserSettings.vue";
import HelpCenter from "./components/HelpCenter.vue";

const state = reactive({
	activeKey: '1'
})
</script>

<style lang="scss" scoped>
.user-center-tabs {
	::v-deep(.ant-tabs-nav) {
		background-color: transparent;
		padding: 15px 15px 10px 20px;
		margin-bottom: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	::v-deep(.ant-tabs-content) {
		height: 100%;
	}


}
</style>
