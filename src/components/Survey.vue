<template>
  <div class='panel-body'>
    <lniFieldInput :key="item.id" :schema="item" v-for="item in schema" />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'
import lniFieldInput from './form-components/lniFieldInput'

export default {
  data() {
    return {
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      }
    }
  },
  computed: mapGetters({
    schema: 'getSchema',
  }),
  components: {
    lniFieldInput
  }
}
</script>