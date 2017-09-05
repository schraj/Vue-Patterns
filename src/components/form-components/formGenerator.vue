<template>
	<div class="form-generator" v-if="schema">
		<lniDynamic :tree="schema.children" :nodeSchema="schema">
		</lniDynamic>
	</div>
</template>


<script>
import { isNil, isString } from "lodash";
import schemaUtils from "./utils/schema";
import lniDynamic from './lniDynamic';

export default {
	components: {
		lniDynamic
	},

	props: {
		schema: Object,
		isNewModel: {
			type: Boolean,
			default: false
		},
	},

	data() {
		return {
		};
	},

	computed: {
	},

	watch: {
		// // new model loaded
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
	}
};

</script>
