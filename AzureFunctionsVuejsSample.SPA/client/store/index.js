import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import menu from './modules/menu'
import authme from './modules/authme'
import env from './modules/env'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules: {
    app,
    menu,
    authme,
    env
  },
  state: {
    pkg
  },
  mutations: {
  }
})

export default store
