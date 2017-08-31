<template>
	<input type="submit" :value="nodeSchema.buttonText" @click="click" :name="nodeSchema.inputName" :disabled="disabled" />
</template>

<script>
import abstractField from "../abstractField";
import { isFunction } from "lodash";

export default {
	mixins: [abstractField],

	methods: {
		click() {

			this.$store.dispatch('SUBMIT_FORM');

			// TODO: Will we always validate before submit??

			// if (this.nodeSchema.validateBeforeSubmit === true) {
			// 	if (!this.$parent.validate()) {
			// 		// There are validation errors. Stop the submit
			// 		return;
			// 	}
			// }


		}
	}
};

</script>

