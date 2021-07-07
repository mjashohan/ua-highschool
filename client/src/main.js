// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {sync} from 'vuex-router-sync'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Login from './components/Login'
import store from './store/store'
import Axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
//Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuetify)
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
