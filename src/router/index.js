import { createRouter, createWebHashHistory } from "vue-router";

import Login from "@/views/Login/index.vue";
import Clock from "@/views/Clock/index.vue";
import PhotoWall from "@/views/PhotoWall/index.vue";
import Home from "@/views/Home/index.vue";
import Layout from "@/layout/index.vue";

export const constantRoutes = [
	{
		path: "/",
		redirect: "/home",
		component: Layout,
		children: [
			{
				path: "home",
				name: "Home",
				component: Layout,
				components: {
					center: () => import("@/views/Home/index.vue"),
				},
			},
		],
	},
	{
		path: "/clock",
		name: "Clock",
		component: Clock,
	},
	{
		path: "/photoWall",
		name: "PhotoWall",
		component: PhotoWall,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
	const token = localStorage.getItem("token");

	// 如果未登录且目标路由不是登录页，跳转到登录页
	if (token !== "3208" && to.path !== "/login") {
		next({ path: "/login" });
	}
	// 如果已登录且目标是登录页，跳转到主页
	else if (token === "3208" && to.path === "/login") {
		next({ path: "/home" });
	}
	// 其他情况放行
	else {
		next();
	}
});

export default router;
