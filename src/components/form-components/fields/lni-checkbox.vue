<template>
	<input type="checkbox" v-model="value" :disabled="disabled" :name="nodeSchema.inputName" />
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],
	methods: {

		formatValueToField(value) {
			return value;
		},

		formatValueToModel(value) {
			return value;
		}
	}
};
</script>

