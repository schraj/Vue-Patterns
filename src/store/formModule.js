import Vue from "vue";
import { getForm, submitForm } from "../api";
import config from '../config'

export default {
  state: {
    form: {},
  },
  mutations: {
    SET_FORM: (state, { form }) => {
      state.form = form;
    },
    RESET_FORM: (state, { }) => {
      state.form.formData = {};
    },
    UPDATE_FORM: (state, paramObject) => {
      state.form.formData[paramObject.key] = paramObject.value;
    },
  },
  getters: {
    getFormStore: (state) => {
      return state.form;
    },
  },
  actions: {
    SET_FORM: ({ commit, dispatch, state }, { }) => {
      return getForm(config.appId)
        .then(form => commit("SET_FORM", { form }));
    },
    SUBMIT_FORM: ({ commit, dispatch, state }, { }) => {
      return submitForm(config.appId)
        .then(result => commit("RESET_FORM", {}));
    }
  }
}
