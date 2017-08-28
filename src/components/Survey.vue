<template>
  <div class='panel-body'>
    how many?
    
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
     model: {             
      id: 1,
      name: "John Doe",
      password: "J0hnD03!x4",
      skills: ["Javascript", "VueJS"],
      email: "john.doe@gmail.com",
      status: true
    },

    formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
    }
   }
  },
  computed: mapGetters({
    id: 'getId',
    schema: 'getSchema',
  }),
}
</script>