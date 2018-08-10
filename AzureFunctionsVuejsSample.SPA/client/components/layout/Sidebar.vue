<template>
  <aside class="menu app-sidebar animated"
    :class="{ slideInLeft: show, slideOutLeft: !show, expandOpne: menuExpand, expandClose: !menuExpand }">
    <p class="menu-label">
      <a @click="toggleMenu()">
        <span class="icon">
          <i class="fa fa-angle-left"></i>
        </span>
        <span class="menu-text">メニュー</span>
      </a>
    </p>
    <ul class="menu-list">
      <li v-for="(item, index) in menu" :key="index">
        <router-link :to="item.path" :exact="true" :title="item.meta.label || item.name"
          v-if="item.path">
          <span class="icon"><i :class="['fa', item.meta.icon]"></i></span>
          <span v-show="menuExpand">{{ item.meta.label || item.name }}</span>
        </router-link>
        <a :title="item.meta.label || item.name"
          v-else>
          <span class="icon"><i :class="['fa', item.meta.icon]"></i></span>
          <span class="menu-text">{{ item.meta.label || item.name }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
import Expanding from 'vue-bulma-expanding'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Expanding
  },

  props: {
    show: Boolean
  },

  data () {
    return {
      isReady: false
    }
  },

  mounted () {
    let route = this.$route
    if (route.name) {
      this.isReady = true
    }
  },

  computed: mapGetters({
    menu: 'menuitems',
    menuExpand: 'menuexpand'
  }),

  methods: {
    ...mapActions([
      'toggleMenu'
    ])
  },

  watch: {
    $route (route) {
      this.isReady = true
    }
  }

}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables';
@import '~bulma/sass/utilities/mixins';

.app-sidebar {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  padding: 20px 0 50px;
  width: 180px;
  min-width: 45px;
  max-height: 100vh;
  height: calc(100% - 50px);
  z-index: 1024 - 1;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  overflow-y: auto;
  overflow-x: hidden;

  @include mobile() {
    transform: translate3d(-180px, 0, 0);
  }

  &.expandClose {
    width: 45px;
    span.menu-text {
      display: none;
    }
    .menu-label span.icon i {
      transform: rotate(180deg);
    }
  }

  .icon {
    vertical-align: baseline;
    &.is-angle {
      position: absolute;
      right: 10px;
      transition: transform .377s ease;
    }
  }

  .menu-label {
    a {
      display: block;
      padding: 0.5em 0.75em;
      color: #4a4a4a;
      &:hover {
        background-color: whitesmoke;
        color: #00d1b2;
      }
    }
    span {
      margin-right: 4px;
      vertical-align: text-bottom;
      &[class="menu-text"] {
        font-size: 1rem;
      }
    }
  }

  .menu-list {
    li a {
      span {
        margin-right: 4px;
        vertical-align: text-bottom;
      }
    }
    li a + ul {
      margin: 0 10px 0 15px;
    }
  }

}
</style>
