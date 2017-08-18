<template>
  <div class='panel-body'>
    <input type="checkbox" v-model="value" :autocomplete="schema.autocomplete" :disabled="disabled" :name="schema.inputName" />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      value: false,
      disabled: false,
      schema: {
        autocomplete: false,
        inputName: "test input name"
      },
      model: {
        id: 1,
        name: 'John Doe',
        password: 'J0hnD03!x4',
        skills: ['Javascript', 'VueJS'],
        email: 'john.doe@gmail.com',
        status: true,
      },
    }
  },
  computed: mapGetters({
    id: 'getId'
  }),
}
</script>