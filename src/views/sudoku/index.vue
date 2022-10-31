<template>
  <div class="box">
    <div v-for="(item, index) in sudokuList" :key="index" class="row" ref="suduRow">
      <div
        v-for="(item2, index2) in sudokuList[index]"
        :key="index2"
        ref="suduItem"
        :class="{row_item:true,active:showActive == index2,active2:showActive1 == index}"
        @click="handelClick(index,index2,item2,$event)"
        @mouseover="mouseOver(index,index2)"
        @mouseleave="mouseLeave(index,index2)"
      >
        {{item2}}
      </div>
    </div>
    <gy-button class="btn" text="下一关" @click="nextBtn" v-show="isSuccess"></gy-button>
    <gy-total :showCount="showCount" ref="sonRef"></gy-total>
  </div>
</template>

<script lang="ts" setup>
import { ref,onMounted } from "vue";
import { ElMessage } from 'element-plus';
let sudokuList = ref<any[]>([[],[],[],[],[],[],[],[],[]])
let showActive = ref()
let showActive1 = ref()
const sonRef = ref();
let suduItem = ref()
let suduRow = ref()
let showCount = ref(false)
const isSuccess = ref(true)
// 基础数据
let base = ['1','2','3','4','5','6','7','8','9'];
let randomArr:any = [];
// 关卡等级
let level = 0;
let pass = false;
let flag = false;
let x = -1
let y = -1
// 随机打乱基础数据
let randomsort =(a:any, b:any)=> {
    return Math.random()-0.5
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}
// 初始话数独盘
let initSudoku = ()=>{
  for (let index = 0; index < 9; index++) {
    sudokuList.value[index].push('','','','','','','','','')
  }
  for(let i = 0;i < 9;i++){
    randomArr = base.slice(0).sort(randomsort)
    switch (i) {
      case 0:
        aaa(0,0)
        break;
      case 1:
        aaa(1,0)
        break;  
      case 2:
        aaa(2,0)
        break; 
      case 3:
        bbb(3,0)
        break; 
      case 4:
        bbb(4,0)
        break; 
      case 5:
        bbb(5,0)
        break; 
      case 6:
        ccc(6,0)
        break; 
      case 7:
        ccc(7,0)
        break; 
      case 8:
        ccc(8,0)
        break;
      default:
        break;
    }
  }
}
let aaa = (i:any,v:any)=>{
  randomArr.forEach((item:string)=>{
    if(!sudokuList.value[i].includes(item)){
      let arr:any = []
      sudokuList.value.forEach((i2:any)=>{
        arr.push(i2[v])
      })
      if(!arr.includes(item)){
        let arr2:any = []
        sudokuList.value.slice(0,3).forEach((i2:any)=>{
          if(v<3){
            arr2.push(...i2.slice(0,3))
          }else if(v>=3 && v < 6){
            arr2.push(...i2.slice(3,6))
          }else{
            arr2.push(...i2.slice(6,9))
          }
        })
        if(!arr2.includes(item)){
          sudokuList.value[i][v] = item
          // let getLocation = randomArr.indexOf(item);
          // randomArr.splice(getLocation, 1);
          if(i== 0 && v<8){
            aaa(0,v+1)
          }else if(i== 1 && v<8){
            aaa(1,v+1)
          }else if(i== 2 && v<8){
            aaa(2,v+1)
          }
          }
        }
      }
  })
}
let bbb = (i:any,v:any)=>{
  randomArr.forEach((item:string)=>{
    if(!sudokuList.value[i].includes(item)){
      let arr:any = []
      sudokuList.value.forEach((i2:any)=>{
        arr.push(i2[v])
      })
      if(!arr.includes(item)){
        let arr2:any = []
        sudokuList.value.slice(3,6).forEach((i2:any)=>{
          if(v<3){
            arr2.push(...i2.slice(0,3))
          }else if(v>=3 && v < 6){
            arr2.push(...i2.slice(3,6))
          }else{
            arr2.push(...i2.slice(6,9))
          }
        })
        if(!arr2.includes(item)){
          sudokuList.value[i][v] = item
          // let getLocation = randomArr.indexOf(item);
          // randomArr.splice(getLocation, 1);
          if(i== 3 && v<8){
            bbb(3,v+1)
          }else if(i== 4 && v<8){
            bbb(4,v+1)
          }else if(i== 5 && v<8){
            bbb(5,v+1)
          }
          }
        }
      }
  })
}
let ccc = (i:any,v:any)=>{
  randomArr.forEach((item:string)=>{
    if(!sudokuList.value[i].includes(item)){
      let arr:any = []
      sudokuList.value.forEach((i2:any)=>{
        arr.push(i2[v])
      })
      if(!arr.includes(item)){
        let arr2:any = []
        sudokuList.value.slice(6,9).forEach((i2:any)=>{
          if(v<3){
            arr2.push(...i2.slice(0,3))
          }else if(v>=3 && v < 6){
            arr2.push(...i2.slice(3,6))
          }else{
            arr2.push(...i2.slice(6,9))
          }
        })
        if(!arr2.includes(item)){
          sudokuList.value[i][v] = item
          // let getLocation = randomArr.indexOf(item);
          // randomArr.splice(getLocation, 1);
          if(i== 6 && v<8){
            ccc(6,v+1)
          }else if(i== 7 && v<8){
            ccc(7,v+1)
          }else if(i== 8 && v<8){
            ccc(8,v+1)
          }
          }
        }
      }
  })
}
// 关卡等级
let initSudo = (v:number)=>{
  initSudoku()
  setTimeout(() => {
    for(let i = 0;i <(v*10)+30 ;i++){
      let a = getRandom(0,9)
      let b = getRandom(0,9)
      sudokuList.value[a][b] = ''
    }
  });
}
// 生成0-8的随机整数
let getRandom = (min:number, max:number)=> {
  return Math.floor(Math.random() * (max - min)) + min;
}
let handelClick = (i:number,j:number,v:any,$event:any)=>{
  if((x != i || y != j)&&(x>=0&&y>=0)){
    if(suduRow.value[x].children[y].style.color == 'rgb(210, 16, 45)'){
      suduRow.value[x].children[y].style = 'color:rgb(210, 16, 45)'
    }else{
      suduRow.value[x].children[y].style = 'color:rgb(16, 210, 47)'

    }
  }
  if(v=='' || suduRow.value[i].children[j].style.color == 'rgb(16, 210, 47)' || suduRow.value[i].children[j].style.color == 'rgb(210, 16, 45)' ){
    x = i
    y = j
    flag = true
    if(suduRow.value[i].children[j].style.color == 'rgb(210, 16, 45)'){
      suduRow.value[x].children[y].style = 'color:rgb(210, 16, 45);background: #a3dfe5;'
    }else{
      suduRow.value[x].children[y].style = 'color:rgb(16, 210, 47);background: #a3dfe5;'
    }
  }
}
let mouseOver = (i:number,j:number)=>{
  showActive.value = j
  showActive1.value = i
}
let mouseLeave = (i:number,j:number)=>{
  showActive.value = 10
  showActive1.value = 10
}
document.addEventListener("keyup", function(e) {
   let isNumber = base.includes(e.key.toString())
   if(isNumber && flag){
    sudokuList.value[x][y] = e.key
    judgeSudo(x,y,e.key)

   }
 })
