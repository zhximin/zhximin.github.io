import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

function resolve(dir) {
	return path.join(__dirname, dir);
}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	// base: "/",
	hmr: true, //热更新
	server: {
		host: "0.0.0.0", // 默认是 localhost 如果允许外部访问，可设置为"0.0.0.0"
		port: 5001,
		// https: true,
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				modifyVars: {
					"@primary-color": "red", // 主题色
					"@tabs-card-head-background": "#f0f0f0", // 卡片风格标签页背景色
					"@tabs-hover-color": "#40a9ff", // 标签页 hover 颜色
					"@tabs-active-color": "#1890ff", // 活跃标签颜色
					// "primary-color": "#1DA57A", // 主题色
					// "link-color": "#1DA57A", // 链接色
					// "border-radius-base": "4px", // 组件/按钮圆角
					// "tabs-hover-color": "red", // Tabs hover 色
					// "tabs-active-color": "red", // Tabs 活跃状态色
					// "tabs-card-head-background": "red", // Tabs 卡片背景
				},
			},
		},
	},
	// vite解决警告: vue-i18n.esm-bundler.js:39 You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
	resolve: {
		alias: {
			"@": resolve("./src"),
			public: resolve("./public"),
			"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
		},
	},
});
