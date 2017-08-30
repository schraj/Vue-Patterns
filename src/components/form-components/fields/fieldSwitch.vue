<template lang="pug">
	label
		input(type="checkbox", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :name="schema.inputName", :id="getFieldID(schema)")
		span.label(:data-on="schema.textOn || 'On'", :data-off="schema.textOff || 'Off'", :for="getFieldID(schema)")
		span.handle
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],

	methods: {

		formatValueToField(value) {
			if (value != null && this.schema.valueOn)
				return value == this.schema.valueOn;

			return value;
		},

		formatValueToModel(value) {
			if (value != null && this.schema.valueOn) {
				if (value)
					return this.schema.valueOn;
				else
					return this.schema.valueOff;
			}

			return value;
		}
	}
};
</script>