<template>
	<div>
		<form class="lni-c-form">
			<template v-for="node in tree">
				<template v-if="availableComponents.indexOf(getElementType(node.element)) !== -1">
					<component :is="getElementType(node.element)" :key="tree.indexOf(node)" :tree="node.children" :nodeSchema="node" :formData="formData" :formOptions="formOptions">
					</component>
				</template>
				<template v-else>
					<lni-element :element="node.element" :text="node.attributes.text"></lni-element>
				</template>
			</template>
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

