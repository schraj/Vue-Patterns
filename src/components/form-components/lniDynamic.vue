<template>
	<div>
		<template v-for="node in tree">
			<template v-if="node.children && node.children.length > 0">
				<component :is="getElementType(node.element)" :id="getFieldId(node)" :key="tree.indexOf(node)" :nodeSchema="node">
					<lniDynamic :tree="node.children" :nodeSchema="node" />
				</component>
			</template>
			<template v-else-if="availableComponents.indexOf(getElementType(node.element)) !== -1">
				<component :is="getElementType(node.element)" :id="getFieldId(node)" :key="tree.indexOf(node)" :tree="node.children" :nodeSchema="node">
				</component>
			</template>
			<template v-else>
				<lni-element :element="node.element" :text="node.attributes.text"></lni-element>
			</template>
		</template>
	</div>
</template>

<script>
import abstractField from "./abstractField";

export default {
	name: "lniDynamic",
	mixins: [abstractField],
	methods: {}
};
</script>

