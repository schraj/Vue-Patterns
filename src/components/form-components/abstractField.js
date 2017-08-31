import { get as objGet, isNil, each, isFunction, isString, isArray } from "lodash";
import validators from "./utils/validators";
import customValidators from "./utils/customValidators";
import customFunctions from "./utils/customFunctions";
import schemaUtils from "./utils/schema";

function convertValidator(validator) {
	if (isString(validator)) {
		if (validators[validator] != null)
			return validators[validator];
		else if (validators[validator] != null)
			return validators[validator];
		else {
			console.warn(`'${validator}' is not a validator function!`);
			return null; // caller need to handle null
		}
	}
	return validator;
}

function convertFunction(customFunction) {
	if (isString(customFunction)) {
		if (customFunctions[customFunction] != null)
			return customFunctions[customFunction];
		else if (customFunctions[customFunction] != null)
			return customFunctions[customFunction];
		else {
			console.warn(`'${customFunction}' is not a customFunction function!`);
			return null; // caller need to handle null
		}
	}
	return customFunction;
}


export default {
	props: [
		"formData",
		"schema",
		"formOptions",
		"disabled"
	],

	data() {
		return {
			errors: []
		};
	},

	computed: {
		isVisible: {
			get() {
				let visible = true;
				if (this.schema.attributes.dependsOnValue) {
					const dep = JSON.parse(this.schema.attributes.dependsOnValue);
					Object.keys(dep).forEach(k => {
						if (dep[k] != this.formData[k]) {
							visible = false;
						}
					});
				} else if (this.schema.attributes.dependsOnFunction) {
					let func = convertFunction(this.schema.attributes.dependsOnFunction);
					if (func) {
						let customVisibiltyFunc = func.bind(this);
						visible = customVisibiltyFunc(this.formData);
					}
				}
				return visible;
			}
		},
		value: {
			cache: false,
			get() {
				let val;
				if (isFunction(this.schema.attributes.get))
					val = this.schema.attributes.get(this.formData);

				else if (this.formData && this.schema.attributes.model)
					val = objGet(this.formData, this.schema.attributes.model);

				if (isFunction(this.formatValueToField))
					val = this.formatValueToField(val);

				return val;
			},

			set(newValue) {
				let oldValue = this.value;

				if (isFunction(this.formatValueToModel))
					newValue = this.formatValueToModel(newValue);

				let changed = false;
				if (isFunction(this.schema.attributes.set)) {
					this.schema.attributes.set(this.formData, newValue);
					changed = true;

				} else if (this.schema.attributes.model) {
					this.setModelValueByPath(this.schema.attributes.model, newValue);
					changed = true;
				}

				if (changed) {
					this.$store.commit('UPDATE_FORM', { key: this.schema.attributes.model, value: newValue });

					if (isFunction(this.schema.attributes.onChanged)) {
						this.schema.onChanged.call(this, this.formData, newValue, oldValue, this.schema);
					}

					if (this.$parent.options && this.$parent.options.validateAfterChanged === true) {
						this.validate();
					}
				}
			}
		}
	},

	methods: {
		// Get style classes of field
		getFieldRowClasses(field) {
			const hasErrors = this.fieldErrors(field).length > 0;
			let baseClasses = {
				error: hasErrors,
				disabled: this.fieldDisabled(field),
				readonly: this.fieldReadonly(field),
				required: this.fieldRequired(field)
			};

			// let { validationErrorClass, validationSuccessClass } = this.options;
			// if (validationErrorClass && validationSuccessClass) {
			// 	if (hasErrors) {
			// 		baseClasses[validationErrorClass] = true;
			// 		baseClasses.error = false;
			// 	}
			// 	else {
			// 		baseClasses[validationSuccessClass] = true;
			// 	}
			// }

			// if (isArray(field.styleClasses)) {
			// 	each(field.styleClasses, (c) => baseClasses[c] = true);
			// }
			// else if (isString(field.styleClasses)) {
			// 	baseClasses[field.styleClasses] = true;
			// }

			baseClasses["field-" + field.element] = true;

			return baseClasses;
		},

		// Should field type have a label?
		fieldTypeHasLabel(field) {
			let relevantType = "";
			if (field.element === "lni-input") {
				relevantType = field.inputType;
			} else {
				relevantType = field.type;
			}

			switch (relevantType) {
				case "lni-button":
				case "lni-submit":
				case "lni-reset":
					return false;
				default:
					return true;
			}
		},

		// Get disabled attr of field
		fieldDisabled(field) {
			if (isNil(field.attributes.disabled))
				return false;

			return field.attributes.disabled;
		},

		// Get required prop of field
		fieldRequired(field) {
			if (isNil(field.attributes.required))
				return false;

			return field.attributes.required;
		},

		// Get readonly prop of field
		fieldReadonly(field) {
			if (isNil(field.attributes.readonly))
				return false;

			return field.readonly;
		},

		fieldErrors(field) {
			let res = this.errors.filter(e => e.field == field);
			return res.map(item => item.error);
		},

		validate(calledParent) {
			this.clearValidationErrors();

			if (this.schema.validator && this.schema.readonly !== true && this.disabled !== true) {

				let validators = [];
				if (!isArray(this.schema.validator)) {
					validators.push(convertValidator(this.schema.validator).bind(this));
				} else {
					each(this.schema.validator, (validator) => {
						validators.push(convertValidator(validator).bind(this));
					});
				}

				each(validators, (validator) => {
					let addErrors = err => {
						if (isArray(err))
							Array.prototype.push.apply(this.errors, err);
						else if (isString(err))
							this.errors.push(err);
					};

					let res = validator(this.value, this.schema, this.formData);
					if (res && isFunction(res.then)) {
						// It is a Promise, async validator
						res.then(err => {
							if (err) {
								addErrors(err);
								let isValid = this.errors.length == 0;
								this.$emit("validated", isValid, this.errors, this);
							}
						});
					} else {
						if (res)
							addErrors(res);
					}
				});

			}

			if (isFunction(this.schema.onValidated)) {
				this.schema.onValidated.call(this, this.formData, this.errors, this.schema);
			}

			let isValid = this.errors.length == 0;
			if (!calledParent)
				this.$emit("validated", isValid, this.errors, this);

			return this.errors;
		},

		clearValidationErrors() {
			this.errors.splice(0);
		},

		setModelValueByPath(path, value) {
			// convert array indexes to properties
			let s = path.replace(/\[(\w+)\]/g, ".$1");

			// strip a leading dot
			s = s.replace(/^\./, "");

			let o = this.formData;
			const a = s.split(".");
			let i = 0;
			const n = a.length;
			while (i < n) {
				let k = a[i];
				if (i < n - 1)
					if (o[k] !== undefined) {
						// Found parent property. Step in
						o = o[k];
					} else {
						// Create missing property (new level)
						this.$root.$set(o, k, {});
						o = o[k];
					}
				else {
					// Set final property value
					this.$root.$set(o, k, value);
					return;
				}

				++i;
			}
		},

		getFieldID(schema) {
			const idPrefix = this.formOptions && this.formOptions.fieldIdPrefix ? this.formOptions.fieldIdPrefix : "";
			return schemaUtils.slugifyFormID(schema, idPrefix);
		}

	}
};
