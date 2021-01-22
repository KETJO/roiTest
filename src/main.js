import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify';

import router from "./router"
import store from './store'

Vue.config.productionTip = false

export const bus = new Vue();
export const auxBus = new Vue();

Vue.filter('splitByNum', function (val) {
  return val.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')