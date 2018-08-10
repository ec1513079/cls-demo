<template>
  <div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">テスト API 一覧</h1>
        <div class="columns is-multiline is-mobile">
          <div class="column is-half is-offset-one-quarter">
            <button class="button is-primary has-text-centered"
              :class="{'is-loading': this.apiStatus.running}"
              @click="execApi('/sample')">
              <span>sample-http-getを実行</span>
            </button>
          </div>
        </div>
        <p class="control"
          :class="{'is-loading': this.apiStatus.running}">
          <textarea class="textarea"
            :class="{'is-danger': this.apiStatus.hasError}"
            :style="{'background-color': this.apiStatus.hasError ? 'pink' : 'unset'}"
            placeholder="Response Result"
            v-model="apiStatus.response"></textarea>
        </p>
      </article>
    </div>
  </div>
</template>

<script>
import UrlJoin from 'url-join'

export default {
  components: {
  },

  data () {
    return {
      pkginfo: this.$store.state.pkg,
      apiStatus: {
        response: null,
        running: false,
        hasError: false
      }
    }
  },

  methods: {
    execApi (apiName) {
      this.apiStatus = {
        response: null,
        running: true,
        hasError: false
      }

      this.$http({
        url: UrlJoin(this.$store.getters.env.AZURE_FUNCTIONS_ENDPOINT, apiName)
      }).then((data) => {
        console.log(data)
        this.apiStatus = {
          response: JSON.stringify(data, null, 2),
          running: false,
          hasError: false
        }
        this.$message.info(apiName + ' 実行成功', 'API "' + apiName + '" が正常に実行されました。')
      }).catch((error) => {
        console.log(error)
        this.apiStatus = {
          response: JSON.stringify(error, null, 2),
          running: false,
          hasError: true
        }
        this.$message.error(apiName + ' 実行失敗', 'API "' + apiName + '" の実行に失敗しました。')
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}

.button {
  width: 100%;
}
</style>
