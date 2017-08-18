export default {
  getId(state) {
    const { id } = state

    return id;
  },
  getSchema(state) {
    return state.schema;
  }
}
