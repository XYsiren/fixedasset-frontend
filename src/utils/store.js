// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  // 这里是 Vuex 的状态管理配置
  state() {
    return {
      username: ''  // 用来存储用户名
    };
  },
  mutations: {
    // 用来修改 state 中的数据
    setUsername(state, username) {
      state.username = username;
    }
  },
  actions: {
    // 异步操作（如果需要的话）
    async updateUsername({ commit }, username) {
      // 例如从后端获取数据
      commit('setUsername', username);
    }
  },
  getters: {
    // 获取用户名的 getter
    getUsername(state) {
      return state.username;
    }
  }
});

export default store;
