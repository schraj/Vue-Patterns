<template>
	<input id="getFieldID(schema)" type="schema.inputType" value="value" onInput="value = $event.target.value" onChange="onChange" disabled="disabled" />
</template>

<script>
import fecha from "fecha";

export default {
	//mixins: [abstractField],
	methods: {
		onChange(event) {
			if (this.schema.inputType === "file") {
				this.value = event.target.files;
			}
		},

		formatValueToField(value) {
			if (value != null) {
				let dt;
				switch (this.schema.inputType) {
					case "date":
						dt = this.schema.format ? fecha.parse(value, this.schema.format) : new Date(value);
						return fecha.format(dt, "YYYY-MM-DD");
					case "datetime":
						dt = this.schema.format ? fecha.parse(value, this.schema.format) : new Date(value);
						return fecha.format(dt, "YYYY-MM-DD HH:mm:ss");
					case "datetime-local":
						dt = this.schema.format ? fecha.parse(value, this.schema.format) : new Date(value);
						return fecha.format(dt, "YYYY-MM-DDTHH:mm:ss");
				}
			}

			return value;
		},

		formatValueToModel(value) {
			if (value != null) {
				let m;
				switch (this.schema.inputType) {
					case "date":
						m = fecha.parse(value, "YYYY-MM-DD");
						if (m !== false) {
							if (this.schema.format)
								value = fecha.format(m, this.schema.format);
							else
								value = m.valueOf();
						}
						break;
					case "datetime":
						m = fecha.parse(value, "YYYY-MM-DD HH:mm:ss");
						if (m !== false) {
							if (this.schema.format)
								value = fecha.format(m, this.schema.format);
							else
								value = m.valueOf();
						}
						break;
					case "datetime-local":
						m = fecha.parse(value, "YYYY-MM-DDTHH:mm:ss");
						if (m !== false) {
							if (this.schema.format)
								value = fecha.format(m, this.schema.format);
							else
								value = m.valueOf();
						}
						break;
					case "number":
						return Number(value);
					case "range":
						return Number(value);
				}
			}

			return value;
		}
	}
};

</script>

<style scoped>
.field-input {
	width: 100%;
}
</style>
