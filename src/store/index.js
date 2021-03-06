import Vue from "vue";
import Vuex from "vuex";
import config from "../config";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import formModule from "./formModule";

Vue.use(Vuex);

const state = {
  count: 0,
}

export default new Vuex.Store({
  modules: {
    formModule
  },
  state,
  actions,
  mutations,
  getters,
  strict: process.env.NODE_ENV !== 'production'
});
