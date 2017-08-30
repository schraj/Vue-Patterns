<template lang="pug">
	input(type="checkbox", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :name="schema.inputName")
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

