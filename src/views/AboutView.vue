<!--
 * @Author: zlc
 * @Date: 2025-03-20 15:23:28
 * @LastEditTime: 2025-03-24 11:04:06
 * @LastEditors: zlc
 * @Description: 
 * @FilePath: \vue-components\vueAntComponents\src\views\AboutView.vue
-->
<template>
  <div class="about">
    <DrawRect>
      <div>
        <img :src="faceImage"/>
      </div>
    </DrawRect>
  </div>
</template>
<script lang="ts" setup>
import DrawRect from "../components/DrawRect/index.vue"
import faceImage from "@/assets/img/face.png"
</script>

<style>

</style>
