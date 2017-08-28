<template>
  <div class='panel-body'>
    <lniFieldInput :key="item.id" :textLabel="item.label" v-for="item in children" />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'
import lniFieldInput from './form-components/lniFieldInput'
import lniFieldLabel from './form-components/lniFieldLabel'

export default {
  data() {
    return {
      children: [
        {
          textInput: {
            id: 2,
            label: "test label2"
          }
        },
        {
          textInput: {
            id: 3,
            label: "test label3"
          }
        }
      ],
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
    lniFieldInput,
    lniFieldLabel
  }
}
</script>