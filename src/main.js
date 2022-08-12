import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import App from "./App.vue";
import { api } from "@/utils/api";
import router from "./router";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import store from "./utils/store";
import VueTheMask from "vue-the-mask";
import VueGoogleCharts from "vue-google-charts";

Vue.use(VueTheMask);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueGoogleCharts);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.use({
  install(Vue) {
    Vue.prototype.$store = store;
  },
});
