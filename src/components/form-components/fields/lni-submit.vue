<template>
	<input type="submit" :value="nodeSchema.buttonText" @click="click" :name="nodeSchema.inputName" :disabled="disabled" />
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],

	methods: {
		click() {

			this.$store.dispatch('SUBMIT_FORM');
		}
	}
};

</script>

