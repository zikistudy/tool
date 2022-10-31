<template>
  <gy-rank @tabChange="tabChange" :tableDataTime="tableDataTime" :tableDataCount="tableDataCount"></gy-rank>
  <div class="title" v-show="openTitle">小试牛刀</div>
  <gy-total :count="count" ref="sonRef" v-show="openTotal" @sonClick="sonClick"></gy-total>
  <div class="random" v-show="openRandom" @click="randomBtn">
    <el-tooltip
        class="box"
        effect="light"
        content="随机打开多个棋子,10s后自动关闭!"
        placement="top"
      >
      <el-badge :value="value" class="item">
        <img src="../../assets/random.png" alt="">
      </el-badge>
    </el-tooltip>
  </div>
  <div class="bg">
    <img src="../../assets/bg.jpg" alt="" />
    <img src="../../assets/bg2.jpg" alt="" />
  </div>
  <div class="box">
    <gy-button :text="btnText" v-show="isStart" @click="startGame"></gy-button>
    <div :class="{ card: true, cards: difficult }" v-show="!isStart">
      <span
        v-for="(item, index) in cardList"
        :key="index"
        :class="{
          isDeafult: item.isChecked,
          isSuccess: item.isYes,
          isError: item.isNo,
          isRandom:item.isRandom
        }"
        :style="{ width: itemWidth + 'px', height: itemHeight + 'px' }"
        @click="handelClick(item, index)"
        >{{ item.value }}</span
      >
    </div>
  </div>
  <div class="axis" ref="myEchart" v-show="openTotal">

  </div>
  <div class="username" v-if="showName">
    <el-input
    v-model="userName"
    maxlength="10"
    placeholder="请输入昵称"
    show-word-limit
    type="text"
  />
  <div class="btn">
    <el-button type="primary" @click="cancelBtn">取消</el-button>
    <el-button type="primary" plain @click="submitBtn">确定</el-button>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref, watch, reactive } from "vue";
