<template>
  <div class="btn" ref="btn">
    <div class="bn moon active" ref="moonBtn" @click="handelMoonBtn(on.activeColor,off.color)">
      <component :is="`el-icon${toLine(on.icon)}`"></component>
      <span v-if="on.name">{{on.name}}</span>
    </div>
    <div class="bn sunny" ref="sunBtn" @click="handelSunBtn(on.color,off.activeColor)">
      <component :is="`el-icon${toLine(off.icon)}`"></component>
      <span v-if="off.name">{{off.name}}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref,PropType } from "vue";
import { SwitchOn,SwitchOff } from '../types';
import {toLine} from '../../../utils/index';
import emitter from '../../../mitt/index'
// 定义接收父组件传值
let props = defineProps({
  on:{
    type:Object as PropType<SwitchOn>,
    required:true
  },
  off:{
    type:Object as PropType<SwitchOff>,
    required:true
  }
})
// 定义事件传给父组件
let emits = defineEmits(['change'])
const moonBtn = ref();
const sunBtn = ref();
const btn = ref();
// 定义开关主题
const btnTheme = reactive({
  bgColor: "#505050",
  btnShodaw: "#323232",
  btnShodaw2: "#444",
  svgColor: props.on.activeColor,
  svgColor2: props.off.color,
  left: "10px",
  gradColor1: "rgba(255, 255, 255, 0.1)",
  wrapShadow1: "#292929",
  wrapShadow2: "#202020",
  origin: "",
  rotate: "",
});
// 关闭主题点击事件
let handelMoonBtn = (activeColor:string,color:string) => {
  moonBtn.value.className = "bn moon active";
  sunBtn.value.className = "bn sunny";
  btnTheme.left = "10px";
  btnTheme.svgColor = activeColor;
  btnTheme.svgColor2 = color;
  btnTheme.gradColor1 = "rgba(255, 255, 255, 0.1)";
  btnTheme.bgColor = "#505050";
  btnTheme.btnShodaw = "#323232";
  btnTheme.btnShodaw2 = "#444";
  btnTheme.wrapShadow1 = "#292929";
  btnTheme.wrapShadow2 = "#202020";
  btnTheme.origin = "75% top";
  btnTheme.rotate = "-15deg";
  btn.value.className = "btn rotateWrap";
   // 分发给父组件
  emits('change',{
      type:'off',
      bgColor: "#505050",
      bgcolor2: "#282828",
      titleColor: "#edf10a",
      textColor: "#fff",
      gradColor: "#000000",
      gradColor1: "rgba(255, 255, 255, 0.1)",
      borderColor:"#edf10a"
    })
  // 传值给兄弟组件
  emitter.emit('color', '#edf10a');
  setTimeout(() => {
    btn.value.className = "btn";
  }, 600);
};
// 开启主题点击事件
let handelSunBtn = (color:string,activeColor:string) => {
  sunBtn.value.className = "bn sunny active";
  moonBtn.value.className = "bn moon";
  btnTheme.left = "120px";
  btnTheme.svgColor = color;
  btnTheme.svgColor2 = activeColor;
  btnTheme.gradColor1 = "rgba(0, 0, 0, 0.1)";
  btnTheme.bgColor = "#e2e6eb";
  btnTheme.btnShodaw = "#d9dbe6";
  btnTheme.btnShodaw2 = "#f5f9fd";
  btnTheme.wrapShadow1 = "#f5f9fd";
  btnTheme.wrapShadow2 = "#d8dbe5";
  btnTheme.origin = "25% top";
  btnTheme.rotate = "15deg";
  btn.value.className = "btn rotateWrap";
  // 分发给父组件
  emits('change',{
      bgColor: "#e2e6eb",
      bgcolor2: "#e8e8e8",
      titleColor: "#ff4700",
      textColor: "#000",
      gradColor: "#fff",
      gradColor1: "rgba(0, 0, 0, 0.1)",
      borderColor:"#ff4700"
    })
  // 传值给兄弟组件
  emitter.emit('color', '#ff4700');
  setTimeout(() => {
    btn.value.className = "btn";
  }, 600);
};
</script>
<style scoped lang="scss">
.btn {
  // right: 20px;
  // top: 20px;
  position: relative;
  margin: 10px auto 0;
  width: 184px;
  height: 40px;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: v-bind("btnTheme.bgColor");
  box-shadow: -10px -10px 15px v-bind("btnTheme.wrapShadow1"),
    10px 10px 15px v-bind("btnTheme.wrapShadow2");
  transform-origin: v-bind("btnTheme.origin");
  transition: transform 0.4s cubic-bezier(0, 0, 0.48, 1), box-shadow 0.4s linear,
    background-color 0.4s linear;
  &::before {
    content: "";
    position: absolute;
    left: v-bind("btnTheme.left");
    top: 9px;
    width: calc(50% - 20px);
    height: calc(100% - 20px);
    border-radius: 12px;
    transition: left 1s cubic-bezier(0.82, 0.12, 0.18, 0.88),
      box-shadow 0.4s linear;
    box-shadow: inset 8px 8px 6px v-bind("btnTheme.btnShodaw"),
      inset -5px -5px 15px v-bind("btnTheme.btnShodaw2"),
      inset -5px -5px 15px v-bind("btnTheme.btnShodaw2"),
      inset 7px 7px 6px v-bind("btnTheme.btnShodaw");
  }
  .bn {
    svg {
      width: 2em;
      height: 2em;
    }
    span{
      font-size: 13px;
    }
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42%;
    height: 92%;
  }
  .sunny {
    float: right;
    svg {
      color: v-bind("btnTheme.svgColor2");
      transition: color .4s linear;
    }
    span{
      color: v-bind("btnTheme.svgColor2");
    }
  }
  .moon {
    float: left;
    svg {
      color: v-bind("btnTheme.svgColor");
      transition: color .4s linear;
    }
    span{
     color: v-bind("btnTheme.svgColor");
    }
  }
  .active {
    transform: scale(1.1);
    animation: btnEnterScale 0.4s linear;
  }
  @keyframes btnEnterScale {
    0% {
      transform: scale(1);
    }

    80% {
      transform: scale(1.15);
    }

    100% {
      transform: scale(1.1);
    }
  }
  @keyframes txtOutScale {
    0% {
      transform: scale(1.1);
    }

    80% {
      transform: scale(0.95);
    }

    100% {
      transform: scale(1);
    }
  }
}
.rotateWrap {
  transform: rotateY(v-bind("btnTheme.rotate"));
}
</style>
