<template>
	<span :id="getFieldID(nodeSchema)">
		{{ value }}
	</span>
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField]
};
</script>

