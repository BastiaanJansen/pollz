<template>
	<div class="wrapper">
		<nav>
			<div class="container">
				<ul>
					<li id="logo">
						<nuxt-link to="/">Pollz</nuxt-link>
					</li>
				</ul>
				<ul class="right">
					<li v-if="isLoggedIn">
						<nuxt-link to="/polls/me">My polls</nuxt-link>
					</li>
					<li v-if="isLoggedIn">
						<nuxt-link to="/polls/create" class="button"
							>Create poll <i class="fas fa-plus"></i
						></nuxt-link>
					</li>
					<li v-if="!isLoggedIn">
						<nuxt-link to="/signin" class="button"
							>Sign in</nuxt-link
						>
					</li>
					<li v-if="!isLoggedIn">
						<nuxt-link to="/signup" class="button"
							>Sign up</nuxt-link
						>
					</li>
				</ul>
			</div>
		</nav>

		<div class="content">
			<nuxt />
		</div>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
	computed: {
		user() {
			return this.$store.state.user;
		},
		...mapGetters({
			isLoggedIn: "user/isLoggedIn"
		})
	}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/includes/_variables.scss";

.wrapper {
	display: grid;
	grid-template-areas:
		"nav"
		"content";
	grid-gap: 60px;
}

nav {
	width: 100%;
	height: 50px;
	background-color: $color-gray-200;
	padding: 0 20px;
	position: fixed;
	box-sizing: border-box;
	display: flex;
	z-index: 2;
	grid-area: nav;

	.container {
		display: flex;
	}

	ul {
		display: flex;
		align-items: center;
		height: 100%;

		li {
			margin-left: 20px;

			&:first-of-type {
				margin-left: 0;
			}

			&#logo a {
				font-size: 1.5rem;
				font-weight: bold;
				color: $color-primary;
			}
		}

		&.right {
			margin-left: auto;
		}
	}
}

.content {
	grid-area: content;
}
</style>
