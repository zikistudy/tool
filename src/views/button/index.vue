<template>
  <div class="con">
    <div class="left">
      <el-scrollbar>
        <div class="text">
          <el-card class="box-card">
            <p>Text</p>
            <div class="common el-input_box">
              <el-input v-model="inputValue" size="small" />
              <el-select
                v-model="selectValue"
                class="m-2"
                placeholder="Select"
                size="small"
                @change="handelChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="common">
              <div class="checkbox">
                <el-checkbox
                  v-model="checked1"
                  label="Bold"
                  size="small"
                  border
                  @change="handelBoldChange"
                />
                <el-checkbox
                  v-model="checked2"
                  label="Italic"
                  size="small"
                  border
                  @change="handelItalicChange"
                />
              </div>
              <el-slider
                v-model="fontsizeValue"
                size="small"
                :min="10"
                :max="50"
                @input="handelSizeChange"
              />
            </div>
          </el-card>
        </div>
        <div class="size">
          <el-card class="box-card">
            <p>Size</p>
            <div class="common">
              <p>
                width: <span>{{ widthValue + "px" }}</span>
              </p>
              <el-slider
                v-model="widthValue"
                size="small"
                :min="90"
                :max="500"
                @input="handelWidthChange"
              />
            </div>
            <div class="common">
              <p>
                height: <span>{{ heightValue + "px" }}</span>
              </p>
              <el-slider
                v-model="heightValue"
                size="small"
                :min="20"
                :max="250"
                @input="handelHeightChange"
              />
            </div>
          </el-card>
        </div>
        <div class="border">
          <el-card class="box-card">
            <p>Border</p>
            <el-scrollbar>
              <div class="common">
                <el-checkbox
                  v-model="checkedtl"
                  label="top-left"
                  size="small"
                  border
                />
                <el-checkbox
                  v-model="checkedtr"
                  label="top-right"
                  size="small"
                  border
                />
                <el-checkbox
                  v-model="checkedbl"
                  label="bottom-left"
                  size="small"
                  border
                />
                <el-checkbox
                  v-model="checkedbr"
                  label="bottom-right"
                  size="small"
                  border
                />
              </div>
            </el-scrollbar>
            <div class="common">
              <p class="border_raduis">
                border-raduis: <span>{{ borderRaduisValue + "px" }}</span>
              </p>
              <el-slider
                v-model="borderRaduisValue"
                size="small"
                :min="0"
                :max="Math.trunc(heightValue / 2)"
                @input="handelBDChange"
              />
            </div>
            <div class="common">
              <p class="border_raduis">
                border-size: <span>{{ borderSizeValue + "px" }}</span>
              </p>
              <el-slider
                v-model="borderSizeValue"
                size="small"
                :min="0"
                :max="10"
                @input="handelBSChange"
              />
            </div>
          </el-card>
        </div>
        <div class="bg">
          <el-card class="box-card">
            <p>Background</p>
            <div class="common">
              <el-checkbox
                v-model="checkedGradient"
                label="Gradient"
                size="small"
                border
                @change="handelGradientChange"
              />
              <el-checkbox
                v-model="checkedTransparent"
                label="Transparent"
                size="small"
                border
                @change="handelTransparentChange"
                v-show="!checkedGradient"
              />
              <el-switch
                v-model="gradintValue"
                class="mb-2"
                style="--el-switch-on-color: #f6931f;--el-switch-off-color: #13ce66"
                active-text="top to bottom"
                inactive-text="left to right"
                @change="handelSwitch"
                v-show="checkedGradient"
              />
            </div>
          </el-card>
        </div>
        <div class="boxShadow">
          <el-card class="box-card">
            <p>Box Shadow</p>
            <div class="common">
              <el-checkbox
                v-model="checkedShadow"
                label="Shadow"
                size="small"
                border
                @change="handelShadowChange"
              />
              <el-switch
                v-model="ShadowTypeValue"
                class="mb-2"
                style="--el-switch-on-color: #f6931f;--el-switch-off-color: #13ce66"
                active-text="Inset"
                inactive-text="Outset"
                @change="handelSwitchShadow"
                v-show="checkedShadow"
              />
            </div>
            <div class="common el-slider-box" v-show="checkedShadow">
              <p>
                h-shadow: <span>{{ hShadowValue + "px" }}</span>
              </p>
              <el-slider
                v-model="hShadowValue"
                size="small"
                :min="-20"
                :max="20"
              />
              <p style="margin-left:5px">
                v-shadow: <span>{{ vShadowValue + "px" }}</span>
              </p>
              <el-slider
                v-model="vShadowValue"
                size="small"
                :min="-20"
                :max="20"
              />
            </div>
            <div class="common el-slider-box"  v-show="checkedShadow">
              <p>
                blur: <span>{{ blurValue + "px" }}</span>
              </p>
              <el-slider
                v-model="blurValue"
                size="small"
                :min="0"
                :max="30"
                />
              <p style="margin-left:5px">
                spread: <span>{{ spreadValue + "px" }}</span>
              </p>
              <el-slider
                v-model="spreadValue"
                size="small"
                :min="0"
                :max="20"
              />
            </div>
          </el-card>
        </div>
      </el-scrollbar>
    </div>
    <div class="right">
      <div class="top el-card-box">
        <el-card>
          <button>{{ inputValue }}</button>
          <div class="color-select">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="text-color"
              placement="top"
            >
            <div>
              <el-color-picker
                v-model="color1"
                @active-change="handelColorChange"
                size="small"
              />
            </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="border-color"
              placement="top"
            >
            <div>
              <el-color-picker
                v-model="color2"
                @active-change="handelBorderColorChange"
                size="small"
              />
            </div>
            </el-tooltip>
            <div v-if="!checkedGradient">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="background-color"
                placement="top"
              >
              <div>
                <el-color-picker
                  v-model="color3"
                  @active-change="handelBGColorChange"
                  size="small"
                  show-alpha
                />
              </div>
              </el-tooltip>
            </div>
            <div class="leftToRight" v-else-if="checkedGradient && !gradintValue">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="left-color"
                placement="top"
              >
              <div>
                <el-color-picker
                  v-model="color4"
                  @active-change="handelLeftColorChange"
                  size="small"
                  show-alpha
                />
              </div>
              </el-tooltip>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="right-color"
                placement="top"
              >
              <div>
                <el-color-picker
                  v-model="color5"
                  @active-change="handelRightColorChange"
                  size="small"
                  show-alpha
                />
              </div>
              </el-tooltip>
            </div>
            <div v-else class="leftToRight">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="top-color"
                placement="top"
              >
              <div>
                <el-color-picker
                  v-model="color6"
                  @active-change="handelTopColorChange"
                  size="small"
                  show-alpha
                />
              </div>
              </el-tooltip>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="bottom-color"
                placement="top"
              >
              <div>
                <el-color-picker
                  v-model="color7"
                  @active-change="handelBottomColorChange"
                  size="small"
                  show-alpha
                />
              </div>
              </el-tooltip>
            </div>
            <div v-show="checkedShadow">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="shadow-color"
                placement="top"
              >
              <div>
                <el-color-picker
                    v-model="color8"
                    @active-change="handelShadowColorChange"
                    size="small"
                  />
              </div>
            </el-tooltip>
            </div>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="hover-color"
                placement="top"
              >
              <div>
                <el-color-picker
                  v-model="color9"
                  @active-change="handelHoverColorChange"
                  size="small"
                  show-alpha
                />
              </div>
              </el-tooltip>
          </div>
        </el-card>
      </div>
      <el-card class="bottom hljs-box">
        <p>Copy this code into your CSS stylesheet</p>
        <highlightjs autodetect :code="code" />
        <el-icon-document-copy @click="copyCss"></el-icon-document-copy>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch,onMounted } from "vue";
