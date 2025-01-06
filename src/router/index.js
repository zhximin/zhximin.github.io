import { createRouter, createWebHashHistory } from "vue-router";

import Cookie from "js-cookie";
import { message } from "ant-design-vue";
import axios from "axios";
import Login from "@/views/Login/index.vue";
import Clock from "@/views/Clock/index.vue";
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
		path: "/login",
		name: "Login",
		component: Login,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
});

// const versionCheck = async () => {
//   const response = await axios.get('version.json')
//   if (!response || !response.data) return;
//   console.info(__APP_VERSION__, response.data, 'version compare')
//   if (__APP_VERSION__ !== response.data.version) {
//     message.info('Page updated. Will reload the latest page in 3 seconds...')
//     setTimeout(() => {
//       window.location.reload()
//     }, 3000);
//   }
// }

// router.beforeEach(async (to, from, next) => {
//   await versionCheck();
//   const whiteList = ['/login'];
//   if (!whiteList.includes(to.path)) {
//     if (!Cookie.get('token')) {
//       next({
//         path: '/login'
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
