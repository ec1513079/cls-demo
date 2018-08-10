import Axios from 'axios'

const envUrl = '/env.php'

const storageKey = 'global-env'
const decodeParse = (base64str) => {
  let envobj = {}
  try {
    envobj = JSON.parse(decodeURIComponent(escape(window.atob(base64str))) || '{}')
  } catch (err) { console.error(err) }
  return envobj
}
const initenv = (() => {
  const base64 = localStorage.getItem(storageKey) || ''
  return decodeParse(base64)
})()

const EnvModule = {
  namespaced: true,

  getters: {
    NODE_ENV: state => state.NODE_ENV,
    AZURE_FUNCTIONS_ENDPOINT: state => state.AZURE_FUNCTIONS_ENDPOINT
  },

  state () {
    return {
      NODE_ENV: process.env.NODE_ENV || '',
      AZURE_FUNCTIONS_ENDPOINT: initenv.AZURE_FUNCTIONS_ENDPOINT || process.env.AZURE_FUNCTIONS_ENDPOINT || ''
    }
  },

  mutations: {
    setEnv: (state, payload) => {
      const envval = decodeParse(payload)
      state.AZURE_FUNCTIONS_ENDPOINT = envval.AZURE_FUNCTIONS_ENDPOINT
    }
  },

  actions: {
    getEnv ({commit}) {
      return new Promise((resolve, reject) => {
        Axios(envUrl)
        .then(res => {
          localStorage.setItem(storageKey, res.data) // store enviroment json in localstorage
          commit('setEnv', res.data)
          resolve(res)
        })
        .catch(err => {
          localStorage.removeItem(storageKey) // if the request fails, remove enviroment json in localstorage
          reject(err)
        })
      })
    }
  }
}

export default EnvModule
