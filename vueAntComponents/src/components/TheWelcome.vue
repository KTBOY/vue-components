<!--
 * @Author: zlc
 * @Date: 2025-03-20 15:23:28
 * @LastEditTime: 2025-03-27 16:26:22
 * @LastEditors: zlc
 * @Description: 
 * @FilePath: \vueAntComponents\src\components\TheWelcome.vue
-->
<template>
  <div class="menu">
    <div class="box" v-for="item in routerMenu" :key="item.path" @click="handlerPageRouter(item)">
      <span></span>
      <div class="content">
        <h2>{{ item.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router';
  import { computed, onMounted } from 'vue';
  import { ref } from 'vue';
  import routerList from '../router/index';

  const routerMenu = computed(() => {
    return routerList.options.routes;
  });



  //组件入口
  const handlerPageRouter = (routerItem: { path: string; }) => {
    console.log(routerItem);
    
    router.push({
      path: routerItem.path,
    });
  };
 
</script>

<style lang="scss" scoped>
.menu{
  display: flex;
  
}
  .box {
    position: relative;
    width: 150px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    z-index: 1;
  }

  .box::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 38px;
    width: 50%;
    height: 100%;
    text-decoration: none;
    background: #fff;
    border-radius: 8px;
    transform: skewX(15deg);
    transition: 0.5s;
  }

  .box::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50;
    width: 50%;
    height: 100%;
    background: #fff;
    border-radius: 8px;
    transform: skewX(15deg);
    transition: 0.5s;
    filter: blur(30px);
  }

  .box:hover:before,
  .box:hover:after {
    transform: skewX(0deg) scaleX(1.3);
  }

  .box:before,
  .box:after {
    background: linear-gradient(315deg, #ffbc00, #ff0058);
  }

  .box span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    pointer-events: none;
  }

  /* .box span::before {
 content: '';
 position: absolute;
 top: 0;
 left: 0;
 width: 0;
 height: 0;
 border-radius: 8px;
 background: rgba(255, 255, 255, 0.1);
 backdrop-filter: blur(10px);
 opacity: 0;
 transition: 0.1s;
 animation: animate 2s ease-in-out infinite;
 box-shadow: 0 5px 15px rgba(0,0,0,0.08)
} */

  .box span::before {
    top: -40px;
    left: 40px;
    width: 50px;
    height: 50px;
    opacity: 1;
  }

  /* .box span::after {
 content: '';
 position: absolute;
 bottom: 0;
 right: 0;
 width: 100%;
 height: 100%;
 border-radius: 8px;
 background: rgba(255, 255, 255, 0.1);
 backdrop-filter: blur(10px);
 opacity: 0;
 transition: 0.5s;
 box-shadow: 0 5px 15px rgba(0,0,0,0.08);
 animation-delay: -1s;
} */

  .box span:after {
    bottom: -40px;
    right: 40px;
    width: 50px;
    height: 50px;
    opacity: 1;
  }

  .box .content {
    position: relative;
    width: 100px;
    height: 100px;
    padding: 20px 40px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1;
    transform: 0.5s;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box .content h2 {
    font-size: 20px;
    color: #fff;
    margin-bottom: 10px;
    white-space: nowrap;
  }
</style>
