import Vue from 'vue'
import vueDebounce from 'vue-debounce'

import App from './App.vue'

import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup'],
  defaultTime: '700ms'
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
