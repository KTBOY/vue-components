<!--
 * @Author: zlc
 * @Date: 2025-03-20 16:21:55
 * @LastEditTime: 2025-03-27 18:27:22
 * @LastEditors: zlc
 * @Description: 
 * @FilePath: \vueAntComponents\src\components\DrawRect\index.vue
-->

<template>
 
  <div id="divCanvas">
    <slot></slot>
    <canvas id="graphCanvas"></canvas>
    <canvas id="personCanvas"></canvas>
    <canvas id="pointCanvas" @click="canOnClick" @mousemove="canOnMouseMove" @mouseup="canOnMouseUp" @mousedown="canOnMouseDown"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, useAttrs,nextTick } from 'vue';
  // 明确 pointArr 的类型
  interface Point {
    x: number;
    y: number;
  }

  const attrs = useAttrs();

  //画布宽高
  const canvasWidth = ref(800);
  const canvasHeight = ref(600);
  //点的范围
  const pointRange = ref(10);
  //拖动点的范围
  const pointRangeDrag = ref(50);
  // 线条颜色
  const colorVal = ref('rgba(255,0,0,1)');
  // 填充颜色
  const colorValA = ref('rgba(255,0,0,.5)');
  // 坐标文字颜色
  const colorValPoint = ref('rgba(0,255,0,1)');
  // 线条粗细,画笔大小
  const lineWidthVal = ref(4);
  // 点的坐标数组
  const pointArr = ref<Point[]>([]);
  //人的坐标数组
  const personArr = ref([0.13, 24, 15, 23]);
  const isMouseDown = ref(false); //
  const isMouseUp = ref(false);
  const isMouseMove = ref(false);
  const isDrag = ref(false);
  //拖动的点
  const dragPosition = ref(-1);

  let canGraph: HTMLCanvasElement;
  let ctxGragh: CanvasRenderingContext2D;
  let canPoint: HTMLCanvasElement;
  let ctxPoint: CanvasRenderingContext2D;
  let canPerson: HTMLCanvasElement;
  let ctxPerson: CanvasRenderingContext2D;
  // 初始化画布
  const initCanvas = async () => {
    canGraph = document.getElementById('graphCanvas') as HTMLCanvasElement;
    ctxGragh = canGraph.getContext('2d') as CanvasRenderingContext2D;
    canPoint = document.getElementById('pointCanvas') as HTMLCanvasElement;
    ctxPoint = canPoint.getContext('2d') as CanvasRenderingContext2D;
    canPerson = document.getElementById('personCanvas') as HTMLCanvasElement;
    ctxPerson = canPerson.getContext('2d') as CanvasRenderingContext2D;
    await nextTick();
    console.log(attrs);
    
    if (attrs.width != undefined) {
      canvasWidth.value = attrs.width as number;
    }
    if (attrs.height != undefined) {
      canvasHeight.value = attrs.height as number;
    }
    //设置画布宽高
    canGraph.width = canvasWidth.value;
    canGraph.height = canvasHeight.value;

    canPoint.width = canvasWidth.value;
    canPoint.height = canvasHeight.value;

    canPerson.width = canvasWidth.value;
    canPerson.height = canvasHeight.value;

    //设置画笔样式
    ctxGragh.strokeStyle = colorVal.value; //线条颜色
    ctxGragh.lineWidth = lineWidthVal.value; //线条粗细
    ctxPoint.strokeStyle = colorVal.value; //线条颜色
    ctxPoint.lineWidth = lineWidthVal.value; //线条粗细
    ctxPerson.strokeStyle = colorVal.value; //线条颜色
    ctxPerson.lineWidth = lineWidthVal.value; //线条粗细

    console.log(canPoint);
    //  canPoint.onclick = (e) => {
    //       // console.log("鼠标点击", e);
    //       canOnClick(e as PointerEvent);
    //     };
  };

  //鼠标点击事件
  const canOnClick = (e: PointerEvent) => {
    if (pointArr.value.length < 4) {
      let piX: number, piY: number;
      piX = e.offsetX == undefined ? e.clientX : e.offsetX;
      piY = e.offsetY == undefined ? e.clientY : e.offsetY;
      if (pointArr.value.length == 0) {
        pointArr.value.push({ x: piX, y: piY });
      } else {
        //此点是否已经存在数组中
        let isExist = false;
        for (let i = 0; i < pointArr.value.length; i++) {
          if (
            piX >= pointArr.value[i].x - pointRange.value &&
            piX <= pointArr.value[i].x + pointRange.value &&
            piY >= pointArr.value[i].y - pointRange.value &&
            piY <= pointArr.value[i].y + pointRange.value
          ) {
            //判断为同一点，不存储
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          pointArr.value.push({ x: piX, y: piY });
        }
      }
      drawArea();
    }
  };

  // 鼠标移动的事件
  const canOnMouseMove = (e: PointerEvent) => {
    isMouseMove.value = true;
    ctxPoint.clearRect(0, 0, canPoint.width, canPoint.height);
    let piX: number;
    let piY: number;
    piX = e.offsetX == undefined ? e.clientX : e.offsetX;
    piY = e.offsetY == undefined ? e.clientY : e.offsetY;

    piX = piX <= 0 ? 0 : piX;
    piY = piY <= 0 ? 0 : piY;
    piX = piX >= canPoint.width ? canPoint.width : piX;
    piY = piY >= canPoint.height ? canPoint.height : piY;
    drawMoveArea(piX, piY);
    dot(piX, piY);

    console.log(isMouseDown.value, isMouseMove.value, isMouseUp.value);

    //判断是否是拖动
    if (isMouseDown.value && isMouseMove.value && !isMouseUp.value) {
      if (isDrag.value) {
        drawDragArea(piX, piY);
      } else {
        dragPoint(piX, piY);
      }
    }
  };

  // 鼠标按下
  const canOnMouseDown = () => {
    isMouseDown.value = true;
    isMouseUp.value = false;
  };
  // 鼠标抬起的时候
  const canOnMouseUp = (e: PointerEvent) => {
    isMouseUp.value = true;
    isMouseMove.value = false;
    isMouseDown.value = false;
    if (isDrag.value) {
      // 这里来减少点
      pointArrMerge();
      drawArea();
      isDrag.value = false;
      dragPosition.value = -1;
    }
  };

  // 绘制区域
  const drawArea = () => {
    ctxGragh.clearRect(0, 0, canGraph.width, canGraph.height);
    ctxGragh.beginPath();
    ctxGragh.moveTo(pointArr.value[0].x, pointArr.value[0].y);
    for (let i = 1; i < pointArr.value.length; i++) {
      ctxGragh.lineTo(pointArr.value[i].x, pointArr.value[i].y);
      // console.log(i, pointArr.value[i].x, pointArr.value[i].y);
    }
    ctxGragh.strokeStyle = colorVal.value;
    ctxGragh.fillStyle = colorValA.value;
    ctxGragh.lineWidth = lineWidthVal.value;
    ctxGragh.closePath();
    ctxGragh.stroke(); // 渲染路径
    ctxGragh.fill(); // 填充绘制区域内的路径
  };

  // 绘制移动的区域
  const drawMoveArea = (x: number, y: number) => {
    if (pointArr.value.length > 0 && pointArr.value.length < 4) {
      ctxGragh.clearRect(0, 0, canGraph.width, canGraph.height);
      ctxGragh.beginPath();
      ctxGragh.moveTo(pointArr.value[0].x, pointArr.value[0].y);
      for (let i = 1; i < pointArr.value.length; i++) {
        ctxGragh.lineTo(pointArr.value[i].x, pointArr.value[i].y);
      }
      if (x <= 0) {
        x = 0;
      }
      ctxGragh.lineTo(x, y);
      ctxGragh.strokeStyle = colorVal.value;
      ctxGragh.fillStyle = colorValA.value;
      ctxGragh.lineWidth = lineWidthVal.value;
      ctxGragh.closePath();
      ctxGragh.stroke();
      ctxGragh.fill();
    }
  };
  // 绘制鼠标点
  const dot = (x: number, y: number) => {
    ctxPoint.clearRect(0, 0, canPoint.width, canPoint.height);
    ctxPoint.beginPath();
    ctxPoint.arc(x <= 0 ? 0 : x, y, lineWidthVal.value, 0, 2 * Math.PI);
    ctxPoint.fillStyle = colorVal.value;
    ctxPoint.fill();
  };

  // 过滤重复的点
  const pointArrMerge = () => {
    for (let i = 0; i < pointArr.value.length; i++) {
      for (let j = i + 1; j < pointArr.value.length; j++) {
        if (
          pointArr.value[i].x >= pointArr.value[j].x - pointRange.value &&
          pointArr.value[i].x <= pointArr.value[j].x + pointRange.value &&
          pointArr.value[i].y >= pointArr.value[j].y - pointRange.value &&
          pointArr.value[i].y <= pointArr.value[j].y + pointRange.value
        ) {
          pointArr.value.splice(i, 1);
        }
      }
    }
  };

  const drawDragArea = (x: number, y: number) => {
    if (dragPosition.value != -1) {
      pointArr.value.splice(dragPosition.value, 1, { x, y });
      drawArea();
    }
  };

  const dragPoint = (x: number, y: number) => {
    for (let i = 0; i < pointArr.value.length; i++) {
      if (
        x >= pointArr.value[i].x - pointRangeDrag.value &&
        x <= pointArr.value[i].x + pointRangeDrag.value &&
        y >= pointArr.value[i].y - pointRangeDrag.value &&
        y <= pointArr.value[i].y + pointRangeDrag.value
      ) {
        dragPosition.value = i;
        isDrag.value = true;
      }
    }
  };
  const setPersonArr = (arr: []) => {
    if (arr.length > 0) {
      // personArr.value = arr;
      //  drawPersonArr();
      pointArr.value = arr;
      drawArea();
    }
  };
  const getPersonArr = () => {
    return pointArr.value;
  };
  const clearView = () => {
    ctxGragh.clearRect(0, 0, canGraph.width, canGraph.height);
    ctxPoint.clearRect(0, 0, canPoint.width, canPoint.height);
    pointArr.value = [];
  };
  onMounted(() => {
    initCanvas();
  });

  defineExpose({
    initCanvas,
    getPersonArr,
    setPersonArr,
    clearView,
  });


</script>

<style scoped>
  #divCanvas {
    position: relative;
    height: 100%;
    width: 100%;
  }
  #graphCanvas,
  #personCanvas {
    position: absolute;
    left: 0;
    top: 0;
  }
  #pointCanvas {
    position: absolute;
    left: 0;
    top: 0;
  }
  #videoCan {
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
