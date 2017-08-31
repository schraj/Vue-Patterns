<template>
	<select class="form-control" v-model="value" :disabled="disabled" :name="nodeSchema.inputName" :id="getFieldID(schema)">
		<option v-if="!selectOptions.hideNoneSelectedText" :disabled="nodeSchema.required" :value="null" :selected="value == undefined">{{ selectOptions.noneSelectedText || "&lt;Nothing selected&gt;" }}</option>
		<option :key="item.id" v-for="item in items" :value="getItemValue(item)">{{ getItemName(item) }}</option>
	</select>
</template>

<script>
import { isObject } from "lodash";
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],

	computed: {
		selectOptions() {
			return this.nodeSchema.selectOptions || {};
		},

		items() {
			let values = this.nodeSchema.values;
			if (typeof (values) == "function") {
				return values.apply(this, [this.model, this.nodeSchema]);
			} else
				return values;
		}
	},

	methods: {
		getItemValue(item) {
			if (isObject(item)) {
				if (typeof this.nodeSchema["selectOptions"] !== "undefined" && typeof this.nodeSchema["selectOptions"]["value"] !== "undefined") {
					return item[this.nodeSchema.selectOptions.value];
				} else {
					// Use 'id' instead of 'value' cause of backward compatibility
					if (typeof item["id"] !== "undefined") {
						return item.id;
					} else {
						throw "`id` is not defined. If you want to use another key name, add a `value` property under `selectOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/select.html#select-field-with-object-items";
					}
				}
			} else {
				return item;
			}
		},

		getItemName(item) {
			if (isObject(item)) {
				if (typeof this.nodeSchema["selectOptions"] !== "undefined" && typeof this.nodeSchema["selectOptions"]["name"] !== "undefined") {
					return item[this.nodeSchema.selectOptions.name];
				} else {
					if (typeof item["name"] !== "undefined") {
						return item.name;
					} else {
						throw "`name` is not defined. If you want to use another key name, add a `name` property under `selectOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/select.html#select-field-with-object-items";
					}
				}
			} else {
				return item;
			}
		}
	}
};
</script>