import { ElMessage, ElMessageBox,ElNotification,ElLoading } from 'element-plus';
import * as echarts from 'echarts/core';
import { Register, getRankList } from "../../request/request";
const myEchart = ref()
const itemWidth = ref(60);
const itemHeight = ref(60);
const theme = reactive({
  width: "330px",
});
const openRandom = ref(false)
const openTotal = ref(false);
const openTitle = ref(false);
const btnText = "Go Start";
const cardList: Ref = ref([]);
const isStart = ref(true);
const difficult = ref(false);
const count = ref(0);
const value = ref(5)
const sonRef = ref();
const userName = ref()
const showName = ref(false)
const tableDataTime = ref([])
const tableDataCount = ref([])
let timeObj = {
  s:'00',
  h:'00',
  m:'00'
}
let total: number = 9; //216
let cardArr: any = [];
let pauseArr: any = [];
let widowWidth = ref(document.body.clientWidth);
let widowHeight = ref(document.body.clientHeight);
let isFlag = false
let isDone = false
let chart:any = null
// 初始关卡游戏开始
let startGame = () => {
  isStart.value = !isStart.value;
  if(isFlag){
    for (let i = 0; i < total; i++) {
    cardList.value.push({
      value: "🐸",
      isChecked: false,
      isYes: false,
      isNo: false,
      index: i,
      isRandom:false
    });
  }
  }
  initCard(1);
  openTitle.value = true;
};
let handelClick = (item: any, index: number) => {
  if(pauseArr.length >=2){
    if(pauseArr[0].value != pauseArr[1].value){
      cardList.value[pauseArr[1].index].isNo = false;
      cardList.value[pauseArr[1].index].isChecked = false;
      cardList.value[pauseArr[1].index].value = "🐸";
      pauseArr.splice(1);
    }
  }
  if (!item.isChecked) {
    openTotal.value ? count.value++ : "";
    item.isChecked = true;
    item.value = cardArr[index].value;
    pauseArr.push(item);
    console.log(pauseArr);
    if (pauseArr.length >= 3) {
      // if(pauseArr.length >=1){
      //   if(pauseArr[0].value != pauseArr[1].value){
      //     cardList.value[pauseArr[0].index].isNo = false;
      //     cardList.value[pauseArr[0].index].isChecked = false;
      //     cardList.value[pauseArr[0].index].value = "🐸";
      //     pauseArr.splice(0,1);
      //   }
      // }
      if(pauseArr.length == 4){
        if(pauseArr[1].value != pauseArr[2].value){
          cardList.value[pauseArr[2].index].isNo = false;
          cardList.value[pauseArr[2].index].isChecked = false;
          cardList.value[pauseArr[2].index].value = "🐸";
          pauseArr.splice(2,1);
        }
      }
      if (
        pauseArr[0].value == pauseArr[1].value &&
        pauseArr[0].value == pauseArr[2].value &&
        pauseArr[1].value == pauseArr[2].value
      ) {
        pauseArr.forEach((i: any) => {
          cardList.value[i.index].isYes = true;
          cardList.value[i.index].isNo = false;
        });
        pauseArr.splice(0, 3);
      } else {
        console.log(pauseArr,'000000000')
        if (pauseArr.length >= 4) {
          // console.log(pauseArr,'11111')
          pauseArr.forEach((i: any) => {
            cardList.value[i.index].isNo = false;
          });
          cardList.value[pauseArr[2].index].isNo = false;
          cardList.value[pauseArr[2].index].isChecked = false;
          cardList.value[pauseArr[2].index].value = "🐸";
          pauseArr.splice(2,3);
        } else {
          pauseArr.forEach((i: any) => {
            cardList.value[i.index].isNo = true;
          });
        }
      }
    }else{
      if(pauseArr.length == 2){
        if(pauseArr[0].value != pauseArr[1].value){
         cardList.value[pauseArr[0].index].isNo = false;
         cardList.value[pauseArr[0].index].isChecked = false;
         cardList.value[pauseArr[0].index].value = "🐸";
         pauseArr.splice(0,1);
       }

      }
    }
  }
};
let sonClick = (val:any)=>{
  timeObj = val
}
let tabChange = (val:string)=>{
  // console.log(val,'888888888')
  getRanlListData(val)
}
let getRanlListData = (type:string)=>{
  let params = {
    type,
  }
  getRankList(params).then((res:any)=>{
      // console.log(res)
      if (res.status == "000000") {
        if(type == 'first'){
          tableDataTime.value = res.data
          // console.log(tableDataTime.value)
        }else{
          tableDataCount.value = res.data
        }
        // ElMessage({
        //   showClose: true,
        //   message: res.message,
        //   type: "success",
        // });
       
      }else{
        ElMessage({
          showClose: true,
          message: res.message,
          type: "warning",
        });
      }
    }).catch((err:any)=>{
      console.log(err)
    })
}
let randomBtn  = ()=>{
  if(value.value > 0 && isDone == false){
    isDone = true
    value.value--
    let arr:any = []
    for(let i = 0; i<50;i++){
      arr.push(Math.round(Math.random()*215))
    }
    let newArr = Array.from(new Set(arr))
    let i:any = []
    cardList.value.forEach((item:any)=>{
      if(item.isChecked == true){
        i.push(item.index)
      }
    })
    let someArr = i.filter((item:any) => newArr.includes(item))
    if(someArr.length == 0){
      newArr.forEach((i:any)=>{
        cardList.value[i].value = cardArr[i].value
        cardList.value[i].isChecked = true;
        cardList.value[i].isRandom = true;
      })
    }else{
      someArr.forEach((item:any)=>{
        newArr.splice(newArr.indexOf(item),1)
      })
      newArr.forEach((i:any)=>{
        cardList.value[i].value = cardArr[i].value
        cardList.value[i].isChecked = true;
        cardList.value[i].isRandom = true;
      })
    }
    let time = setTimeout(()=>{
        newArr.forEach((i:any)=>{
        cardList.value[i].value = '🐸'
        cardList.value[i].isChecked = false;
        cardList.value[i].isRandom = false;
        isDone = false
        clearTimeout(time)
      })
    },15000)
    // console.log(newArr,i,someArr)

  }
}
onMounted(() => {
  getRanlListData('first')
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 1000)
  window.onresize = () => {
    //屏幕尺寸变化就重新赋值
    return (() => {
      widowWidth.value = document.body.clientWidth;
      widowHeight.value = document.body.clientHeight;
    //   chart.dispose()
    // initEchart()
    })();
  };
  for (let i = 0; i < total; i++) {
    cardList.value.push({
      value: "🐸",
      isChecked: false,
      isYes: false,
      isNo: false,
      index: i,
      isRandom:false
    });
  }
});
let initCard = (level: number) => {
  if (level == 2) {
    // setTimeout(()=>{
    //   initEchart()
    // })
    count.value = 0
    openTitle.value = false;
    openTotal.value = true;
    cardArr = [];
    total = 216;
    itemWidth.value = parseInt((Math.sqrt(widowWidth.value * widowHeight.value / total) - 11).toString());
    itemHeight.value = parseInt((Math.sqrt(widowWidth.value * widowHeight.value / total) - 11).toString()
    );
  }else{
    itemWidth.value = parseInt((Math.sqrt(widowWidth.value * widowHeight.value) / total - 11).toString());
    itemHeight.value = parseInt((Math.sqrt(widowWidth.value * widowHeight.value) / total - 11).toString()
    );
  }
  theme.width = itemWidth.value * 3 + 10 + "px";
  for (let i = 0; i < total / 3; i++) {
    let x = Math.floor(Math.random() * 100 + 1);
    cardArr.push({ value: x, isChecked: false, isYes: false, isNo: false });
    cardArr.push({ value: x, isChecked: false, isYes: false, isNo: false });
    cardArr.push({ value: x, isChecked: false, isYes: false, isNo: false });
  }
  cardArr.sort(() => Math.random() - 0.5);
  if(level == 2){
    ElNotification({
    message: '玩家有30s的时间去记住这些卡牌的位置哦！',
    duration: 30000,
    position: 'top-left',
  })
    for (let i = 0; i < total; i++) {
        cardList.value.push({
          value: cardArr[i].value,
          isChecked: true,
          isYes: false,
          isNo: false,
          index: i,
          isRandom:false
        });
      }
    setTimeout(()=>{
      cardList.value = []
      for (let i = 0; i < total; i++) {
        cardList.value.push({
          value: "🐸",
          isChecked: false,
          isYes: false,
          isNo: false,
          index: i,
          isRandom:false
        });
      }
      openRandom.value = true
      // 开始计时
      sonRef.value.startCount();
    },30000)
  }
  // console.log(cardArr);
};
// 通过成功弹出框
let handelMessage = ()=>{
  total= 9
  isFlag = true
  // 清除计时器
  sonRef.value.endCount();
  cardList.value = [];
  ElMessageBox.confirm(
    '是否加入游戏排行榜?',
    '通关成功',
    {
      confirmButtonText: '确认加入',
      cancelButtonText: '再来一次',
      type: 'info',
    }
  )
    .then(() => {
      // console.log(s.value,'00000000000')
      isStart.value = false
      showName.value = true
    })
    .catch(() => {
      //再来一次
      difficult.value = true;
      setTimeout(()=>{
        initCard(2);
      })
    })
} 
const cancelBtn = ()=>{
  showName.value = false
  openTitle.value = false;
  openTotal.value = false;
  difficult.value = false;
  isStart.value = true
  cardArr = [];
}
const submitBtn = ()=>{
  if(userName.value == ''){
    ElMessage({
    showClose: true,
    message: '昵称不能为空！',
    type: 'warning',
  })
  }else{
    let params = {
      userName:userName.value,
      count:count.value,
      time:timeObj.h + ':' + timeObj.m + ':' + timeObj.s,
      minute: Number(timeObj.s) + Number(timeObj.m)*60 + Number(timeObj.h)*60*60
    }
    Register(params).then((res:any)=>{
      // console.log(res)
      if (res.status == "000000") {
        ElMessage({
          showClose: true,
          message: res.message,
          type: "success",
        });
        openTitle.value = false;
        openTotal.value = false;
        difficult.value = false;
        isStart.value = true;
        showName.value = false
        cardArr = [];
        count.value = 0
      }else{
        ElMessage({
          showClose: true,
          message: res.message,
          type: "warning",
        });
      }
    }).catch((err:any)=>{
      console.log(err)
    })
  }
}
// 初始坐标
const initEchart = ()=>{
  chart = echarts.init(myEchart.value);
var option;

option = {
  grid: {
        top:'3%',
        left: '1.5%',
        right: '1.5%',
        bottom: '3%',
    },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'F', 'G', 'H','I','J','K','L','M','N','O','P','Q','I','S','T','U','V','W'],
      axisLine: {
          show: true, 
          lineStyle: {
            color: '#fff'
            }
        },
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'F', 'G', 'H','I','J','K','L'],
    axisLine: {
          show: true, 
          lineStyle: {
            color: '#fff'
            }
        },
  },
};

