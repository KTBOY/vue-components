<!--
 * @Author: zlc
 * @Date: 2025-03-20 15:23:28
 * @LastEditTime: 2025-04-01 11:33:33
 * @LastEditors: zlc
 * @Description: 
 * @FilePath: \vueAntComponents\src\views\AboutView.vue
-->
<template>
  {{ modalState.width }} * {{ modalState.height }}
  <div class="about">
    <DrawRect ref="drawRef" :width="modalState.width" :height="modalState.height">
      <img :src="faceImage" class="face-image" :style="{ width: `${modalState.width}px`, height: `${modalState.height}px` }" />
    </DrawRect>

    <div class="draw-rect_btn">
      <a-button type="primary" @click="handleClickInit">还原</a-button>
      <a-button @click="handlDrawSize">800*700</a-button>
    </div>
 
  </div>
</template>
<script lang="ts" setup>
  import { nextTick, reactive, ref } from 'vue';

  import faceImage from '@/assets/img/face.png';

  const drawRef = ref();
  const modalState = reactive({
    width: 600,
    height: 300,
  });

  const handlDrawSize = async () => {
    const fullScrollbarModal = {
      width: 500,
      height: 500,
    };
    const widthScale = fullScrollbarModal.width / modalState.width;
    const heightScale = fullScrollbarModal.height / modalState.height;
    modalState.height = fullScrollbarModal.height;
    modalState.width = fullScrollbarModal.width;
    let originalCoordinates = drawRef.value.getPersonArr();
    const adjustedCoordinates = originalCoordinates.map((coord: { x: number; y: number }) => ({
      x: parseFloat((coord.x * widthScale).toFixed(2)),
      y: parseFloat((coord.y * heightScale).toFixed(2)),
    }));
    drawRef.value.clearView();
    drawRef.value.initCanvas();
    await nextTick();
    drawRef.value.setPersonArr(adjustedCoordinates);
    originalCoordinates = drawRef.value.getPersonArr();
  };
  const handleClickInit = () => {
    modalState.width = 600;
    modalState.height = 300;
    drawRef.value.clearView();

    drawRef.value.initCanvas();
  };
</script>

<style lang="scss" scoped>
  .about {
    width: 900px;
    height: 900px;
    display: flex;
    justify-content: space-between;
  }

  .draw-rect_btn {
    height: 100%;
    width: 200px;
    display: flex;
    justify-content: space-around;
  }
  .face-image {
    width: 600px;
    height: 300px;
    transition: all 0.3s;
  }
</style>
