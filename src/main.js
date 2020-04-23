import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import axios from "axios";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.config.productionTip = false

const token = localStorage.getItem('token');

if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token
}

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
