import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
	const router = new Router({
		mode: "history",
		scrollBehavior: (to, from, savedPosition) => {
			if (savedPosition) {
				return savedPosition;
			} else {
				return { x: 0, y: 0 };
			}
		},
		routes: [
			{
				path: "/",
				component: () => require("@/views").default
			},
			{
				path: "/signin",
				component: () => require("@/views/signin").default
			},
			{
				path: "/logout",
				component: () => require("@/views/logout").default
			},
			{
				path: "/signup",
				component: () => require("@/views/signup").default
			},
			{
				path: "/polls/create",
				component: () => require("@/views/polls/create").default
			},
			{
				path: "/polls/me",
				component: () => require("@/views/polls/me").default
			},
			{
				path: "/polls/:id",
				component: () => require("@/views/polls").default
			}
			// {
			// 	path: "*",
			// 	component: () => require("@/views/errors/404.vue").default
			// }
		]
	});

	return router;
}
