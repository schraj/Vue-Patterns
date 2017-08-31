<template>
	<div class="wrapper" v-if="isVisible">
		<div :key="schema.attributes.id" class="form-group" :class="getFieldRowClasses(schema)">
			<label v-if="fieldTypeHasLabel(schema)" :for="getFieldID(schema)">{{ schema.attributes.label }}
				<span class="help" v-if="schema.attributes.help">
					<i class="icon"></i>
					<div class="helpText" v-html="schema.attributes.help"></div>
				</span>
			</label>
			<div class="field-wrap">
				<input class="form-control" :id="getFieldID(schema)" :type="schema.attributes.inputType" :value="value" @input="onInput" @change="onChange" :disabled="disabled" :accept="schema.attributes.accept" :alt="schema.attributes.alt" :checked="schema.attributes.checked" :dirname="schema.attributes.dirname" :formaction="schema.formaction" :formenctype="schema.attributes.formenctype" :formmethod="schema.attributes.formmethod" :formnovalidate="schema.attributes.formnovalidate" :formtarget="schema.attributes.formtarget" :height="schema.attributes.height" :list="schema.attributes.list" :max="schema.attributes.max" :maxlength="schema.attributes.maxlength" :min="schema.attributes.min" :multiple="schema.attributes.multiple" :name="schema.attributes.inputName" :pattern="schema.attributes.pattern" :placeholder="schema.attributes.placeholder" :readonly="schema.attributes.readonly" :required="schema.required" :size="schema.attributes.size" :src="schema.attributes.src" :step="schema.attributes.step" :width="schema.attributes.width" :files="schema.attributes.files" />
				<span class="helper" v-if="schema.attributes.inputType === 'color' || schema.attributes.inputType === 'range'">{{ value }}</span>
			</div>
			<div class="hint" v-if="schema.attributes.hint">{{ schema.attributes.hint }}</div>
			<!-- <div class="errors help-block" v-if="fieldErrors(schema).length>0">
						<span :key="index" v-for="(error, index) in fieldErrors(schema)" track-by="index">{{ error }}</span>
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

