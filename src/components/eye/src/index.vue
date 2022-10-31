<template>
  <div
    class="eye"
    ref="eye"
    @click="goPlay"
    @animationend="func"
    @webkitAnimationEnd="func"
  >
    <div class="eye_ball" ref="eyeBall"></div>
  </div>

  <div class="filter">
    <div class="eyeSocket" ref="filter"></div>
  </div>
  <!-- Svg滤镜 -->
  <svg width="0">
    <filter id="filter">
      <feTurbulence baseFrequency="1">
        <animate
          id="animate1"
          attributeName="baseFrequency"
          dur="1s"
          from="0.5"
          to="0.55"
          begin="0s;animate1.end"
        ></animate>
        <animate
          id="animate2"
          attributeName="baseFrequency"
          dur="1s"
          from="0.55"
          to="0.5"
          begin="animate2.end"
        ></animate>
      </feTurbulence>
      <feDisplacementMap
        in="SourceGraphic"
        scale="50"
        xChannelSelector="R"
        yChannelSelector="B"
      />
    </filter>
  </svg>
</template>

<script lang="ts" setup>
import emitter from "../../../mitt/index";
import { ref, onBeforeMount, onMounted, reactive } from "vue";
import * as echarts from "echarts";
onMounted(() => {
  // 监听兄弟组件传值
  emitter.on("color", (v: any) => {
    console.log(v)
    eyeTheme.color = v;
    color.value = v
    barColor = v
  });
  initChart();
  sleep();
});
onBeforeMount(() => {
  // 指定监听清除
  emitter.off("color");
});
let eyeTheme = reactive({
  color: "#edf10a",
  eye: "rgb(41, 104, 217)",
  eyeOuter: "#02ffff",
  eyeOuterShadow: "rgb(35, 22, 140)",
});
const eyeBall = ref();
const eye = ref();
const filter = ref();
const color = ref('#edf10a')
let leftRotSize: number = 0; // 旋转角度
let ballSize: number = 12; // 眼睛尺寸
let rotTimer: any = null; // 定时器
let sleepTimer: any = null; //休眠定时
let isSleep: boolean = true; // 是否处于休眠状态
let barColor: string = "transparent";
let eyeballChart: any = null;
// 初始化
let initChart = () => {
  if (eyeballChart != null && eyeballChart != "" && eyeballChart != undefined) {
    eyeballChart.dispose(); //销毁
  }
  eyeballChart = echarts.init(eyeBall.value);
  eyeballChart.setOption({
    series: [
      {
        type: "gauge", // 使用仪表盘类型
        radius: "20%", // 采用负数是为了让分割线从内向外延伸
        clockwise: false,
        startAngle: `${0 + leftRotSize * 5}`, // 起始角度
        endAngle: `${270 + leftRotSize * 5}`, // 结束角度
        splitNumber: 3, // 分割数量，会将270度分割为3份，所以有四根线
        detail: false,
        axisLine: {
          show: false,
        },
        axisTick: false,
        splitLine: {
          show: true,
          length: ballSize, // 分割线长度
          lineStyle: {
            shadowBlur: 20, // 阴影渐变
            shadowColor: barColor, // 阴影颜色
            shadowOffsetY: "0",
            color: barColor, // 分割线颜色
            width: 3, // 分割线宽度
          },
        },
        axisLabel: false,
      },
      {
        type: "gauge",
        radius: "20%",
        clockwise: false,
        startAngle: `${45 + leftRotSize * 5}`, // 倾斜45度
        endAngle: `${315 + leftRotSize * 5}`,
        splitNumber: 3,
        detail: false,
        axisLine: {
          show: false,
        },
        axisTick: false,
        splitLine: {
          show: true,
          length: ballSize,
          lineStyle: {
            shadowBlur: 20,
            shadowColor: barColor,
            shadowOffsetY: "0",
            color: barColor,
            width: 3,
          },
        },
        axisLabel: false,
      },
    ],
  });
};
// 睡眠
let sleep = () => {
  clearInterval(rotTimer); // 清除定时器
  rotTimer = setInterval(() => {
    initChart();
    if (ballSize > 0) {
      ballSize -= 0.1; // 当眼球存在时慢慢减小
    } else {
      eye.value.className = "eye eyeSocketSleeping"; // 眼球消失后添加呼吸
    }
    leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1); // 旋转，
  }, 10);
  window.removeEventListener("mousemove", work);
  eye.value.style.transform = `rotateY(0deg) rotateX(0deg)`; // 大眼归位
  eyeBall.value.style.transform = `translate(0px, 0px)`; // 眼睛归位
  isSleep = true;
};
// 点击唤醒
let goPlay = () => {
  if (!isSleep) return;
  weakUp();
};
// 唤醒
let weakUp = () => {
  isSleep = false; // 修改状态
  eye.value.className = "eye eyeSocketLooking"; // 清除休眠状态
  filter.value.style.opacity = "1";
  filter.value.className = "eyeSocket eyeSocketLooking";
  angry();
  clearInterval(rotTimer); // 清除定时器
  rotTimer = setInterval(() => {
    initChart();
    ballSize <= 25 && (ballSize += 0.1);
    leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.5);
  }, 10);
};
// 常态模式
let normal = () => {
  (eyeTheme.eye = "rgb(41, 104, 217)"),
    (eyeTheme.eyeOuter = "#02ffff"),
    (eyeTheme.eyeOuterShadow = "rgb(35, 22, 140)");
  barColor = color.value;
};
// 生气模式
let angry = () => {
  (eyeTheme.eye = "rgb(255,187,255"),
    (eyeTheme.eyeOuter = "rgb(238,85,135)"),
    (eyeTheme.eyeOuterShadow = "rgb(208,14,74)");
  barColor = "rgb(208,14,74)";
};
// 监听动画结束
let func = () => {
  new Promise<void>((res) => {
    clearInterval(rotTimer); // 清除定时器
    rotTimer = setInterval(() => {
      initChart(); // 更新视图
      ballSize > 0 && (ballSize -= 0.5); // 眼球尺寸减小
      leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1);
      if (ballSize <= 0) {
        // 当眼球尺寸为0时，将Promise标记为resolved，然后执行后面的代码
        clearInterval(rotTimer);
        res();
      }
    }, 10);
  }).then(() => {
    filter.value.style.opacity = "0"; // 清除光环
    eye.value.className = "eye";
    filter.value.className = "eyeSocket";
    normal(); // 设置常态样式
    window.addEventListener("mousemove", work);
    rotTimer = setInterval(() => {
      initChart();
      ballSize <= 12 && (ballSize += 0.1); // 眼球尺寸缓慢增加
      leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1);
    }, 10);
  });
};
// 工作状态
let work = (e: any) => {
  // 视口尺寸，获取到整个视口的大小
  let clientWidth = document.body.clientWidth;
  let clientHeight = document.body.clientHeight;
  // 原点，即bigEye中心位置，页面中心
  let domRect = eye.value.getBoundingClientRect();
  let origin = [domRect.width / 2 + domRect.x, domRect.height / 2 + domRect.y];
  // 鼠标坐标
  let mouseCoords = [e.clientX - origin[0], origin[1] - e.clientY];
  // 旋转角度
  let eyeXDeg = (mouseCoords[1] / clientHeight) * 80; // 这里的80代表的是最上下边缘大眼X轴旋转角度
  let eyeYDeg = (mouseCoords[0] / clientWidth) * 60;
  eye.value.style.transform = `rotateY(${eyeYDeg}deg) rotateX(${eyeXDeg}deg)`;
  eyeBall.value.style.transform = `translate(${eyeYDeg / 1.5}px, ${
    -eyeXDeg / 1.5
  }px)`;
  countTime();
};
// 超过20s则休眠
let countTime = () => {
  if (sleepTimer) clearTimeout(sleepTimer); // 如果休眠定时器已经被设置，则清除休眠定时器
  sleepTimer = setTimeout(() => {
    // 重新计时
    sleep();
  }, 20000);
};
</script>
<style scoped lang="scss">
body {
  perspective: 1000px;
}
.eye {
  position: absolute;
  left: 80px;
  top: 60px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid v-bind("eyeTheme.eye");
  z-index: 1;
  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // 居中
    border-radius: 50%;
    box-sizing: border-box; // css3盒子模型
  }
  &::before {
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    border: 6px solid v-bind("eyeTheme.eyeOuter");
  }
  &::after {
    width: 100%;
    height: 100%;
    border: 4px solid v-bind("eyeTheme.eyeOuterShadow");
    box-shadow: inset 0px 0px 30px v-bind("eyeTheme.eyeOuterShadow");
  }
  .eye_ball {
    width: 100%;
    height: 100%;
  }
}
.eyeSocket {
  position: absolute;
  left: 80px;
  top: 60px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid v-bind("eyeTheme.eye");
  z-index: 1;
  opacity: 0;
}
.filter {
  position: absolute;
  left: -16px;
  top: -16px;
  width: 300px;
  height: 300px;
  filter: url("#filter"); /* 开启滤镜 */
}
.eyeSocketSleeping {
  animation: sleeping 6s infinite;
}
@keyframes sleeping {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
.eyeSocketLooking {
  animation: lookAround 2.5s; // 添加动画，只播放一次
}
/* 环视动画 */
@keyframes lookAround {
  0% {
    transform: translateX(0) rotateY(0);
  }

  10% {
    transform: translateX(0) rotateY(0);
  }

  40% {
    transform: translateX(-70px) rotateY(-30deg);
  }

  80% {
    transform: translateX(70px) rotateY(30deg);
  }

  100% {
    transform: translateX(0) rotateY(0);
  }
}
</style>
