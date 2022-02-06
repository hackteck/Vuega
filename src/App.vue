<template>
  <div class="root">
    <AppRouter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppRouter from "@/plugins/router/router.vue"

export default defineComponent({
  components: {
    AppRouter
  }
})
</script>

<style lang="scss" scoped>
</style>