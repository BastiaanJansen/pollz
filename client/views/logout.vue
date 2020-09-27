<template>
	<div class="container">
		<p>Logging out...</p>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	methods: {
		logout() {
			this.$store.dispatch("user/LOGOUT");
		}
	},
	created() {
		this.logout();
		this.$router.push("/");
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
