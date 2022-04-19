
import { SET_IDENTITY, GET_IDENTITY } from "./mutations_type";

export const mutations = {
  [SET_IDENTITY](state, payload) {
    state.identity = payload;
  }
}