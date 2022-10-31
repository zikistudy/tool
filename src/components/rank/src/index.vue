<template>
  <button class="custom-btn btn" @click="drawer = true">
    <span><img src="../../../assets/total.png" alt="" /> 排行榜</span>
  </button>
  <div class="el-tabs__nav-box el-table-box">
    <el-drawer
      v-model="drawer"
      title="I am the title"
      :with-header="false"
      direction="ltr"
    >
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="changeTab">
        <el-tab-pane label="最短时间" name="first">
          <el-table :data="tableDataTime" style="width: 100%">
            <el-table-column type="index" width="50"/>
            <el-table-column prop="userName" label="玩家" width="150" />
            <el-table-column prop="time" label="通过时间" />
            <el-table-column prop="createDate" label="创建时间" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="最少步骤" name="second"
          >
          <el-table :data="tableDataCount" style="width: 100%">
            <el-table-column type="index" width="50"/>
            <el-table-column prop="userName" label="玩家" width="150" />
            <el-table-column prop="count" label="点击次数"/>
            <el-table-column prop="createDate" label="创建时间" />
          </el-table>
          </el-tab-pane
        >
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script lang='ts' setup>
import {ref,PropType} from 'vue'
interface ListOptions{
    date:string,
    name:string,
    createDate:string
}
interface ListOptions2{
    count:number,
    userName:string,
    createDate:string
}
const props = defineProps({
  tableDataTime:{
    type: Array as PropType<ListOptions[]>
  },
  tableDataCount:{
    type: Array as PropType<ListOptions2[]>
  }
});
const drawer = ref(false);
const activeName = ref("first");
const emit = defineEmits(['tabChange'])
const changeTab = (v:string)=>{
  emit("tabChange", v);
}
</script>
<style scoped lang='scss'>
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}
.btn {
  background: linear-gradient(
    0deg,
    rgba(255, 151, 0, 1) 0%,
    rgba(251, 75, 2, 1) 100%
  );
  line-height: 42px;
  padding: 0;
  border: none;
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 12;
  &::before,
  &::after {
    position: absolute;
    content: "";
    right: 0;
    bottom: 0;
    background: rgba(251, 75, 2, 1);
    box-shadow: -7px -7px 20px 0px rgba(255, 255, 255, 0.9),
      -4px -4px 5px 0px rgba(255, 255, 255, 0.9),
      7px 7px 20px 0px rgba(0, 0, 0, 0.2), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }
  &::before {
    height: 0%;
    width: 2px;
  }
  &::after {
    width: 0%;
    height: 2px;
  }
  &:hover {
    color: #fff;
    background: transparent;
  }
  &:hover::before {
    height: 100%;
  }
  &:hover::after {
    width: 100%;
  }
  span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before,
    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      background: rgba(251, 75, 2, 1);
      box-shadow: -7px -7px 20px 0px rgba(255, 255, 255, 0.9),
        -4px -4px 5px 0px rgba(255, 255, 255, 0.9),
        7px 7px 20px 0px rgba(0, 0, 0, 0.2), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }
    &::before {
      width: 2px;
      height: 0%;
    }
    &::after {
      height: 2px;
      width: 0%;
    }
    &:hover::before {
      height: 100%;
    }
    &:hover::after {
      width: 100%;
    }
  }
}
</style>