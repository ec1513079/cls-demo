<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">API Settings</h1>
          <div class="block">
            <p class="control">
              <label class="label">API Endpoint</label>
              <input class="input is-medium" type="text" :value="env.AZURE_FUNCTIONS_ENDPOINT" placeholder="Azure Functions Endpoint" readonly>
            </p>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">Account Settings</h1>
          <p class="control">
            <label class="label">Account Endpoint (FOR DEBUB)</label>
            <input class="input is-medium" type="text" :value="authMeUrl" placeholder="AUTH Me Endpoint" readonly>
          </p>
          <p class="control">
            <label class="label">Account</label>
          </p>
          <p class="control has-icon">
            <input class="input is-medium" type="text" v-model="authme.userName" placeholder="UserName" readonly>
            <span class="icon is-small">
              <i class="fa fa-user"></i>
            </span>
          </p>
          <p class="control">
            <label class="label">Access Token (FOR DEBUB)</label>
            <input class="input is-medium" type="text" v-model="authme.token" placeholder="Access Token" readonly>
          </p>
          <p class="control">
            <label class="label">Logout Endpoint (FOR DEBUB)</label>
            <input class="input is-medium" type="text" :value="logoutUrl" placeholder="Logout Endpoint" readonly>
          </p>
          <a class="button is-primary" @click="logout">
            <span class="icon">
              <i class="fa fa-sign-out"></i>
            </span>
            <span>Logout</span>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  data () {
    return {
      authMeUrl: '/.auth/me',
      logoutUrl: '/.auth/logout?post_logout_redirect_uri=/'
    }
  },

  computed: {
    ...mapGetters({
      pkginfo: 'pkg',
      env: 'env',
      authme: 'authme'
    })
  },

  methods: {
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

.input[type='text'][readonly], .input[type='email'][readonly] {
  background-color: whitesmoke
}
</style>
