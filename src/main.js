import Vue from 'vue'
import App from './App.vue'
import store from './store'
export const eventsBus = new Vue();
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
