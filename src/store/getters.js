export default {
  getId(state) {
    const { id } = state

    return id;
  },
  getFormStore: (state) => {
    return state.form;
  },

  // form action getter functions
  nameIsVisible: (state) => {
    return state.form.model.nameVisible;
  }
}
