let exports = {};

exports.getById = function()

exports.slugifyFormID = function (nodeSchema) {
	// Try to get a reasonable default id from the schema,
	// then slugify it.
	if (typeof nodeSchema.attributes.id !== "undefined") {
		// If an ID's been explicitly set, use it unchanged
		return nodeSchema.attributes.id;
	} else {
		// Return the slugified version of either:
		return (nodeSchema.attributes.inputName || nodeSchema.attributes.label || nodeSchema.attributes.model)
			// avoiding extra dependencies.
			.toString()
			.trim()
			.toLowerCase()
			// Spaces & underscores to dashes
			.replace(/ |_/g, "-")
			// Multiple dashes to one
			.replace(/-{2,}/g, "-")
			// Remove leading & trailing dashes
			.replace(/^-+|-+$/g, "")
			// Remove anything that isn't a (English/ASCII) letter, number or dash.
			.replace(/([^a-zA-Z0-9-]+)/g, "");
	}
};

export default exports;