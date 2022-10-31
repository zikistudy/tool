
// 复制文本
import { ElMessage } from "element-plus"
export const useCopy = (text:string)=>{
    // // 去掉字符中所有的空格
    // let str = text.replace(/\s*/g,"");
    // 创建输入框
    let input = document.createElement('textarea')
    // 给输入框赋值
    input.value = text
    // 追加到body里去
    document.body.appendChild(input)
    // 选择输入框的操作
    input.select()
    // 执行复制操作
    document.execCommand('Copy')
    // 删除加入的输入框
    document.body.removeChild(input)
    // 提示用户
    ElMessage.success('复制成功')
}