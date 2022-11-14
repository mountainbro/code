<script setup lang="ts">
import { useRouter, RouterView } from 'vue-router'
import Head from '@/components/head.vue'
import {useThemeStore} from '@/stores/theme'
const theme = useThemeStore()
</script>

<template>
  <div id="layout" :class="theme.mode">
    <Head></Head>
    <RouterView />
  </div>
</template>

<style scoped>
#layout {
  background-color: var(--bg-color);
  color:var(--text-color);
  min-height: 100vh;
  max-width: 1350px;
  margin: 0 auto;
}
</style>
