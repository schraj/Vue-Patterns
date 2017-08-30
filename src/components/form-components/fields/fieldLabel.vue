<template>
	<span :id="getFieldID(schema)">
		{{ value }}
	</span>
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField]
};
</script>

