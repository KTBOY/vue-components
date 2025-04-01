/*
 * @Author: zlc
 * @Date: 2025-03-20 15:23:28
 * @LastEditTime: 2025-04-01 14:42:52
 * @LastEditors: zlc
 * @Description: 
 * @FilePath: \vueAntComponents\src\main.js
 */
import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue'
import 'ant-design-vue/dist/reset.css';

// 打包之前测试
// import DrawRect from './DrawRect/index.vue';

// 打包之后测试

import DrawRect from "../dist/draw-rect.es.js";
import router from './router/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(DrawRect)

app.mount('#app')
