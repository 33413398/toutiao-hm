import { createStore } from "vuex";
import { getItem, setItem } from "../utils/storage";
export default createStore({
  state: {
    user: getItem("TOUTIAO_USER") || null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      setItem("TOUTIAO_USER", user);
    }
  },
  actions: {},
  modules: {}
});
