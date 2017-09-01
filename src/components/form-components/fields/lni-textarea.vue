<template>
	<input type="textarea" class="form-control" v-model="value" :id="getFieldId(nodeSchema)" :disabled="disabled" :maxlength="nodeSchema.max" :minlength="nodeSchema.min" :placeholder="nodeSchema.placeholder" :readonly="nodeSchema.readonly" :rows="nodeSchema.rows || 2" :name="nodeSchema.inputName" />
</template>

<script>
import abstractField from "../abstractField";

export default {
	mixins: [abstractField]
};

</script>
