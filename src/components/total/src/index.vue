<template>
  <div class="total">
    <div class="count" v-if="showCount">
      <span>点击次数：</span>
      <span>{{ count }}</span>
    </div>
    <div class="time">
      <span>游戏用时：</span>
      <span>{{ h }}</span> : <span>{{ m }}</span> :
      <span>{{ s }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref,PropType } from "vue";
const props = defineProps({
  count: {
    type: Number,
    default: 0,
  },
  showCount:{
    type:Boolean,
    default:true
  }
});
const h = ref("00");
const m = ref("00");
const s = ref("00");
let currentTime: number = 0;
let timeObj = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};
let time:any = null
// 开始计时
let startCount = () => {
    h.value = '00'
    m.value = '00'
    s.value = '00'
    currentTime = 0
    timeObj = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        };
  handelCount();
  time = setInterval(() => {
    handelCount();
  }, 1000);
};
let handelCount = () => {
    timeObj = {
        seconds: Math.floor(currentTime % 60),
        minutes: Math.floor(currentTime / 60) % 60,
        hours: Math.floor(currentTime / 60 / 60) % 24,
    };
  // 计算出时分秒
  h.value = timeObj.hours < 10 ? "0" + timeObj.hours : timeObj.hours.toString();
  m.value = timeObj.minutes < 10 ? "0" + timeObj.minutes : timeObj.minutes.toString();
  s.value = timeObj.seconds < 10 ? "0" + timeObj.seconds : timeObj.seconds.toString();
  currentTime++;
};
const emit = defineEmits(['sonClick'])
// 结束计时
let endCount = ()=>{
    emit("sonClick", {h:h.value,m:m.value,s:s.value});
    clearInterval(time)
}
// 将方法传给父组件
defineExpose({
    startCount,
    endCount
})
</script>
<style scoped lang="scss">
.total {
  position: absolute;
  top: 20px;
  color: #fff;
  z-index: 1;
  display: flex;
  left: 50%;
  margin-left: -300px;
  width: 600px;
  height: 40px;
  align-items: center;
  background: rgb(11 249 14 / 71%);
  justify-content: space-evenly;
}
</style>
