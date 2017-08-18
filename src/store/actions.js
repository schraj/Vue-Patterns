import { getSchema } from "../api";
import config from '../config'

export default {
  GET_SCHEMA: ({ commit, dispatch, state }, { }) => {
    return getSchema(config.appId)
      .then(schema => commit("SET_SCHEMA", { schema }));
  },
};
