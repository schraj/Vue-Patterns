import { defaults, isNil, isNumber, isString, isArray, isFunction } from "lodash";
import fecha from "fecha";

let customResources = {
	fieldIsRequired: "This field is required!",
};

let exports = {

	customResources,

	nameRequired(value, field, model, messages = resources) {
		return checkEmpty(value, field.required, messages);
	},
}

Object.keys(exports).forEach(name => {
	const fn = exports[name];
	if (isFunction(fn)) {
		fn.locale = customMessages => (value, field, model) => fn(value, field, model, defaults(customMessages, resources));
	}
});

export default exports;