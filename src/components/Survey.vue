<template>
  <div class='panel-body'>
    how many?
    {{schema}}
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      localDataId: 1,      
    }
  },
  computed: mapGetters({
    id: 'getId',
    schema: 'getSchema',
  }),
}
</script>