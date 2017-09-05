<template>
	<div>
		<form class="lni-c-form">
			<slot />
		</form>
	</div>
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],
	methods: {
	}
};
</script>

