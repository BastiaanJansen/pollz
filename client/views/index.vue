<template>
	<div class="container">
		<header>
			<h1>Polls</h1>
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
	apollo: {
		polls: {
			query: gql`
				query polls {
					polls(filters: { private: false }) {
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
						}
					}
				}
			`,
			subscribeToMore: {
				document: gql`
					subscription newPoll {
						newPoll {
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
							}
						}
					}
				`,
				updateQuery: (prev, { subscriptionData }) => {
					const polls = [
						subscriptionData.data.newPoll,
						...prev.polls
					];

					return {
						polls
					};
				}
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
