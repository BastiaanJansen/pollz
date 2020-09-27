export default {
	mode: "spa",
	/*
	 ** Headers of the page
	 */
	head: {
		title: "Pollz",
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: "description",
				name: "description",
				content: process.env.npm_package_description || ""
			}
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				rel: "stylesheet",
				href: "https://use.fontawesome.com/releases/v5.8.1/css/all.css",
				integrity:
					"sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf",
				crossorigin: "anonymous"
			}
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: "#fff" },
	/*
	 ** Global CSS
	 */
	css: ["~/assets/css/style"],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{ src: "~/plugins/moment", ssr: true },
		{ src: "~/plugins/filters", ssr: true },
		{ src: "~/plugins/axios", ssr: true },
		{ src: "~/plugins/vue-cookie", ssr: false },
		{ src: "~/plugins/vuex-persisted-state", ssr: false }
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [],
	server: {
		port: 8080,
		host: "0.0.0.0"
	},
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios",
		// Doc: https://github.com/nuxt-community/dotenv-module
		"@nuxtjs/dotenv",
		"@nuxtjs/router",
		"@nuxtjs/apollo"
	],
	apollo: {
		authenticationType: "Basic",
		clientConfigs: {
			default: {
				httpEndpoint: "http://192.168.178.22:3000/graphql",
				persisting: false,
				websocketsOnly: false,
				wsEndpoint: "ws://192.168.178.22:3000/graphql"
			}
		},
		authenticationType: "Bearer",
		errorHandler: "~/plugins/apollo-error-handler.js"
	},
	axios: {
		baseUrl: "http://localhost:3000"
	},
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	},
	generate: {
		routes: ["/"]
	},
	router: {
		// middleware: ["auth"]
	}
};
