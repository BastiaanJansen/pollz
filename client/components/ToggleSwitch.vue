<template>
	<div class="checkbox-slider">
		<p>
			<slot></slot>
		</p>
		<input
			type="checkbox"
			v-model="checked"
			@change="onChange"
			id="checkbox"
		/>
		<label for="checkbox" class="slider"></label>
	</div>
</template>

<script>
export default {
	props: {
		defaultChecked: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			checked: this.defaultChecked
		};
	},
	methods: {
		onChange() {
			this.$emit("input", this.checked);
		}
	},
	created() {
		this.onChange();
	}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/includes/_variables.scss";

.checkbox-slider {
	display: flex;
	align-items: center;

	.slider {
		position: relative;
		margin-left: 20px;
		width: 50px;
		height: 30px;
		background-color: $color-gray-200;
		transition: 0.3s;
		border-radius: 15px;
		cursor: pointer;
	}

	.slider::before {
		position: absolute;
		content: "";
		height: 20px;
		width: 20px;
		left: 5px;
		top: 5px;
		background-color: white;
		transition: 0.3s;
		border-radius: 50%;
		box-shadow: 0 0 1px rgba($color: #000000, $alpha: 0.15);
	}

	input {
		display: none;
	}

	input:checked + .slider {
		background-color: $color-primary;
	}

	input:checked + .slider:before {
		transform: translateX(20px);
	}
}
</style>
