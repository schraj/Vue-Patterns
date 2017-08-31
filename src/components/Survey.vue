<template>
  <div class='panel-body'>
    <formGenerator :schema="formStore.schema" :formData="formStore.formData" />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import formGenerator from './form-components/formGenerator';

export default {
  data() {
    return {
    }
  },
  computed: mapGetters({
    formStore: 'getFormStore',
  }),
  components: {
    formGenerator
  }
}
</script>