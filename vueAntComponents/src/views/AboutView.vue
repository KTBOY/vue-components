<template>
  <div class="about">
    <DrawRect/>
  </div>
</template>
<script lang="ts" setup>
import DrawRect from "../components/DrawRect/index.vue"

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
