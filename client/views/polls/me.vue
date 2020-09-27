<template>
	<div class="container">
		<header>
			<h1>My Polls</h1>
		</header>
		<div class="loader" v-if="$apollo.queries.polls.loading">
			Loading...
		</div>
		<div class="polls" v-if="!$apollo.queries.polls.loading">
			<PollCard
				v-for="(poll, index) in polls"
				:key="index"
				:id="poll._id"
				:totalVotes="poll.totalVotes"
				:question="poll.question"
				:username="poll.user.username"
				:isPrivate="poll.private"
				:createdAt="poll.createdAt"
			/>
		</div>
	</div>
</template>

<script>
import gql from "graphql-tag";
import PollCard from "~/components/PollCard";

export default {
	components: {
		PollCard
	},
	middleware: ["isLoggedIn"],
	apollo: {
		polls: {
			query: gql`
				query polls($userId: String!) {
					polls(filters: { userId: $userId }) {
						_id
						question
						totalVotes
						createdAt
						private
						user {
							username
						}
						options {
							_id
							name
							totalVotes
						}
					}
				}
			`,
			variables() {
				return {
					userId: this.$store.state.user.id
				};
			}
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/includes/_variables.scss";

header {
	display: flex;
	align-items: center;
	margin-bottom: 40px;

	h1 {
		font-size: 2.4rem;
	}

	.button {
		margin-left: auto;
	}
}
</style>
