import Vue from 'vue'

export default {
  SET_FORM: (state, { form }) => {
    state.form = form;
  },
  RESET_FORM: (state, { }) => {
    state.form.formData = {};
  },
  UPDATE_FORM: (state, paramObject) => {
    state.form.formData[paramObject.key] = paramObject.value;
  },
}
