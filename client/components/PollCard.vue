<template>
	<nuxt-link :to="`/polls/${id}`" class="poll">
		<ul class="tags">
			<li class="tag red" v-if="isPrivate">Private</li>
			<li class="tag">{{ totalVotes }} votes</li>
		</ul>
		<h2>{{ question }}</h2>

		<footer>
			<p class="created-by">
				By <strong>{{ username }}</strong>
			</p>
			<p class="created-at">
				{{ moment(createdAt).fromNow() }}
			</p>
		</footer>
	</nuxt-link>
</template>

<script>
import moment from "moment/moment";

export default {
	props: {
		id: {
			type: String,
			required: true
		},
		question: {
			type: String,
			required: true
		},
		totalVotes: {
			type: Number,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		isPrivate: {
			type: Boolean,
			required: false,
			default: false
		},
		createdAt: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			moment
		};
	},
	methods: {},
	created() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/includes/_variables.scss";

.poll {
	padding: 25px;
	border: 2px solid $color-gray-300;
	margin-bottom: 30px;
	border-radius: 12px;
	display: block;
	// box-shadow: $shadow;
	position: relative;
	background-color: white;
	transition: 0.3s;

	&:hover {
		box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
	}

	.tags {
		position: absolute;
		right: -10px;
		top: -15px;
		width: max-content;
		height: 30px;
		display: flex;

		.tag {
			position: relative;
			padding: 5px 15px;
			border-radius: 30px;
			background-color: $color-primary;
			font-size: 13px;
			color: white;
			margin-left: 15px;

			&:first-of-type {
				margin-left: 0;
			}

			&.red {
				background-color: $color-red-500;
			}
		}
	}

	h2 {
		font-size: 1.5rem;
	}

	footer {
		display: flex;
		align-items: center;
		margin-top: 10px;

		.created-by {
			margin-right: 20px;
		}
	}
}
</style>
