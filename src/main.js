import Vue from 'vue'
import App from './App.vue'

import VueCalendar from '../lib/index'

Vue.config.productionTip = false

Vue.use(VueCalendar)

new Vue({
  render: h => h(App),
}).$mount('#app')
