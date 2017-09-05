<template>
	<fieldset>
		<legend>{{nodeSchema.attributes.label}}</legend>
		<slot />
	</fieldset>
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],
	methods: {
	}
};
</script>

