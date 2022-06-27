import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueCookies from 'vue-cookies'
import money from 'v-money'
import VueMask from 'v-mask'


Vue.use(money, {precision: 4});
Vue.use(VueMask);
// default options config: { expires: '1d', path: '/', domain: '', secure: '', sameSite: 'Lax' }
Vue.use(VueCookies, { expire: '7d'})

Vue.config.productionTip = false

var axios = require('axios').create({
  baseURL: process.env.NODE_ENV === "production" ? "http://localhost:8000" : "http://localhost:8000",

  withCredentials: false,
  headers: {
    'Authorization': `token ${VueCookies.get('token')}`,
  }
});


Vue.prototype.$axios = axios;

new Vue({
  vuetify,
  router,
  VueCookies,
  render: h => h(App),
}).$mount('#app')
