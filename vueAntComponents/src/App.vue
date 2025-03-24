<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import HelloWorld from './components/HelloWorld.vue';
  import TheWelcome from './components/TheWelcome.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
        <TheWelcome />
      </nav>
    </div>
  </header>

  <div class="router-view">
    <div class="two-view"> 
       <RouterView />
     </div>
  </div>
</template>

<style scoped>
  .wrapper {
    /*  */
    /* background: #e0e0e0; */
    height: 500px;
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  .router-view {
    background-color: #f5f5f5;
    padding: 5px;
    width: 100%;
  }
  .two-view{
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 5px;
  }
</style>
