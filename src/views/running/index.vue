<template>
     <div class="type" v-show="!isStart">
        <el-radio-group v-model="radio1" class="ml-4">
            <el-radio-button label="keyboard" size="large">手动</el-radio-button>
            <el-radio-button label="audio" size="large">声控</el-radio-button>
        </el-radio-group>
    </div>
    <div class="btn">
        <gy-button :text="btnText" v-show="isStart" @click="startGame"></gy-button>
    </div>
    <el-card class="info" v-show="isStart">
      <h2>游戏玩法说明:</h2>
      <p>1.您可以通过按【空格】健、或者【↑】健来控制盒子的跳跃,一旦盒子掉下平台或者撞到平台左侧则游戏结束。</p>
      <p>2.按两次【空格】健、或者【↑】健实现二连跳，第三次按键时会向下俯冲以便在遇到紧急情况时快速落地。</p>
    </el-card>
    <gy-total :showCount="showCount" ref="sonRef" v-show="openTotal" @sonClick="sonClick"></gy-total>
</template>

<script lang='ts' setup>
import { ref,watch,onMounted } from 'vue'
import { Stage } from "../../utils/Stage";
import { Hero } from "../../utils/Hero";
import { Rect } from "../../utils/Rect";
import { Vector } from "../../utils/Vector";
import { Platform } from "../../utils/Platform";
import { Particle } from "../../utils/Particle";
import { PlatformManager } from "../../utils/PlatformManager";
import { random, randomOne } from "../../utils/utils";
import { addListener, setControlType } from "../../utils/GameController";
const radio1 = ref("keyboard")
const btnText = ref('Go Start')
const isStart = ref(true)
const sonRef = ref();
const openTotal = ref(false);
const showCount = ref(false)
var timeObj = {
  s:'00',
  h:'00',
  m:'00'
}
let hero:any;
let particles: Particle[] = [];
const maxParticleLength = 40;
let particleId = 0;
let sonClick = (val:any)=>{
  timeObj = val
}
const stage = new Stage({
  // 重力加速度
  verticalAcceleration: new Vector(0, 0.6),
  // 初始水平速度   
  initialHorizontalVelocity: new Vector(-4, 0),
  // 水平加速度  
  horizontalAcceleration: new Vector(-0.001, 0),
  onResize: () => {
    init?.();
  }
});

let hasIntersect = false;
let prevHasIntersect = false;

let isIntersectLeft = (hero: Hero, platform: Platform)=> {
  if (hero.prevPosition!.x + hero.width >= platform.prevPosition!.x) {
    return false;
  }
  if (hero.prevPosition!.y + hero.height >= platform.prevPosition!.y) {
    return true;
  }
  const { x, y } = platform.prevPosition;
  const prevRightBottomX = hero.width + hero.prevPosition!.x;
  const prevRightBottomY = hero.height + hero.prevPosition!.y;
  const tx = (x - prevRightBottomX) / -stage.horizontalVelocity.x;
  const ty = (y - prevRightBottomY) / hero.prevVelocity!.y;
  return ty < tx;
}

let collideDetect = (hero: Hero, platforms: Platform[])=> {
  if (hero.position.y > stage.height) {
    console.log('1111111')
    // 清除计时器
    sonRef.value.endCount()
    init();
    sonRef.value.startCount()
    return;
  }
  let tempHasIntersect = false;
  for (let i = 0; i < platforms.length; i++) {
    if (Rect.isIntersect(hero, platforms[i])) {
      tempHasIntersect = true;
      const platform = platforms[i];
      hero.velocity = new Vector(0, 0);
      hero.curConJump = 0;

      if (isIntersectLeft(hero, platform)) {
        init();
        return;
      }

      hero.position.y = platform.position.y - hero.height;

      const particleSize = 8;

      if (!prevHasIntersect) {
        for (let i = 0; i < 10; i++) {
          const left = Math.random() > 0.5;
          particles[particleId % maxParticleLength] = new Particle({
            velocity: left
              ? new Vector(random(-4, -2), random(-6, -1))
              : new Vector(random(10, 16), random(-6, -1)),
            mass: 1,
            position: left
              ? new Vector(
                  hero.position.x - particleSize,
                  hero.position.y + hero.height - particleSize
                )
              : new Vector(
                  hero.position.x + hero.width,
                  hero.position.y + hero.height - particleSize
                ),
            width: particleSize,
            height: particleSize,
            color: randomOne([hero.color, platform.color])
          });
          particles[particleId++ % maxParticleLength].applyForce(
            new Vector(0, -2)
          );
        }
      } else {
        particles[particleId % maxParticleLength] = new Particle({
          velocity: new Vector(0, random(-6, -1)),
          mass: 1,
          position: new Vector(
            hero.position.x - particleSize,
            hero.position.y + hero.height - particleSize
          ),
          width: particleSize,
          height: particleSize,
          color: platform.color
        });
        particles[particleId++ % maxParticleLength].applyForce(
          new Vector(0, -2)
        );
      }
    }
  }
  hasIntersect = tempHasIntersect;
  if (!prevHasIntersect && hasIntersect) {
    stage.horizontalVelocity.add(new Vector(-2, 0));
  }
  if (prevHasIntersect && !hasIntersect) {
    stage.horizontalVelocity.add(new Vector(2, 0));
  }
  prevHasIntersect = hasIntersect;
}

let init = () => {
  stage.reset();
  hero = new Hero({
    position: new Vector(160, 20),
    height: 24,
    width: 24,
    color: "#222f3e"
  });

  const pm = new PlatformManager({
    colors: ['#9FE606','#E64D06',"#1dd1a1",'#06E61C', "#ff6b6b",'#06C4E6', "#feca57", "#54a0ff",'#3375FA', "#9c88ff"]
  });

  stage.play(() => {
    collideDetect(hero, pm.platforms);
    for (let particle of particles) {
      particle.update(stage);
      particle.draw(stage);
    }
  });

  stage.add(hero, pm);
};

watch(()=>radio1.value,()=>{
    setControlType(radio1.value);
})
addListener(() => {
  hero.jump();
});

let startGame = ()=>{
    isStart.value = false
    openTotal.value = true
    sonRef.value.startCount();
    init();
}
  
</script>
<style scoped lang='scss'>
.btn{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.type {
  position: fixed;
  padding: 8px;
  top: 0;
  right: 0;
  z-index: 20;
}
.info{
  position:absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  h2{
    margin: 0;
  }
}
</style>