import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import * as filters from './util/filters';

let fieldComponents = {};
let componentNameArray = [];
let fields = require.context("./components/form-components/fields", false, /^\.\/lni-([\w-_]+)\.vue$/);

fields.keys().forEach((key) => {
  let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
  let component = fields(key);
  fieldComponents[compName] = component;
  componentNameArray.push(compName);
});

for (let component in fieldComponents) {
  Vue.component(component, fieldComponents[component]);
}

// Global Mixins
Vue.mixin({
  data: () => ({
    availableComponents: componentNameArray
  })
});


// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false;
store.dispatch('SET_FORM', {})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  template: "<App/>",
  components: { App }
});
