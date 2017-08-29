export default {
  getId(state) {
    const { id } = state

    return id;
  },
  getSchema(state) {
    if (state.schema && state.schema.formObject) {
      return state.schema.formObject.children;
    }
    else {
      return [];
    }
  }
}
