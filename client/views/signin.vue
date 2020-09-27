<template>
	<div class="container">
		<header>
			<h1>Sign in</h1>
		</header>
		<form @submit.prevent="signIn">
			<div class="row">
				<label for="email">Email</label>
				<input
					id="email"
					autocomplete="email"
					type="text"
					placeholder="Email"
					v-model.trim="email"
				/>
			</div>

			<div class="row">
				<label for="password">Password</label>
				<input
					id="password"
					autocomplete="current-password"
					type="password"
					placeholder="Password"
					v-model.trim="password"
				/>
			</div>

			<button class="button">
				<p>Sign in</p>
			</button>
		</form>
	</div>
</template>

<script>
import gql from "graphql-tag";
import moment from "moment/moment";

export default {
	components: {},
	data() {
		return {
			email: "",
			password: ""
		};
	},
	methods: {
		async signIn() {
			try {
				await this.$store.dispatch("user/SIGN_IN", {
					email: this.email,
					password: this.password
				});
				this.$router.push("/");
			} catch (err) {
				console.log("Error: " + err);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/includes/_variables.scss";

.row {
	margin: 20px 0;

	label {
		font-size: 12px;
		text-transform: uppercase;
		margin-bottom: 5px;
		font-weight: bold;
		display: block;
	}
}
</style>
