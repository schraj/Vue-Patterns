<template>
	<div class="vue-form-generator" v-if="schema != null">
		<fieldset v-if="schema.children" :is="tag">
			<template v-for="field in schema.children">
				<component :key="field.attributes.id" :is="getFieldType(field)" :schema="field" :formData="formData" :formOptions="options" @model-updated="modelUpdated" @validated="onFieldValidated"></component>
			</template>
		</fieldset>
	</div>
</template>

<script>
import { each, isFunction, isNil, isArray, isString } from "lodash";
import schemaUtils from "./utils/schema";

// Load all fields from './fields' folder
let fieldComponents = {};

let coreFields = require.context("./fields", false, /^\.\/lni-([\w-_]+)\.vue$/);

each(coreFields.keys(), (key) => {
	let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
	fieldComponents[compName] = coreFields(key);
});

export default {
	components: fieldComponents,

	props: {
		schema: Object,

		formData: Object,

		options: {
			type: Object,
			default() {
				return {
					validateAfterLoad: false,
					validateAfterChanged: false,
					validationErrorClass: "error",
					validationSuccessClass: "",
				};
			}
		},

		multiple: {
			type: Boolean,
			default: false
		},

		isNewModel: {
			type: Boolean,
			default: false
		},

		tag: {
			type: String,
			default: "fieldset",
			validator: function(value) {
				return value.length > 0;
			}
		}
	},

	data() {
		return {
			errors: [] // Validation errors
		};
	},

	computed: {
		fields() {
			let res = [];
			if (this.schema && this.schema.children) {
				each(this.schema.children, (field) => {
					if (!this.multiple || field.multi === true)
						res.push(field);
				});
			}

			return res;
		},
	},

	watch: {
		// new model loaded
		model: function(newModel, oldModel) {
			if (oldModel == newModel) // model property changed, skip
				return;

			if (newModel != null) {
				this.$nextTick(() => {
					// Model changed!
					if (this.options.validateAfterLoad === true && this.isNewModel !== true)
						this.validate();
					else
						this.clearValidationErrors();
				});
			}
		}
	},

	mounted() {
		this.$nextTick(() => {
			if (this.model) {
				// First load, running validation if neccessary
				if (this.options.validateAfterLoad === true && this.isNewModel !== true) {
					this.validate();
				} else {
					this.clearValidationErrors();
				}
			}
		});
	},

	methods: {
		// It'll be the name of HTML element
		getFieldType(fieldSchema) {
			const elementName = fieldSchema.element;
			switch (elementName) {
				case 'lni-textbox':
					{
						return 'lni-input';
					}
				default: return elementName;
			}
		},

		buttonClickHandler(btn, field, event) {
			return btn.onclick.call(this, this.model, field, event, this);
		},

		// Child field executed validation
		onFieldValidated(res, errors, field) {
			// Remove old errors for this field
			this.errors = this.errors.filter(e => e.field != field.schema);

			if (!res && errors && errors.length > 0) {
				// Add errors with this field
				errors.forEach((err) => {
					this.errors.push({
						field: field.schema,
						error: err
					});
				});
			}

			let isValid = this.errors.length == 0;
			this.$emit("validated", isValid, this.errors);
		},

		// Validating the model properties
		validate() {
			this.clearValidationErrors();

			this.$children.forEach((child) => {
				if (isFunction(child.validate)) {
					let errors = child.validate(true);
					errors.forEach((err) => {
						this.errors.push({
							field: child.schema,
							error: err
						});
					});
				}
			});

			let isValid = this.errors.length == 0;
			this.$emit("validated", isValid, this.errors);
			return isValid;
		},

		// Clear validation errors
		clearValidationErrors() {
			this.errors.splice(0);

			each(this.$children, (child) => {
				child.clearValidationErrors();
			});
		},

		modelUpdated(newVal, schema) {
			this.$emit("model-updated", newVal, schema);
		},

		buttonVisibility(field) {
			return field.buttons && field.buttons.length > 0;
		},

		getFieldID(schema) {
			const idPrefix = this.options && this.options.fieldIdPrefix ? this.options.fieldIdPrefix : "";
			return schemaUtils.slugifyFormID(schema, idPrefix);
		}
	}
};

</script>
