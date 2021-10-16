import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import { api } from "@/utils/api";
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './utils/store'
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
