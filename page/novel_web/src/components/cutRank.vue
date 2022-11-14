<script setup lang="ts">
import { defineProps } from 'vue';
const rank = defineProps({
  data:Object
})
</script>

<template>
<div class="rank">
  <div class="title">
    {{'起点月票榜'}}
  </div>
  <div class="bookRank">
    <div class="rankItem">

    </div>
  </div>
  <div class="viewAll">查看全部</div>
</div>
</template>
<style scoped>

</style>