import { useCopy } from "../../hooks/useCopy";
const inputValue = ref("Button text");
const selectValue = ref("Arial");
const color1 = ref("#45E606");
const color2 = ref("#000000");
const color3 = ref("rgba(113, 19, 206, 0.7)");
const color4 = ref("rgba(169, 150, 199, 0.7)");
const color5 = ref("rgba(113, 19, 206, 0.7)");
const color6 = ref("rgba(169, 150, 199, 0.7)");
const color7 = ref("rgba(113, 19, 206, 0.7)");
const color8 = ref("#000000");
const color9 = ref("rgba(113, 19, 206, 0.5)");
const options = [
  {
    value: "Arial",
    label: "Arial",
  },
  {
    value: "SimSun",
    label: "SimSun",
  },
  {
    value: "SimHei",
    label: "SimHei",
  },
  {
    value: "NSimSun",
    label: "NSimSun",
  },
  {
    value: "PMingLiU",
    label: "PMingLiU",
  },
  {
    value: "MingLiU",
    label: "MingLiU",
  },
  {
    value: "DFKai-SB",
    label: "DFKai-SB",
  },
  {
    value: "FangSong",
    label: "FangSong",
  },
  {
    value: "FangSong_GB2312",
    label: "FangSong_GB2312",
  },
];
const checked1 = ref(false);
const checked2 = ref(false);
const checkedtl = ref(true);
const checkedtr = ref(true);
const checkedbl = ref(true);
const checkedbr = ref(true);
const checkedGradient = ref(false);
const checkedTransparent = ref(false);
const checkedShadow = ref(false)
const ShadowTypeValue = ref(false)
const fontsizeValue = ref(24);
const widthValue = ref(300);
const heightValue = ref(100);
const borderRaduisValue = ref(20);
const borderSizeValue = ref(1);
const gradintValue = ref(false);
const hShadowValue = ref(0)
const vShadowValue = ref(0)
const blurValue = ref(10)
const spreadValue = ref(0)
let tl = ref("0");
let tr = ref("0");
let bl = ref("0");
let br = ref("0");
const theme = reactive({
  fontFamily: "Arial",
  color: "#45E606",
  fontWeight: "initial",
  fontStyle: "initial",
  fontSize: "24px",
  width: "300px",
  height: "100px",
  borderRaduis: "20px",
  border: "1px solid #000000",
  background:'rgba(113, 19, 206, 0.7)',
  boxshadow:'none',
});
let code = ref('')
const themeHover = reactive({
  background:'rgba(107, 30, 145, 0.76)'
})
// 字体下拉选择
let handelChange = () => {
  theme.fontFamily = selectValue.value;
};
// 颜色选择
let handelColorChange = (v: string) => {
  theme.color = v;
};
// 是否粗体显示
let handelBoldChange = (v: boolean) => {
  v == true ? (theme.fontWeight = "bold") : (theme.fontWeight = "initial");
};
// 是否斜体显示
let handelItalicChange = (v: boolean) => {
  v == true ? (theme.fontStyle = "italic") : (theme.fontStyle = "initial");
};
// 字体大小
let handelSizeChange = (v: number) => {
  theme.fontSize = v.toString() + "px";
};
// 按钮宽度
let handelWidthChange = (v: number) => {
  theme.width = v.toString() + "px";
};
// 按钮高度
let handelHeightChange = (v: number) => {
  theme.height = v.toString() + "px";
};
// 圆角
let handelBDChange = (v: number) => {
  checkedtl.value == true ? (tl.value = v + "px") : (tl.value = "0");
  checkedtr.value == true ? (tr.value = v + "px") : (tr.value = "0");
  checkedbl.value == true ? (bl.value = v + "px") : (bl.value = "0");
  checkedbr.value == true ? (br.value = v + "px") : (br.value = "0");
  theme.borderRaduis = `${tl.value} ${tr.value} ${br.value} ${bl.value}`;
};
// 边框颜色选择
let handelBorderColorChange = (v: string) => {
  theme.border = `${borderSizeValue.value}px solid ${v}`;
};
// 边框字体大小
let handelBSChange = (v: number) => {
  theme.border = `${v}px solid ${color2.value}`;
  v == 0 ? (theme.border = "none") : "";
};
// 背景色
let handelBGColorChange = (v: string) => {
  theme.background = v;
  checkedTransparent.value = false
};
// 渐变左边颜色
let handelLeftColorChange = (v: string) => {
  theme.background = `linear-gradient(to right, ${v}, ${color5.value})`
};
// 渐变右边颜色
let handelRightColorChange = (v: string) => {
  theme.background = `linear-gradient(to right, ${color4.value}, ${v})`
};
// 渐变上边颜色
let handelTopColorChange = (v: string) => {
  theme.background = `linear-gradient(to bottom, ${v}, ${color7.value})`
};
// 渐变下边颜色
let handelBottomColorChange = (v: string) => {
  theme.background = `linear-gradient(to bottom, ${color6.value}, ${v})`
};
// 是否开启渐变
let handelGradientChange = (v: boolean) => {
  v == true ? theme.background = `linear-gradient(to right, ${color4.value}, ${color5.value})` : theme.background=`${color3.value}`;
};
// 渐变方向
let handelSwitch = (v: boolean) => {
  v == true ? theme.background = `linear-gradient(to bottom, ${color6.value}, ${color7.value})` : theme.background = `linear-gradient(to right, ${color4.value}, ${color5.value})`
};
// 是否不开启背景
let handelTransparentChange = (v: boolean) => {
  v == true ? theme.background = 'transparent' : theme.background=`${color3.value}`;
};
let handelShadowChange = (v: boolean) => {
 v==true?theme.boxshadow = `${hShadowValue.value}px ${vShadowValue.value}px ${blurValue.value}px ${spreadValue.value}px ${color8.value}`: theme.boxshadow = 'none'
};
let handelHoverColorChange =(v: string) => {
  themeHover.background = v
};
let handelShadowColorChange = (v: string) => {
  ShadowTypeValue.value == true?theme.boxshadow = `inset ${hShadowValue.value}px ${vShadowValue.value}px ${blurValue.value}px ${spreadValue.value}px ${v}`:theme.boxshadow = `${hShadowValue.value}px ${vShadowValue.value}px ${blurValue.value}px ${spreadValue.value}px ${v}`
};
// 复制
let copyCss = ()=>{
  useCopy(code.value)
}
let handelSwitchShadow=(v: boolean)=>{
  v == true ? theme.boxshadow = `inset ${hShadowValue.value}px ${vShadowValue.value}px ${blurValue.value}px ${spreadValue.value}px ${color8.value}`:theme.boxshadow = `${hShadowValue.value}px ${vShadowValue.value}px ${blurValue.value}px ${spreadValue.value}px ${color8.value}`
}
watch(()=>[hShadowValue.value,vShadowValue.value,blurValue.value,spreadValue.value,color8.value],(v)=>{
  ShadowTypeValue.value == true?theme.boxshadow = `inset ${hShadowValue.value}px ${vShadowValue.value}px ${blurValue.value}px ${spreadValue.value}px ${color8.value}`:theme.boxshadow = `${hShadowValue.value}px ${vShadowValue.value}px ${blurValue.value}px ${spreadValue.value}px ${color8.value}`
})
// 监听边框四个角
watch(
  () => [checkedtl.value, checkedtr.value, checkedbl.value, checkedbr.value],
  (now) => {
    now[0] == true
      ? (tl.value = borderRaduisValue.value + "px")
      : (tl.value = "0");
    now[1] == true
      ? (tr.value = borderRaduisValue.value + "px")
      : (tr.value = "0");
    now[2] == true
      ? (bl.value = borderRaduisValue.value + "px")
      : (bl.value = "0");
    now[3] == true
      ? (br.value = borderRaduisValue.value + "px")
      : (br.value = "0");
    theme.borderRaduis = `${tl.value} ${tr.value} ${br.value} ${bl.value}`;
  }
);
watch(()=>theme,(v)=>{
    code.value = `
      button{
        font-family: ${v.fontFamily};
        color: ${v.color};
        font-weight: ${v.fontWeight};
        font-style: ${v.fontStyle};
        font-size: ${v.fontSize};
        width: ${v.width};
        height: ${v.height};
        border-radius: ${v.borderRaduis};
        border: ${v.border};
        background: ${v.background};
        box-shadow: ${v.boxshadow};
      }
      button:hover{
        background: ${themeHover.background};
      }
    `  
},{deep:true})
watch(()=>themeHover,(v)=>{
    code.value = `
      button{
        font-family: ${theme.fontFamily};
        color: ${theme.color};
        font-weight: ${theme.fontWeight};
        font-style: ${theme.fontStyle};
        font-size: ${theme.fontSize};
        width: ${theme.width};
        height: ${theme.height};
        border-radius: ${theme.borderRaduis};
        border: ${theme.border};
        background: ${theme.background};
        box-shadow: ${theme.boxshadow};
      }
      button:hover{
        background: ${v.background};
      }
    `  
},{deep:true})
onMounted(()=>{
  code.value = `
      button{
        font-family: ${theme.fontFamily};
        color: ${theme.color};
        font-weight: ${theme.fontWeight};
        font-style: ${theme.fontStyle};
        font-size: ${theme.fontSize};
        width: ${theme.width};
        height: ${theme.height};
        border-radius: ${theme.borderRaduis};
        border: ${theme.border};
        background: ${theme.background};
        box-shadow: ${theme.boxshadow};
      }
      button:hover{
        background: ${themeHover.background};
      }
    `  
})
</script>
<style scoped lang="scss">
.con {
  width: 100%;
  height: 100%;
  background: rgb(238,174,202);
  background: linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
  display: flex;
  justify-content: space-around;
  .left {
    width: 40%;
    height: 100%;
    box-sizing: border-box;
    .text,
    .size,
    .border,
    .boxShadow,
    .bg {
      width: 100%;
      margin: 20px 0;
      p {
        background-color: #eee;
        border-radius: 4px;
        text-indent: 16px;
      }
      .common {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        align-items: center;
        .checkbox{
          width: 70%;
        }
        p {
          background-color: #fff;
          font-size: 12px;
          color: #606266;
          display: block;
          width: 140px;
          line-height: 24px;
          text-indent: 0;
          span {
            color: #f6931f;
            font-size: 14px;
          }
        }
        .border_raduis {
          width: 180px;
        }
      }
    }
  }
  .right {
    width: 50%;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    .top{
      height: 45%;
      button {
      font-family: v-bind("theme.fontFamily");
      color: v-bind("theme.color");
      font-weight: v-bind("theme.fontWeight");
      font-style: v-bind("theme.fontStyle");
      font-size: v-bind("theme.fontSize");
      width: v-bind("theme.width");
      height: v-bind("theme.height");
      border-radius: v-bind("theme.borderRaduis");
      border: v-bind("theme.border");
      background: v-bind("theme.background");
      box-shadow: v-bind("theme.boxshadow");
      &:hover{
        background:  v-bind("themeHover.background");
      }
    }
    .color-select{
      display: flex;
      margin-top: 10px;
    }
    .leftToRight{
      display: flex;
    }
    }
    .bottom{
      height: 50%;
      p {
        background-color: #eee;
        border-radius: 4px;
        text-indent: 16px;
        margin-bottom: 15px;
    }
    }
    code{
      font-size: 14px;
      padding: 0;
    }
    svg{
      position: absolute;
      right: 30px;
      top: 50px;
      width: 1.5rem;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
