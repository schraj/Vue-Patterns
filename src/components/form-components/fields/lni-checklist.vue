<template>
	<div class="wrapper">
		<div class="listbox form-control" v-if="nodeSchema.listBox" :disabled="disabled">
			<div :key="item.id" class="list-row" v-for="item in items" :class="{'is-checked': isItemChecked(item)}">
				<label>
					<input type="checkbox" :checked="isItemChecked(item)" :disabled="disabled" @change="onChanged($event, item)" />{{ getItemName(item) }}
				</label>
			</div>
		</div>
		<div class="combobox form-control" v-if="!nodeSchema.listBox" :disabled="disabled">
			<div class="mainRow" @click="onExpandCombo" :class="{ expanded: comboExpanded }">
				<div class="info">{{ selectedCount }} selected</div>
				<div class="arrow"></div>
			</div>
			<div class="dropList">
				<div :key="item.id" class="list-row" v-if="comboExpanded" v-for="item in items" :class="{'is-checked': isItemChecked(item)}">
					<label>
						<input type="checkbox" :checked="isItemChecked(item)" :disabled="disabled" @change="onChanged($event, item)" />{{ getItemName(item) }}
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { isObject, isNil, clone } from "lodash";
import abstractField from "../abstractField";

export default {
	mixins: [abstractField],

	data() {
		return {
			comboExpanded: false
		};
	},

	computed: {
		items() {
			let values = this.nodeSchema.values;
			if (typeof (values) == "function") {
				return values.apply(this, [this.model, this.nodeSchema]);
			} else
				return values;
		},

		selectedCount() {
			if (this.value)
				return this.value.length;

			return 0;
		}
	},

	methods: {
		getItemValue(item) {
			if (isObject(item)) {
				if (typeof this.nodeSchema["checklistOptions"] !== "undefined" && typeof this.nodeSchema["checklistOptions"]["value"] !== "undefined") {
					return item[this.nodeSchema.checklistOptions.value];
				} else {
					if (typeof item["value"] !== "undefined") {
						return item.value;
					} else {
						throw "`value` is not defined. If you want to use another key name, add a `value` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values";
					}
				}
			} else {
				return item;
			}
		},
		getItemName(item) {
			if (isObject(item)) {
				if (typeof this.nodeSchema["checklistOptions"] !== "undefined" && typeof this.nodeSchema["checklistOptions"]["name"] !== "undefined") {
					return item[this.nodeSchema.checklistOptions.name];
				} else {
					if (typeof item["name"] !== "undefined") {
						return item.name;
					} else {
						throw "`name` is not defined. If you want to use another key name, add a `name` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values";
					}
				}
			} else {
				return item;
			}
		},

		isItemChecked(item) {
			return (this.value && this.value.indexOf(this.getItemValue(item)) != -1);
		},

		onChanged(event, item) {
			if (isNil(this.value) || !Array.isArray(this.value)) {
				this.value = [];
			}

			if (event.target.checked) {
				// Note: If you modify this.value array, it won't trigger the `set` in computed field
				const arr = clone(this.value);
				arr.push(this.getItemValue(item));
				this.value = arr;
			} else {
				// Note: If you modify this.value array, it won't trigger the `set` in computed field
				const arr = clone(this.value);
				arr.splice(this.value.indexOf(this.getItemValue(item)), 1);
				this.value = arr;
			}
		},

		onExpandCombo() {
			this.comboExpanded = !this.comboExpanded;
		}
	}
};
</script>

