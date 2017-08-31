<template>
	<div class="wrapper" v-if="isVisible">
		name input
		<!-- <lni-input class="form-control" :id="getFieldID(schema)" :type="nodeSchema.inputType" :value="value" @input="onInput" @change="onChange" :disabled="disabled" :accept="nodeSchema.accept" :alt="nodeSchema.alt" :autocomplete="nodeSchema.autocomplete" :checked="nodeSchema.checked" :dirname="nodeSchema.dirname" :formaction="nodeSchema.formaction" :formenctype="nodeSchema.formenctype" :formmethod="nodeSchema.formmethod" :formnovalidate="nodeSchema.formnovalidate" :formtarget="nodeSchema.formtarget" :height="nodeSchema.height" :list="nodeSchema.list" :max="nodeSchema.max" :maxlength="nodeSchema.maxlength" :min="nodeSchema.min" :multiple="nodeSchema.multiple" :name="nodeSchema.inputName" :pattern="nodeSchema.pattern" :placeholder="nodeSchema.placeholder" :readonly="nodeSchema.readonly" :required="nodeSchema.required" :size="nodeSchema.size" :src="nodeSchema.src" :step="nodeSchema.step" :width="nodeSchema.width" :files="nodeSchema.files" /> -->
	</div>
</template>

<script>
import abstractField from "../abstractField";
import fecha from "fecha";

export default {
	mixins: [abstractField],
	methods: {
		onChange(event) {
			if (this.schema.inputType === "file") {
				this.value = event.target.files;
			}
		},

		onInput(event) {
			this.value = event.target.value;
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

