import Vue from 'vue'
import Vuex from 'vuex'

import authHeader from './helpers/auth-header.js'
import apiHelper from './helpers/api-helper.js'

Vue.use(Vuex)

const authData = JSON.parse(localStorage.getItem('auth_data'));
const initialStateIsAuthenticated = authData ? true : false;

const initialStateUser = JSON.parse(localStorage.getItem('user'));

const store = new Vuex.Store({
  state: {
    isAuthenticated: initialStateIsAuthenticated,
    user: initialStateUser
  },
  mutations: {
    checkIsAuthenticated (state) {
      const authData = JSON.parse(localStorage.getItem('auth_data'));

      state.isAuthenticated = authData ? true : false;
    },
    setUser(state) {
      const user = JSON.parse(localStorage.getItem('user'));
      state.user = user; 
    },
    getUserDetails() {

      // Check if token needs refresh
      apiHelper.refreshToken();

      const requestOptions = {
        method: "GET",
        headers: authHeader.getAuthHeader()
      };

      fetch(apiHelper.getEndpoint("user/profile"), requestOptions)
      .then(response => { 
          if(response.ok){
              return response.json()    
          } else 
          {
            // user should be logout
            localStorage.removeItem("auth_data");
            this.commit('checkIsAuthenticated');
            console.log("response not ok")
          }             
      })
      .then(response => {
          let data = response.data

          let user = {
            "id" : data._id,
            "email" : data.email,
            "role" : data.role
          }

          localStorage.setItem('user', JSON.stringify(user))
          this.commit('setUser');
      })
      .catch(err => {
          console.log(err);
      });
    }
  }
})

export default store