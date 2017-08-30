import Vue from "vue";
import Vuex from "vuex";
import config from "../config";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

const state = {
  appId: config.appId,
  form: {},
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});
