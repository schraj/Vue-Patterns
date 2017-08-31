<template>
	<fieldset>
		<legend>{{nodeSchema.attributes.legend}}</legend>
		<template v-for="node in tree">
			<template v-if="availableComponents.indexOf(node.element) !== -1">
				<component :is="getElementType(node.element)" :key="tree.indexOf(node)" :tree="node.children" :nodeSchema="node" :formData="formData" :formOptions="formOptions">
				</component>
			</template>
			<template v-else>
				<lni-element :element="node.element" :text="node.attributes.text"></lni-element>
			</template>
		</template>
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

