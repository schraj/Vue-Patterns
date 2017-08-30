import Vue from 'vue'

export default {
  SET_FORM: (state, { form }) => {
    state.form = form;
  },
  RESET_FORM: (state, { }) => {
    state.form.model = {};
  },
  UPDATE_FORM: (state, paramObject) => {
    state.form.model[paramObject.key] = paramObject.value;
  },
}