option && chart.setOption(option);
}
watch(
  () => cardList.value,
  (v) => {
    if(v.length>0){
      var s = v.every((item: any) => {
        return item.isYes! == true;
      });
    }
    if (s) {
      if(difficult.value){
        handelMessage()
      }else{
        // console.log('cheng')
        cardList.value = [];
        difficult.value = true;
        setTimeout(()=>{
          initCard(2);
        })
      }
    }
  },
  { deep: true }
);
watch(
  () => [widowWidth.value, widowHeight.value],
  (v) => {
    let s = v[0] * v[1];
    let ns = s / total;
    let w = parseInt((Math.sqrt(ns) - 11).toString());
    itemWidth.value = w;
    itemHeight.value = w;
    // chart.dispose()
    // initEchart()
  },
  { deep: true }
);
</script>
<style scoped type="text/scss" lang="scss">
.bg {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  img {
    width: 50%;
    height: 100%;
  }
}
.box {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  .card {
    display: flex;
    flex-wrap: wrap;
    width: v-bind("theme.width");
    transform-style: preserve-3d;
    justify-content: center;
    span {
      // width: 100px;
      // height: 100px;
      border: 1px solid #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 40px;
      font-weight: 600;
      color: #fff;
      transition: all ease 0.5s;
      box-shadow: 0 0 10px 1px #0c85c6;
    }
    .isDeafult {
      font-size: 25px;
      transform: rotateZ(360deg) rotateY(360deg);
      box-shadow: inset 0 0 10px 1px #0c85c6;
    }
    .isRandom{
      font-size: 25px;
      box-shadow: inset 0 0 40px 1px #fe9f10;
    }
    .isSuccess {
      font-size: 25px;
      box-shadow: inset 0 0 30px 1px #0cac21;
    }
    .isError {
      font-size: 25px;
      box-shadow: inset 0 0 30px 1px #ec0909;
    }
  }
  .cards {
    width: 98%;
    // span{
    //   width: 60px;
    //   height: 60px;
    // }
    // width: calc(100% - 150px);
  }
}
.title {
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
.username{
  background: #fff;
  width: 400px;
  height: 140px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -70px;
  .el-input{
    width: 80%;
  }
  .btn{
    display: flex;
    justify-content: space-evenly;
  }
}
.random{
  position: absolute;
  bottom: 20px;
  color: #fff;
  z-index: 15;
  cursor: pointer;
  display: flex;
  left: 50%;
  margin-left: -23px;
  width: 46px;
  height: 40px;
  align-items: center;
  background: rgb(62 197 232 / 68%);
  justify-content: space-evenly;
  img{
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
}
.axis{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
}
</style>
