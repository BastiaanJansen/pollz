import gql from "graphql-tag";
const jwtDecode = require("jwt-decode");
const cookie = require("js-cookie");

export const state = () => ({
	id: "",
	username: "",
	email: "",
	token: "",
	exp: null,
	iat: null
});

export const mutations = {
	setUser(state, token) {
		const user = jwtDecode(token);

		state.id = user.id;
		state.username = user.username;
		state.email = user.email;
		state.token = token;
		state.exp = user.exp;
		state.iat = user.iat;
	},
	logout(state) {
		state.id = "";
		state.username = "";
		state.email = "";
		state.token = "";
		state.exp = null;
		state.iat = null;
		cookie.remove("token");
		this.app.$apolloHelpers.onLogout();
	}
};

export const actions = {
	async SIGN_IN({ commit }, { email, password }) {
		return new Promise(async (resolve, reject) => {
			const client = this.app.apolloProvider.defaultClient;

			if (!email || !password) return false;

			try {
				const { data: result } = await client.mutate({
					mutation: gql`
						mutation signIn($email: String!, $password: String!) {
							signIn(
								input: { email: $email, password: $password }
							) {
								token
							}
						}
					`,
					variables: {
						email: email,
						password: password
					}
				});

				const token = result.signIn.token;
				cookie.set("token", { token });

				this.app.$apolloHelpers.onLogin(token);

				commit("setUser", token);
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	},
	async LOGOUT({ commit }) {
		commit("logout");
	}
};

export const getters = {
	isLoggedIn: state => {
		return !!state.token;
	}
};
