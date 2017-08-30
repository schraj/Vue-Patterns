<template lang="pug">
	span(:id="getFieldID(schema)") {{ value }}
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField]
};
</script>

