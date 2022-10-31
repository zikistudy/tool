<template>
  <router-view v-if="isPc"></router-view>
  <div v-else>
    <h2>移动端待开发，敬请期待！</h2>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
} from "vue";
const isPc = ref(true)
onMounted(()=>{
  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  flag == null?isPc.value =true:isPc.value = false
})
</script>
<style lang="scss">
@import "./styles/base.scss";
@import "./styles/ui.scss";
h2{
  margin-top: 200px;
  text-align: center;
}
</style>
