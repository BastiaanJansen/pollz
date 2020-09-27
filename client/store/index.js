const cookieparser = process.server ? require("cookieparser") : undefined;

export const state = () => ({});

export const mutations = {};

export const actions = {
	async nuxtServerInit({ commit }, { req }) {
		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie);
			try {
				const auth = JSON.parse(parsed.token);
				commit("user/setUser", auth.token);
			} catch (err) {}
		}
	}
};
