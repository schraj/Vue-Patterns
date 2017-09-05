<template>
	<div class="form-generator" v-if="schema">
		<lniDynamic :tree="schema.children" :nodeSchema="schema" :formData="formData" :formOptions="options">
		</lniDynamic>
	</div>
</template>


<script>
import { isFunction, isNil, isArray, isString } from "lodash";
import schemaUtils from "./utils/schema";
import lniDynamic from './lniDynamic';

export default {
	components: {
		lniDynamic
	},

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

		isNewModel: {
			type: Boolean,
			default: false
		},
	},

	data() {
		return {
			errors: [] // Validation errors
		};
	},

	computed: {
		// fields() {
		// 	let res = [];
		// 	if (this.nodeSchema && this.nodeSchema.children) {
		// 		each(this.nodeSchema.children, (field) => {
		// 			if (!this.multiple || field.multi === true)
		// 				res.push(field);
		// 		});
		// 	}

		// 	return res;
		// },
	},

	watch: {
		// new model loaded
		// model: function(newModel, oldModel) {
		// 	if (oldModel == newModel) // model property changed, skip
		// 		return;

		// 	if (newModel != null) {
		// 		this.$nextTick(() => {
		// 			// Model changed!
		// 			if (this.options.validateAfterLoad === true && this.isNewModel !== true)
		// 				this.validate();
		// 			else
		// 				this.clearValidationErrors();
		// 		});
		// 	}
		// }
	},

	mounted() {
		// this.$nextTick(() => {
		// 	if (this.model) {
		// 		// First load, running validation if neccessary
		// 		if (this.options.validateAfterLoad === true && this.isNewModel !== true) {
		// 			this.validate();
		// 		} else {
		// 			this.clearValidationErrors();
		// 		}
		// 	}
		// });
	},

	methods: {
		// buttonClickHandler(btn, field, event) {
		// 	return btn.onclick.call(this, this.model, field, event, this);
		// },

		// Child field executed validation
		// onFieldValidated(res, errors, field) {
		// 	// Remove old errors for this field
		// 	this.errors = this.errors.filter(e => e.field != field.schema);

		// 	if (!res && errors && errors.length > 0) {
		// 		// Add errors with this field
		// 		errors.forEach((err) => {
		// 			this.errors.push({
		// 				field: field.schema,
		// 				error: err
		// 			});
		// 		});
		// 	}

		// 	let isValid = this.errors.length == 0;
		// 	this.$emit("validated", isValid, this.errors);
		// },

		// Validating the model properties
		// validate() {
		// 	this.clearValidationErrors();

		// 	// this.$children.forEach((child) => {
		// 	// 	if (isFunction(child.validate)) {
		// 	// 		let errors = child.validate(true);
		// 	// 		errors.forEach((err) => {
		// 	// 			this.errors.push({
		// 	// 				field: child.schema,
		// 	// 				error: err
		// 	// 			});
		// 	// 		});
		// 	// 	}
		// 	// });

		// 	// let isValid = this.errors.length == 0;
		// 	// this.$emit("validated", isValid, this.errors);
		// 	return isValid;
		// },

		// // Clear validation errors
		// clearValidationErrors() {
		// 	this.errors.splice(0);

		// 	// each(this.$children, (child) => {
		// 	// 	child.clearValidationErrors();
		// 	// });
		// },

		// modelUpdated(newVal, schema) {
		// 	//this.$emit("model-updated", newVal, schema);
		// },
	}
};

</script>