// 判断这个数是否符合
let judgeSudo = (x:any,y:any,n:any)=>{
  // 先判断本行是否重复
  let rowArr = sudokuList.value[x].slice() //不改变原数组
  let i = rowArr.indexOf(n)
  rowArr.splice(i,1)
  if(rowArr.includes(n)){
    suduRow.value[x].children[y].style = 'color:rgb(210, 16, 45);background: #a3dfe5;'
  }else{
    // 在判断本列是否重复
    let arr:any = []
    sudokuList.value.forEach((item:any)=>{
      arr.push(item[y])
    })
    let j = arr.indexOf(n)
    arr.splice(j,1)
    if(arr.includes(n)){
      suduRow.value[x].children[y].style = 'color:rgb(210, 16, 45);background: #a3dfe5;'
    }else{
      // 在判断九宫格是否重复
      if(x<3){
        if(y<3){
          handelJudge(0,0,x,y,n)
        }else if(y>=3 && y < 6){
          handelJudge(3,0,x,y,n)
        }else{
          handelJudge(6,0,x,y,n)
        }
      }else if(x >=3 && x<6){
        if(y<3){
          handelJudge(0,3,x,y,n)
        }else if(y>=3 && y < 6){
          handelJudge(3,3,x,y,n)
        }else{
          handelJudge(6,3,x,y,n)
        }
      }else{
        if(y<3){
          handelJudge(0,6,x,y,n)
        }else if(y>=3 && y < 6){
          handelJudge(3,6,x,y,n)
        }else{
          handelJudge(6,6,x,y,n)
        }
      }
    }
  }
}
let handelJudge =(s:any,z:any,x:any,y:any,n:any)=>{
  let arr2:any = []
  sudokuList.value.slice(0+z,3+z).forEach((i:any)=>{
    arr2.push(...i.slice(0+s,3+s))
  })
  let j = arr2.indexOf(n)
  arr2.splice(j,1)
  if(arr2.includes(n)){
    suduRow.value[x].children[y].style = 'color:rgb(210, 16, 45);background: #a3dfe5;'
  }else{
    pass = true
    suduRow.value[x].children[y].style = 'color:rgb(16, 210, 47);background: #a3dfe5;'
  }
}
let nextBtn = ()=>{
  if(pass){
    sonRef.value.endCount();
    if(level>=25){
        ElMessage({
        showClose: true,
        message: '恭喜你，通关成功！',
        type: "success",
      });
      isSuccess.value = false
      pass= false
    }else{
      level++
      sudokuList.value = [[],[],[],[],[],[],[],[],[]]
      pass= false
      initSudo(level)
      sonRef.value.startCount();
    }
  }else{
    ElMessage({
      showClose: true,
      message: '请先通过本关卡',
      type: "warning",
    });
  }
}
onMounted(()=>{
  initSudo(0)
  sonRef.value.startCount();
})
</script>
<style scoped lang="scss">
.box {
  margin-top: 70px;
  .row {
    display: flex;
    justify-content: center;
    align-content: center;
    &:nth-child(1) .row_item {
      border-top: 3px solid #333;
    }
    &:nth-child(3n) .row_item {
      border-bottom: 3px solid #333;
    }
    .row_item {
      width: 60px;
      height: 60px;
      text-align: center;
      border: 1px dashed #999;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:first-child {
        border-left: 3px solid #333;
      }
      &:nth-child(3n) {
        border-right: 3px solid #333;
      }
    }
    .active{
      background: #bce5a3;
    }
    .active2{
      background: #bce5a3;
    }
    .click{
      background: #a3dfe5;
    }
    .click_cl{
      color:#946291
    }
  }
  .btn{
    
    border: none;
    width: 200px;
    height: 60px;
    color: #fff;
    z-index: 1;
    display: flex;
    background: #000;
    position: relative;
    cursor: pointer;
    margin: 20px auto;
  }
}
</style>
