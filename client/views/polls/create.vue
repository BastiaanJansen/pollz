<template>
	<div class="container">
		<form @submit.prevent="createPoll">
			<p class="error" v-if="errors.noQuestionError">
				You must specify a poll question
			</p>
			<h1
				contenteditable="true"
				@input="onQuestionInput"
				:placeholder="questionPlaceholder"
			></h1>

			<div class="row">
				<p class="error" v-if="errors.notEnoughValidOptionsError">
					There must be at least 2 options
				</p>
				<div
					class="row"
					v-for="(option, index) in poll.options.length"
					:key="index"
				>
					<input
						type="text"
						:placeholder="`Option ${index + 1}`"
						v-model.trim="poll.options[index].name"
					/>
				</div>
				<p class="add-option-button" @click="addOption">
					Add option
					<i class="fas fa-plus"></i>
				</p>
			</div>

			<div class="row">
				<ToggleSwitch v-model="poll.private">Private poll</ToggleSwitch>
			</div>

			<footer>
				<button class="button">
					<p>Create poll</p>
					<i class="fas fa-plus"></i>
				</button>
			</footer>
		</form>
	</div>
</template>

<script>
import gql from "graphql-tag";
import ToggleSwitch from "@/components/ToggleSwitch";

export default {
	components: {
		ToggleSwitch
	},
	layout: "default",
	middleware: ["isLoggedIn"],
	apollo: {},
	data() {
		return {
			showQuestionPlaceholder: true,
			questionPlaceholder:
				"Which technology trend will have the greatest impact on our industry in the next year?",
			poll: {
				question: "",
				options: [],
				private: null
			},
			errors: {
				noQuestionError: false,
				notEnoughValidOptionsError: false
			}
		};
	},
	computed: {
		validOptionsCount() {
			return this.poll.options.filter(option => option.name).length;
		}
	},
	methods: {
		onQuestionInput(e) {
			let text = e.target.innerText;
			this.poll.question = text;
		},
		addOption() {
			this.poll.options.push({
				name: ""
			});
		},
		validate() {
			if (!this.poll.question) this.errors.noQuestionError = true;
			else this.errors.noQuestionError = false;

			if (this.validOptionsCount < 2)
				this.errors.notEnoughValidOptionsError = true;
			else this.errors.notEnoughValidOptionsError = false;

			if (!this.errors.notEnoughValidOptionsError) {
				this.poll.options = this.poll.options.filter(
					option => option.name
				);
			}

			return Object.keys(this.errors).every(key => !this.errors[key]);
		},
		async createPoll() {
			if (!this.validate()) return;

			const result = await this.$apollo.mutate({
				mutation: gql`
					mutation createPoll(
						$question: String!
						$private: Boolean!
						$options: [CreateOptionDto!]!
					) {
						createPoll(
							input: {
								question: $question
								private: $private
								options: $options
							}
						) {
							_id
						}
					}
				`,
				variables: {
					question: this.poll.question,
					private: this.poll.private,
					options: this.poll.options
				}
			});

			this.$router.push(`/polls/${result.data.createPoll._id}`);
		}
	},
	created() {
		this.addOption();
		this.addOption();
	}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/includes/_variables.scss";

.container {
	display: flex;
}

form {
	width: 100%;

	p.error {
		color: $color-red-500;
		font-size: 13px;
	}

	h1 {
		border: none;
		outline: none;
		background-color: transparent;
		width: 100%;
		text-align: left;
		margin-bottom: 20px;

		&:empty:before {
			content: attr(placeholder);
			pointer-events: none;
			display: block;
			color: $color-gray-500;
		}
	}

	.row {
		margin-top: 20px;
	}

	p.add-option-button {
		font-size: 15px;
		border: none;
		background-color: transparent;
		margin-top: 20px;
		cursor: pointer;
		outline: none;

		i {
			font-size: 12px;
			margin-left: 5px;
		}
	}

	.button {
		margin-left: auto;
	}
}

footer {
	display: flex;
	margin-top: 30px;
}
</style>
