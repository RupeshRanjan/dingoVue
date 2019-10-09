import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import router from './routes'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.use(VueRouter,axios);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$axios = axios

