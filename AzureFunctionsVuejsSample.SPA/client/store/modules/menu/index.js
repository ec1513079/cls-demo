import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  expand: localStorage.getItem('menu-expand') === 'expand',
  items: [
    {
      name: 'ホーム',
      path: '/',
      meta: {
        icon: 'fa-home',
        link: 'Home.vue'
      },
      component: require('../../../views/Home')
    },
    {
      name: 'ApiTest',
      path: '/functions',
      meta: {
        description: 'テスト用のAPIを実行します',
        icon: 'fa-code',
        label: 'APIテスト',
        link: 'functions/index.vue'
      },
      component: lazyLoading('functions', true)
    },
    {
      name: 'Settings',
      path: '/settings',
      meta: {
        description: '各種設定値を保管します。',
        icon: 'fa-wrench',
        label: '設定',
        link: 'settings/index.vue'
      },
      component: lazyLoading('settings', true)
    }
  ]
}

const mutations = {
  [types.TOGGLE_MEMU] (state) {
    state.expand = !state.expand
    state.expand
      ? localStorage.setItem('menu-expand', 'expand')
      : localStorage.setItem('menu-expand', 'close')
  }
}

export default {
  state,
  mutations
}
