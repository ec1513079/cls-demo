/*
Azure App Serviceの"Authentication and Authorization"を利用してAPIへのアクセストークンを取得する
"Authentication and Authorization"の使い方は下記を参照すること

チュートリアル: Azure App Service でユーザーをエンド ツー エンドで認証および承認する
 https://docs.microsoft.com/ja-jp/azure/app-service/app-service-web-tutorial-auth-aad

Azure App Service での認証および承認
 https://docs.microsoft.com/ja-jp/azure/app-service/app-service-authentication-overview

Authentication Best Practices for Vue
 https://blog.sqreen.io/authentication-best-practices-vue/
*/

import Axios from 'axios'
import JsonPath from 'jsonpath'

const authMeUrl = '/.auth/me'
const loginUrl = '/.auth/login/aad?post_login_redirect_uri=%2F'
const logoutUrl = '/.auth/logout?post_logout_redirect_uri=%2F'

const AuthMeModule = {
  namespaced: true,

  getters: {
    loginUrl: () => loginUrl,
    logoutUrl: () => logoutUrl,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    userName: state => state.userName
  },

  state () {
    return {
      token: localStorage.getItem('user-token') || '',
      status: '',
      userName: localStorage.getItem('user-name') || ''
    }
  },

  mutations: {
    authRequest: (state) => {
      state.status = 'loading'
      state.token = state.userName = ''
    },
    authSuccess: (state, { token, userName }) => {
      state.status = 'success'
      state.token = token
      state.userName = userName
    },
    authError: (state) => {
      state.status = 'error'
      state.token = state.userName = ''
    },
    authLogout: (state) => {
      state.status = ''
      state.token = state.userName = ''
    }
  },

  actions: {
    authRequest ({commit, dispatch}) {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit('authRequest')
        Axios(authMeUrl, {
          headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' }
        })
        .then(res => {
          const token = JsonPath.query(res.data, '$[0].access_token')
          const userName = JsonPath.query(res.data, '$[0].user_id')[0]
          localStorage.setItem('user-token', token) // store the token in localstorage
          localStorage.setItem('user-name', userName) // store the upn in localstorage
          Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token // add axios defaults header
          commit('authSuccess', {token, userName})
          resolve(res)
        })
        .catch(err => {
          commit('authError', err)
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
          localStorage.removeItem('user-name')
          reject(err)
        })
      })
    },

    authLogout ({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('authLogout')
        localStorage.removeItem('user-token') // clear your user's token from localstorage
        localStorage.removeItem('user-name') // clear your user's upn from localstorage
        delete Axios.defaults.headers.common['Authorization'] // remove the axios default header
        resolve()
      })
    }
  }
}

export default AuthMeModule
