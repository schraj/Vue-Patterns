<template>
  <div class='panel-body'>
    <formGenerator :schema="schema" />
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
    schema: 'getSchema',
  }),
  components: {
    formGenerator
  }
}
</script>