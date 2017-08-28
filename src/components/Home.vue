<template>
  <div class='panel-body'>
    This is the survey. Click above
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: mapGetters({
    id: 'getId'
  }),
}
</script>