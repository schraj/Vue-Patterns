import { getForm, submitForm } from "../api";
import config from '../config'

export default {
  SET_FORM: ({ commit, dispatch, state }, { }) => {
    return getForm(config.appId)
      .then(form => commit("SET_FORM", { form }));
  },
  SUBMIT: ({ commit, dispatch, state }, { }) => {
    return submitForm(config.appId)
      .then(result => commit("RESET_FORM", {}));
  },
};
