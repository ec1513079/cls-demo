<template>
  <div class="content has-text-centered">
    <p>
      <img width="200px" src="~assets/logo.svg" :alt="description">
    </p>

    <h1 class="is-title is-bold">{{ name.replace('-', ' ') }}</h1>

    <p>
      <strong>{{ description }}</strong>
    </p>

    <p>Version {{ pkginfo.version }}</p>

    <!-- <div>
      <button class="button is-info is-outlined is-medium" v-if="isAuthenticated" @click="logout">
        <span class="icon">
          <img src="~assets/wark-account.png" />
        </span>
        <span>{{userName}} からサインアウト</span>
      </button>
      <button class="button is-info is-outlined is-medium" v-else @click="login">
        <span class="icon">
          <img src="~assets/wark-account.png" />
        </span>
        <span>組織アカウントでサインイン</span>
      </button>
    </div> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      pkginfo: 'pkg'
    }),
    isAuthenticated () { return this.$store.getters['authme/isAuthenticated'] },
    userName () { return this.$store.getters['authme/userName'] }
  },

  data () {
    return this.$store.state.pkg
  },

  methods: {
    login () {
      window.location.href = this.$store.getters['authme/loginUrl']
    },

    logout () {
      this.$store.dispatch('authme/authLogout')
      window.location.href = this.$store.getters['authme/logoutUrl']
    }
  }
}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
