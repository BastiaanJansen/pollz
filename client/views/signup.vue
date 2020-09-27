<template>
	<div class="container">
		<header>
			<h1>Sign up</h1>
		</header>
		<form @submit.prevent="signUp">
			<div class="row">
				<label for="username">Username</label>
				<input
					id="username"
					type="text"
					placeholder="Username"
					v-model="username"
				/>
			</div>

			<div class="row">
				<label for="email">Email</label>
				<input
					id="email"
					type="text"
					placeholder="Email"
					v-model="email"
				/>
			</div>

			<div class="row">
				<label for="password">Password</label>
				<input
					id="password"
					type="password"
					placeholder="Password"
					v-model="password"
				/>
			</div>

			<button class="button">
				<p>Sign up</p>
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
			username: "",
			email: "",
			password: ""
		};
	},
	methods: {
		async signUp() {
			try {
				const { data: result } = await this.$apollo.mutate({
					mutation: gql`
						mutation signUp(
							$username: String!
							$email: String!
							$password: String!
						) {
							signUp(
								input: {
									username: $username
									email: $email
									password: $password
								}
							) {
								username
								email
							}
						}
					`,
					variables: {
						username: this.username,
						email: this.email,
						password: this.password
					}
				});

				this.$router.push("/signin");
			} catch (err) {
				console.log(err);
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
