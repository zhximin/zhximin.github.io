import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

function resolve(dir) {
	return path.join(__dirname, dir);
}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	base: "/zhximin/",
	hmr: true, //热更新
	server: {
		host: "0.0.0.0", // 默认是 localhost 如果允许外部访问，可设置为"0.0.0.0"
		port: 5001,
		// https: true,
	},
	resolve: {
		alias: {
			"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
			"@": resolve("./src"),
			public: resolve("./public"),
		},
	},
});
