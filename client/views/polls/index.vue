<template>
	<div class="container">
		<div class="loader" v-if="$apollo.queries.poll.loading">Loading...</div>
		<div class="poll" v-if="!$apollo.queries.poll.loading">
			<header>
				<p class="tag red" v-if="poll.private">Private</p>
				<h1>{{ poll.question }}</h1>
			</header>

			<div class="poll-info">
				<ul>
					<li>
						By
						<strong>{{ poll.user.username }}</strong>
					</li>
					<li>{{ poll.createdAt | formatDate }}</li>
				</ul>
				<p class="tag">{{ poll.totalVotes }} votes</p>
			</div>
			<ul class="options" :class="{ 'can-vote': !votedOption && isLoggedIn }">
				<li
					class="option"
					:class="{
						selected: isSelected(option._id)
					}"
					@click="optionClicked(index)"
					v-for="(option, index) in poll.options"
					:key="index"
				>
					<div class="option-info">
						<p class="option-name">{{ option.name }}</p>
						<ul class="right">
							<li>{{ option.totalVotes }} votes</li>
							<li>{{ getPercentage(index) }}%</li>
						</ul>
					</div>
					<div class="bar">
						<div class="inner-bar" :style="{
								width: getPercentage(index) + '%'
							}"></div>
					</div>
				</li>
			</ul>

			<footer>
				<button class="footer-button" @click="vote" v-if="!votedOption && isLoggedIn">
					Submit vote
					<i class="fas fa-chevron-right"></i>
				</button>
				<button class="footer-button" @click="unvote" v-if="votedOption && isLoggedIn">
					Unvote
					<i class="fas fa-chevron-right"></i>
				</button>
				<button class="footer-button" v-if="!isLoggedIn">
					<nuxt-link to="/signin">
						Sign in to vote
						<i class="fas fa-chevron-right"></i>
					</nuxt-link>
				</button>
			</footer>
		</div>
	</div>
</template>

<script>
import gql from "graphql-tag";
import moment from "moment/moment";
import { mapGetters } from "vuex";

export default {
	components: {},
	layout: "default",
	apollo: {
		poll: {
			query: gql`
				query poll($id: String!) {
					poll(id: $id) {
						_id
						question
						totalVotes
						private
						createdAt
						user {
							username
						}
						options {
							_id
							name
							totalVotes
							votes {
								_id
								user {
									_id
								}
							}
						}
					}
				}
			`,
			subscribeToMore: {
				document: gql`
					subscription optionVoted($id: String!) {
						optionVoted(id: $id) {
							_id
							question
							totalVotes
							private
							createdAt
							user {
								username
							}
							options {
								_id
								name
								totalVotes
								votes {
									_id
									user {
										_id
									}
								}
							}
						}
					}
				`,
				variables() {
					return {
						id: this.$route.params.id
					};
				}
			},
			variables() {
				return {
					id: this.$route.params.id
				};
			}
		}
	},
	data() {
		return {
			selectedOptionId: null
		};
	},
	computed: {
		...mapGetters({
			isLoggedIn: "user/isLoggedIn"
		}),
		votedOption() {
			const option = this.poll.options.find(option => {
				const users = option.votes.map(vote => vote.user);
				const ids = users.map(user => user._id);
				if (ids.includes(this.$store.state.user.id)) return true;
				return false;
			});

			return option;
		},
		getVote() {
			const option = this.votedOption;
			const vote = option.votes.find(vote => {
				return vote.user._id === this.$store.state.user.id;
			});

			return vote;
		}
	},
	watch: {
		poll() {
			if (!this.votedOption) return;
			this.selectedOptionId = this.votedOption._id;
		}
	},
	methods: {
		getPercentage(optionIndex) {
			if (this.poll.totalVotes > 0) {
				return Math.round(
					(this.poll.options[optionIndex].totalVotes /
						this.poll.totalVotes) *
						100
				);
			}

			return 0;
		},
		optionClicked(index) {
			if (this.votedOption || !this.isLoggedIn) return;
			this.selectedOptionId = this.poll.options[index]._id;
		},
		isSelected(optionId) {
			return this.selectedOptionId === optionId;
		},
		async vote() {
			if (!this.selectedOptionId) return;

			this.$apollo.mutate({
				mutation: gql`
					mutation($optionId: String!) {
						vote(input: { optionId: $optionId }) {
							_id
						}
					}
				`,
				variables: {
					optionId: this.selectedOptionId
				}
			});
		},
		async unvote() {
			if (!this.selectedOptionId || !this.getVote) return;

			this.$apollo.mutate({
				mutation: gql`
					mutation($voteId: String!) {
						unvote(id: $voteId) {
							_id
						}
					}
				`,
				variables: {
					voteId: this.getVote._id
				}
			});
		}
	},
	created() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/includes/_variables.scss";

.tag {
	padding: 5px 15px;
	border-radius: 30px;
	background-color: $color-primary;
	max-width: max-content;
	font-size: 13px;
	color: white;
}

.tag.red {
	background-color: $color-red-500;
}

header {
	.tag {
		margin-bottom: 20px;
	}

	h1 {
		font-size: 2.4rem;
	}
}

.poll-info {
	margin: 20px 0;
	display: flex;
	align-items: center;

	ul {
		display: flex;
		margin-right: -20px;

		li {
			margin-right: 20px;
		}
	}

	.tag {
		margin-left: auto;
	}
}

.options {
	display: flex;
	flex-direction: column;

	&.can-vote .option {
		cursor: pointer;
		&:hover {
			box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
		}
	}

	.option {
		margin: 10px 0;
		border: 2px solid $color-gray-300;
		border-radius: 12px;
		padding: 20px;
		background-color: white;
		transition: 0.3s;

		.option-name {
			font-size: 1.3rem;
		}

		&.selected {
			border-color: $color-primary;
		}

		.option-info {
			display: flex;
			margin-bottom: 7px;

			p.option-name {
				font-weight: bold;
			}

			ul.right {
				margin-left: auto;
				display: flex;

				li {
					font-weight: bold;
					margin-left: 15px;
				}
			}
		}

		.bar {
			width: 100%;
			height: 15px;
			background-color: lighten($color-primary, 50%);
			border-radius: 6px;

			.inner-bar {
				height: 100%;
				background-color: $color-primary;
				border-radius: 6px;
				transition: 0.3s;
			}
		}
	}
}

footer {
	display: flex;
	margin-top: 5px;

	.footer-button {
		border: none;
		background-color: transparent;
		font-size: 14px;
		cursor: pointer;
		padding: 5px;
		margin-left: auto;
		transition: 0.3s;
		border-bottom: 2px solid transparent;
		outline: none;

		i {
			font-size: 12px;
			margin-left: 5px;
		}

		&:hover {
			color: $color-primary;
		}
	}
}
</style>
