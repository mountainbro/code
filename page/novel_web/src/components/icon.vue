

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  id:String
})
</script>
<template>
  <svg class="icon">
    <use :href="'#icon-'+id"></use>
  </svg>
</template>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: var(--text-color);
}
.icon:hover{
  color: var(--text-color-dark);
  cursor: pointer;
}
</style>
