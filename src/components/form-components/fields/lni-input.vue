<template>
	<div class="wrapper" v-if="isVisible">
		<div :key="nodeSchema.attributes.id" class="form-group" :class="getFieldRowClasses(nodeSchema)">
			<label v-if="fieldTypeHasLabel(nodeSchema)" :for="getFieldId(nodeSchema)">{{ nodeSchema.attributes.label }}
				<span class="help" v-if="nodeSchema.attributes.help">
					<i class="icon"></i>
					<div class="helpText" v-html="nodeSchema.attributes.help"></div>
				</span>
			</label>
			<div class="field-wrap">
				<input class="form-control" :id="getFieldId(nodeSchema)" :type="nodeSchema.attributes.inputType" :value="value" @input="onInput" @change="onChange" :disabled="disabled" :accept="nodeSchema.attributes.accept" :alt="nodeSchema.attributes.alt" :checked="nodeSchema.attributes.checked" :dirname="nodeSchema.attributes.dirname" :formaction="nodeSchema.formaction" :formenctype="nodeSchema.attributes.formenctype" :formmethod="nodeSchema.attributes.formmethod" :formnovalidate="nodeSchema.attributes.formnovalidate" :formtarget="nodeSchema.attributes.formtarget" :height="nodeSchema.attributes.height" :list="nodeSchema.attributes.list" :max="nodeSchema.attributes.max" :maxlength="nodeSchema.attributes.maxlength" :min="nodeSchema.attributes.min" :multiple="nodeSchema.attributes.multiple" :name="nodeSchema.attributes.inputName" :pattern="nodeSchema.attributes.pattern" :placeholder="nodeSchema.attributes.placeholder" :readonly="nodeSchema.attributes.readonly" :required="nodeSchema.required" :size="nodeSchema.attributes.size" :src="nodeSchema.attributes.src" :step="nodeSchema.attributes.step" :width="nodeSchema.attributes.width" :files="nodeSchema.attributes.files" />
				<span class="helper" v-if="nodeSchema.attributes.inputType === 'color' || nodeSchema.attributes.inputType === 'range'">{{ value }}</span>
			</div>
			<div class="hint" v-if="nodeSchema.attributes.hint">{{ nodeSchema.attributes.hint }}</div>
			<!-- <div class="errors help-block" v-if="fieldErrors(nodeSchema).length>0">
												<span :key="index" v-for="(error, index) in fieldErrors(nodeSchema)" track-by="index">{{ error }}</span>
											</div> -->
		</div>
	</div>
</template>

<script>
import abstractField from "../abstractField";
import fecha from "fecha";

export default {
	mixins: [abstractField],
	methods: {
		onChange(event) {
			if (this.nodeSchema.attributes.inputType === "file") {
				this.value = event.target.files;
			}
		},

		onInput(event) {
			this.value = event.target.value;
		},

		formatValueToField(value) {
			if (value != null) {
				let dt;
				switch (this.nodeSchema.attributes.inputType) {
					case "date":
						dt = this.nodeSchema.attributes.format ? fecha.parse(value, this.nodeSchema.attributes.format) : new Date(value);
						return fecha.format(dt, "YYYY-MM-DD");
					case "datetime":
						dt = this.nodeSchema.attributes.format ? fecha.parse(value, this.nodeSchema.attributes.format) : new Date(value);
						return fecha.format(dt, "YYYY-MM-DD HH:mm:ss");
					case "datetime-local":
						dt = this.nodeSchema.attributes.format ? fecha.parse(value, this.nodeSchema.attributes.format) : new Date(value);
						return fecha.format(dt, "YYYY-MM-DDTHH:mm:ss");
				}
			}

			return value;
		},

		formatValueToModel(value) {
			if (value != null) {
				let m;
				switch (this.nodeSchema.attributes.inputType) {
					case "date":
						m = fecha.parse(value, "YYYY-MM-DD");
						if (m !== false) {
							if (this.nodeSchema.attributes.format)
								value = fecha.format(m, this.nodeSchema.attributes.format);
							else
								value = m.valueOf();
						}
						break;
					case "datetime":
						m = fecha.parse(value, "YYYY-MM-DD HH:mm:ss");
						if (m !== false) {
							if (this.nodeSchema.attributes.format)
								value = fecha.format(m, this.nodeSchema.attributes.format);
							else
								value = m.valueOf();
						}
						break;
					case "datetime-local":
						m = fecha.parse(value, "YYYY-MM-DDTHH:mm:ss");
						if (m !== false) {
							if (this.nodeSchema.attributes.format)
								value = fecha.format(m, this.nodeSchema.attributes.format);
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

