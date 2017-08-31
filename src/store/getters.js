export default {
  getId(state) {
    const { id } = state

    return id;
  },
  getFormStore: (state) => {
    return state.form;
  },
}
