import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import vueDebounce from 'vue-debounce'

import App from './App.vue'

// Base components
import Dashboard from './components/Dashboard.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

// User components
import Profile from './components/Profile.vue'

// Weapons components
import Weapons from './components/Weapons.vue'
import Weapon from './components/Weapon.vue'

// Attachments

// 404 
import Error404 from './components/Error404.vue'

// Helpers 
import apiHelper from './helpers/api-helper.js'
import authHeader from './helpers/auth-header.js'

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {title: 'Home'}
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/weapons',
      name: 'weapons',
      component: Weapons,
      query: { page: 1, limit: 10, search: ""}
    },
    {
      path: '/weapon/:name',
      name: 'weapon',
      component: Weapon
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '*',
      name: "error404",
      component: Error404
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['login', 'register', 'home', 'weapons', 'weapon'];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = JSON.parse(localStorage.getItem('auth_data'));

  const user = JSON.parse(localStorage.getItem('user'))

  let isAdmin = false;

  // trying to access a restricted page
  if (authRequired) {
    
    if(!loggedIn) {
      next('/login');
    }
    else
    {
      isAdmin = user.role == 'admin';
      if (to.path.indexOf('admin') > -1 && !isAdmin)
      {
        next('/');
      }
      else {
        next();
      } 
    }
  } 
  else 
  {
    next();
  }
});

Vue.use(VueRouter)

Vue.use(Vuex)

const authData = JSON.parse(localStorage.getItem('auth_data'));
const initialStateIsAuthenticated = authData ? true : false;

const store = new Vuex.Store({
  state: {
    isAuthenticated: initialStateIsAuthenticated,
    user: {
      'email' : null,
      'role' : null
    }
  },
  mutations: {
    checkIsAuthenticated (state) {
      let authData = JSON.parse(localStorage.getItem('auth_data'));

      // Check if token is valid

      state.isAuthenticated = authData ? true : false;
    },
    getUserDetails(state) {

      let requestOptions = {
        method: "GET",
        headers: authHeader.getAuthHeader()
      };

      fetch(apiHelper.base + "/user/profile", requestOptions)
        .then(response => { 
            if(response.ok){
                return response.json()    
            } else 
            {
              console.log("response not ok")
            }             
        })
        .then(response => {
            let data = response.data

            let user = {
              "email" : data.email,
              "role" : data.role
            }

            localStorage.setItem('user', JSON.stringify(user))

            state.user = user;
        })
        .catch(err => {
            console.log(err);
        });
    }
  }
})

Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup'],
  defaultTime: '700ms'
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
