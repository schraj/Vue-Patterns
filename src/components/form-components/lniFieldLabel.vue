<template>
  <span class="field-label">
    {{ textLabel }}
  </span>
</template>

<script>
import Vue from 'vue';

export default {
  props: ['textLabel'],
}
</script>

<style scoped>
.field-label {
  color: red;
}
</style>