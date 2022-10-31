<template>
  <div class="con">
    <div class="header">
      <gy-choose-switch :on="on" :off="off" @change="changeSwitch"></gy-choose-switch>
      <div class="title">
        <img class="titleImg" :src="imgSrc" alt=""/>
        <h2>咕呀百宝箱-让写代码变成一件有趣的事</h2>
      </div>
      <p>
        本站后续会推出各种前端实用的好工具和小游戏，每款工具都经过精心打磨，让大家轻松愉悦的过好每一天！
      </p>
    </div>
    <ul class="links">
      <li
        v-for="(item, index) in conList"
        :key="index"
        @click="goLinks(item.path)"
      >
        <img :src="item.src" alt="" />
        <div>
          <p class="title">{{ item.title }}</p>
          <p class="desc">{{ item.desc }}</p>
        </div>
      </li>
    </ul>
    <div class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank">皖ICP备2022004949号-1</a>
    </div>
    <gy-eye></gy-eye>
    <div class="bottom_eye">
      <gy-eye></gy-eye>
    </div>
  </div>
</template>
<script lang="ts" setup>
import{reactive, ref} from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();
let imgSrc = ref(new URL('../assets/long_off.png', import.meta.url).href)
// 定义传给子组件的数值
let on = {
  icon:'Moon',
  color:'#d7d7d7',
  activeColor:'#edf10a'
}
// 定义传给子组件的数值
let off = {
  icon:'Sunny',
  color:'#312f2f',
  activeColor:'#ff4700'
}
// 功能列表
let conList = [
  {
    title: "CSS按钮在线生成器",
    src: new URL('../assets/btn.png', import.meta.url).href,
    desc: "在线设计按钮样式，实时预览效果",
    path: "/button",
  },
  {
    title: "数字消除 | 小游戏",
    src: new URL('../assets/line.png', import.meta.url).href,
    desc: "考验超强记忆力的数字消除游戏",
    path: "/remove",
  },
  {
    title: "Running Man | canvas小游戏",
    src: new URL('../assets/running.png', import.meta.url).href,
    desc: "奔跑吧，向着前方奔跑吧",
    path: "/running",
  },
  {
    title: "数独 | 小游戏",
    src: new URL('../assets/grid.png', import.meta.url).href,
    desc: "一起玩转数字吧",
    path: "/sudoku",
  },
];
// 跳转页面
let goLinks = (v: string) => {
    // resolve新窗口打开
    const newpage = router.resolve({
      path: v,  // 跳转的页面路由
    })
    window.open(newpage.href, '_blank') // 打开新的窗口(跳转路径，跳转类型)
};
// 定义主题默认值
const btnTheme = reactive({
  bgColor: "#505050",
  bgcolor2: "#282828",
  titleColor: "#edf10a",
  textColor: "#fff",
  gradColor: "#000000",
  gradColor1: "rgba(255, 255, 255, 0.1)",
  borderColor:"#edf10a"
});
// 接受子组件传值
let changeSwitch = (val:any)=>{
  val.type == 'off' ? imgSrc.value = new URL('../assets/long_off.png', import.meta.url).href:imgSrc.value = new URL('../assets/long_on.png', import.meta.url).href
  btnTheme.bgColor = val.bgColor
  btnTheme.bgcolor2 = val.bgcolor2
  btnTheme.titleColor = val.titleColor
  btnTheme.textColor = val.textColor
  btnTheme.gradColor = val.gradColor
  btnTheme.gradColor1 = val.gradColor1
  btnTheme.borderColor = val.borderColor
}
</script>
<style lang="scss" scoped>
.con {
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: v-bind("btnTheme.textColor");
  position: relative;
  background: radial-gradient(v-bind("btnTheme.gradColor") 15%, transparent 16%) 0 0,
    radial-gradient(v-bind("btnTheme.gradColor") 15%, transparent 16%) 8px 8px,
    radial-gradient(v-bind("btnTheme.gradColor1")  15%, transparent 20%) 0 1px,
    radial-gradient(v-bind("btnTheme.gradColor1")  15%, transparent 20%) 8px 9px;
  background-color: v-bind("btnTheme.bgcolor2");
  background-size: 16px 16px;
  width: 100%;
  height: 100%;
  .header {
    .title{
      position: relative;
      .titleImg{
        position: absolute;
        bottom: -10px;
        left: 65px;
      }
    }
    h2 {
      font-size: 30px;
      text-align: center;
      margin-bottom: 30px;
      color: v-bind("btnTheme.textColor");
      font-weight: normal;
      margin-top: 40px;
    }
    p {
      margin-bottom: 40px;
    }
  }
  .links {
    display: flex;
    justify-content: space-between;
    width: 80%;
    flex-wrap: wrap;
    z-index: 10;
    li {
      display: flex;
      align-items: center;
      width: 25%;
      background: v-bind("btnTheme.bgColor");
      color: v-bind("btnTheme.textColor");
      transition: all 0.2s ease;
      -webkit-box-align: center;
      padding: 15px 10px;
      margin-bottom: 20px;
      border-radius: 5px;
      border: 2px solid v-bind("btnTheme.textColor");
      transition: all .5s linear;
      cursor: pointer;
      img {
        margin-right: 5px;
        width: 34px;
        height: 34px;
      }
      .title {
        font-size: 14px;
        margin: 0 0 1px 0;
        font-weight: normal;
      }
      .desc {
        font-size: 12px;
        color: #888ea2;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        margin: 5px 0 0 0;
      }
    }
    li:hover {
      border: 2px solid v-bind("btnTheme.borderColor");
      box-shadow: 0 0 7px 0 v-bind("btnTheme.borderColor");
    }
    li:hover .title {
      color: v-bind("btnTheme.titleColor");
      transition: color .4s linear;
    }
  }
  .footer{
    position: absolute;
    bottom: 10px;
    color: #000;
    width: 100%;
    text-align: center;
    a{
      color: #fff;
      text-decoration: none;
    }
  }
}
.bottom_eye{
  position: absolute;
  right: 200px;
  top: 0;
}
</style>
