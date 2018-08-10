<template>
  <nav class="level app-levelbar">
    <div class="level-left">
      <div class="level-item">
        <h3 class="subtitle is-5">
          <strong>{{ name }}</strong>
        </h3>
      </div>
    </div>
    <div class="level-left">
      <div class="level-item">
        <p class="page-description">{{ description }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  components: { },

  computed: {
    name () {
      return this.$route.meta.label
    },
    description () {
      return this.$route.meta.description
    }
  }
}
</script>

<style lang="scss" scoped>
nav.level {
  display: block;

  strong {
    font-weight: bold;
  }
}
</style>
