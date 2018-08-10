import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ApiMock from 'apimock'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import MessageNotification from 'plugins/MessageNotification/MessageNotification'
import 'plugins/MessageNotification/MessageNotification.scss'

// Vue.js router
Vue.router = router
sync(store, router)

// if having access token in localstorage, set axios default header
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
axios.defaults.headers.common['Cache-Control'] = 'no-cache,no-store,must-revalidate,max-age=-1,private'
// set axios-mock-adapter
if (ApiMock) { ApiMock(axios) }
// set vue-axios
Vue.use(VueAxios, axios)

// Vue.js plugins
Vue.use(NProgress)
Vue.use(MessageNotification)

// Enable devtools
Vue.config.devtools = true

// Side bar toggle
const { state } = store
router.beforeEach((route, redirect, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  next()
})

// Vue.js filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Create root object
const nprogress = new NProgress({ parent: '.nprogress-container' })
const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
