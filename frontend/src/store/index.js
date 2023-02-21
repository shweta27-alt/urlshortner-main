import { createStore } from 'vuex';
import apiService from "../services/api.services";

export default createStore({
  state: {
    userData: {
      isLoggedInUser: false,
      user: null
    },
  },
  getters: {
  },
  mutations: {
    updateUserData(state, payload) {
      state.userData = payload
      
    }
  },
  actions: {
    async getUserData({ commit }) {
      let responseUser;
      try {
        let response = await apiService.usersession();
        responseUser = { user: response.data.user, isLoggedInUser: true }
        commit('updateUserData', responseUser);
    
      }
      catch (err) {
        responseUser = { user: null, isLoggedInUser: false }
        commit('updateUserData', responseUser);
      }
      return responseUser
    }
  },
  modules: {
  }
})