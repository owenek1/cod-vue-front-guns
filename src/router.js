import Vue from 'vue'
import VueRouter from 'vue-router'

// Admin components 
import Dashboard from './components/Dashboard.vue'
import DashboardOverview from './components/dashboard/Overview.vue'
import DashboardReports from './components/dashboard/Reports.vue'

import DashboardNightbots from './components/dashboard/Nightbots.vue'
import DashboardNightbotsList from './components/dashboard/NightbotsList.vue'

import DashboardWeapons from './components/dashboard/Weapons.vue'
import DashboardWeaponsList from './components/dashboard/WeaponsList.vue'

// Base components
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

// User components
import Profile from './components/Profile.vue'
import Nightbot from './components/Nightbot.vue'

import UserWeaponBuilds from './components/UserWeaponBuilds.vue'
import UserWeaponBuildsList from './components/UserWeaponBuildsList.vue'
import UserWeaponBuildNew from './components/UserWeaponBuildNew.vue'

// Weapons components
import Weapons from './components/Weapons.vue'
import Weapon from './components/Weapon.vue'

import WeaponBuildsList from './components/WeaponBuildsList.vue'

// Attachments

// 404 
import Error404 from './components/Error404.vue'

// Helpers 
import apiHelper from './helpers/api-helper.js'
import store from './store.js';

Vue.use(VueRouter)

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
      path: '/weaponbuilds',
      name: 'weaponBuildList',
      component: WeaponBuildsList,
      query: { page: 1, limit: 10, search: ""}
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/user/nightbot',
      name: 'nightbot',
      component: Nightbot,
    },
    {
      path: '/user/weaponbuilds',
      component: UserWeaponBuilds,
      children: [
        {
          path: '',
          name: 'userWeaponBuildsList',
          component: UserWeaponBuildsList,
          query: { page: 1, limit: 10, search: ""}
        },
        {
          path: 'new',
          name: 'userWeaponBuildNew',
          component: UserWeaponBuildNew
        }
      ]
    },
    {
      path: '/admin/dashboard',
      component: Dashboard,
      children: [
        {
          path : '',
          name: 'dashboard',
          component: DashboardOverview
        },
        {
          path : 'reports',
          name: 'dashboardReports',
          component: DashboardReports
        },
        {
          path: 'nightbots',
          component: DashboardNightbots,
          children: [
            {
              path: 'list',
              name: 'nightbotslist',
              component: DashboardNightbotsList
            }
          ]
        },
        {
          path: 'weapons',
          component: DashboardWeapons,
          children: [
            {
              path: 'list',
              name: 'weaponslist',
              component: DashboardWeaponsList,
              uery: { page: 1, limit: 10, search: "", type: ""}
            }
          ]
        }
      ]
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

  console.log("Before each");

  let isAdmin = false;

  // trying to access a restricted page
  if (authRequired) {
    
    if(!loggedIn) {
      next('/login');
    }
    else
    {
      // Check if token needs refresh
      apiHelper.refreshToken();
      
      store.commit('getUserDetails');

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

export default router;
